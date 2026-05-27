# EODHD limits and call cost math

Quotas and per-endpoint costs as published at [eodhd.com/financial-apis/api-limits](https://eodhd.com/financial-apis/api-limits). Re-verify if a request returns `429` or the dashboard shows surprising counters.

## Daily call quota

| Plan | Calls / day | Notes |
|------|-------------|-------|
| Free | 20 | EOD (1 yr), exchanges-list, symbol-list, search, news. Resets 24 h after first request. |
| Paid (subscription) | 100,000 | Resets at **00:00 GMT**, but counter updates lazily — first request after midnight rolls it. |
| Marketplace add-ons | 100,000 each | Separate counter from base subscription. |

To bump the cap above 100k on a paid plan: dashboard → "Daily Usage" → "Increase Daily Limit".

## Per-minute throttle

Documented as a "Minute Request Limit" but the exact figure depends on the plan. In practice: keep concurrent requests low single-digits, retry with backoff on `429`. The provider has not published a hard per-minute number per plan, so don't pre-optimize against one — build in a backoff loop and let the server tell you.

## Per-request cost

| Endpoint family | Cost (calls) |
|-----------------|--------------|
| `/api/eod/{T}` (EOD OHLCV, including `.GBOND` macro) | **1** |
| `/api/real-time/{T}` (Live delayed) | **1 per ticker** in the batch |
| `/api/calendar/earnings|trends|ipos|splits` | **1** |
| `/api/exchanges-list/`, `/api/exchange-symbol-list/{E}` | **1** |
| `/api/search/{q}` | **1** |
| Macro: `.GBOND` via `/api/eod` | **1** |
| Macro: `.MONEY` via `/api/eod` | **10** |
| `/api/technical/{T}` | **5** |
| `/api/intraday/{T}` | **5** |
| `/api/news` | **5 + 5 per ticker** (so 1 ticker = 10) |
| `/api/sentiments`, `/api/news-word-weights` | varies — count as **1 per ticker** for budgeting |
| `/api/screener` | **5** |
| `/api/v1.1/fundamentals/{T}` (and legacy `/api/fundamentals`) | **10** |
| `/api/options/{T}` (US options chains) | **10** |
| Bond Fundamentals API | **10** |
| Marketplace product (each call) | **10** unless docs state otherwise |
| `/api/eod-bulk-last-day/{E}` whole-exchange | **100** |
| `/api/eod-bulk-last-day/{E}?symbols=A,B` | **100 + N** symbols |

## Budget worksheet — what fits in 100k / day

| Workflow | Per-ticker cost | Tickers in a 100k day |
|----------|------------------|------------------------|
| EOD only, last year | 1 | 100,000 |
| EOD + 5 indicators | 1 + 5×5 = 26 | ~3,800 |
| Full fundamentals + EOD | 11 | ~9,000 |
| Full analyst pull (EOD + 5 indicators + fundamentals + news + sentiment) | 26 + 10 + 10 + 1 = 47 | ~2,100 |
| 7-day news + sentiment only | 10 + 1 = 11 | ~9,000 |
| Screener + EOD on 50 picks | 5 + 50 = 55 per scan | many |
| Bulk-exchange snapshot | 100 each | hundreds |

In a 25-name portfolio review with full analyst pulls, expect ~1,200 calls — 1.2 % of paid budget. Well within bounds; the trap is loops that fetch fundamentals per-bar or per-day.

## Budget worksheet — free plan (20 / day)

You get **two fundamentals calls before lockout**, or roughly:

- 20 × `/api/eod/{T}` snapshots, **or**
- 4 × `/api/news?s=...` requests, **or**
- 1 fundamentals + 1 news + ~5 EOD, **or**
- Nothing if you screwed up a screener call (`5`) and a technical call (`5`) early.

Plan-aware fallback strategy when on free:

1. Use `/api/eod` (1 yr) for any price work.
2. Use `/api/news?s=...&limit=50` for the 7-day news window — single call covers it.
3. Skip fundamentals; ask the user for the most recent 10-K/10-Q link and have the relevant analyst read primary filings via web tools.
4. Skip technical indicators; compute SMA/EMA/RSI client-side from the EOD JSON. (Python: `pandas`, `pandas_ta`, or hand-rolled — none of it needs another EODHD call.)
5. Skip screener entirely.

## Hidden costs and gotchas

- **Bulk × symbols.** `/api/eod-bulk-last-day/US?symbols=AAPL,MSFT` is `100 + 2 = 102` calls — far worse than two individual `/api/eod/{T}` calls (= 2). Only use bulk when sweeping an exchange.
- **News and ticker count.** `/api/news?s=AAPL.US,MSFT.US,NVDA.US` is documented at "5 calls + 5 per ticker" — three tickers ≈ 20 calls. Loop one ticker at a time and you spend 30 calls; batch into a single multi-symbol request and you spend 20. Verify counters in the dashboard.
- **MONEY tickers.** `EURIBOR3M.MONEY` via `/api/eod` is **10 calls**, not 1, because money-market data is a fundamental-grade feed. Use sparingly.
- **`filter=last_*` does not reduce cost.** It only reduces response size. The whole indicator series is still computed server-side, charging the usual 5 calls.
- **The token in the URL is logged.** Server access logs, shell history, terminal recordings, agent session logs. Treat any pasted full-curl as a credential leak — rotate the key from the EODHD dashboard if it happens.

## Detecting plan / quota state

There is no dedicated "what's my limit" REST endpoint exposed publicly. The signal is:

| Symptom | Interpretation |
|---------|----------------|
| `HTTP 200`, JSON returns | Within quota. |
| `HTTP 402` | Payment / subscription issue. |
| `HTTP 403` "Forbidden" | Endpoint not in your plan. |
| `HTTP 429` | Per-minute throttle. Back off and retry. |
| `HTTP 200` with `"Daily limit exceeded"` text body | Hard cap reached for the GMT day. |

Build a thin wrapper that surfaces these to the user; do not silently retry.

```python
import os, time, requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.environ["EODHD_API_KEY"]

class EODHDQuotaError(RuntimeError):
    pass

def eodhd_get(path, params=None, max_retries=3):
    params = {"api_token": TOKEN, "fmt": "json", **(params or {})}
    for attempt in range(max_retries):
        r = requests.get(f"https://eodhd.com/api/{path}", params=params, timeout=30)
        if r.status_code == 200 and "Daily limit exceeded" in r.text[:200]:
            raise EODHDQuotaError("Daily limit exceeded")
        if r.status_code == 429:
            time.sleep(2 ** attempt)
            continue
        if r.status_code in (402, 403):
            raise EODHDQuotaError(f"{r.status_code} on {path}: {r.text[:200]}")
        r.raise_for_status()
        return r.json()
    raise EODHDQuotaError("Throttled after retries")
```

(Trim or inline this when you actually need it — don't import unused complexity.)
