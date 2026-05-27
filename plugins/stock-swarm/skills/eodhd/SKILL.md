---
name: eodhd
description: >-
  Structured market data via the EODHD REST API (https://eodhd.com/financial-apis/).
  Pulls EOD/intraday OHLCV, technical indicators, fundamentals v1.1, news + sentiment,
  earnings/IPO/split calendar, screener, search, and macro (gov bonds, money market)
  using the `EODHD_API_KEY` already in project `.env`. Use as the numeric backbone
  for `analyst-technical`, `analyst-fundamentals`, `analyst-news`, `analyst-sentiment`,
  `macro-swarm`, and `market-opportunity-scan` whenever cited prices or filings matter
  more than web-search prose. Read-only. Never use for placing trades.
metadata:
  data-provider: eodhd
  credential-source: env
  env-var: EODHD_API_KEY
  docs: https://eodhd.com/financial-apis/
compatibility: >-
  Requires EODHD_API_KEY in project .env. REST over HTTPS — works from any tool that
  can run `curl` or `python` locally. JSON output (`fmt=json`) is the default for this
  skill; the `/api/eod` endpoint defaults to CSV upstream and must be overridden.
---

# EODHD market data (REST, key from .env)

Single source of structured numbers for the rest of the trading-swarm skills. Replaces "agent guesses from web snippets" with cited primary data: close, volume, indicators, filings-derived fundamentals, news + sentiment, calendar events.

Two-line mental model:

- **Base URL:** `https://eodhd.com/api/<endpoint>`
- **Auth:** `?api_token=$EODHD_API_KEY&fmt=json` on every request — token in query, never in headers.

> Read-only research tool. Output prices/quotes are EOD or 15–20 min delayed (stocks) / ~1 min (forex). Not suitable for live order routing. See [trading-swarm/references/disclaimer.md](../trading-swarm/references/disclaimer.md).

## Before you call anything

1. **Key check.** `grep -q '^EODHD_API_KEY=.\+' .env` must succeed. If empty, stop and ask the user — do not fall back to the `demo` key for anything except the six demo tickers (`AAPL.US`, `TSLA.US`, `VTI.US`, `AMZN.US`, `BTC-USD.CC`, `EURUSD.FOREX`).
2. **Plan unknown by default.** Assume paid (100k calls/day) unless a request returns `402`/`403` or "API limit". On the **free plan** only `/api/eod` (1 year history), `/api/exchanges-list`, `/api/exchange-symbol-list`, `/api/search`, and `/api/news` work, with a hard cap of **20 calls/day**.
3. **Budget the run.** Read [`references/limits-and-costs.md`](references/limits-and-costs.md) — fundamentals (10 calls), technical/intraday/news (5 calls), bulk (100 calls). The free plan goes from full to empty in 2 fundamentals requests.
4. **Never echo the token.** Source from `.env` into a shell var and reference `$EODHD_API_KEY`. Do not paste full URLs containing the literal token into chat output, commit messages, screenshots, or session notes.

```bash
set -a; source .env; set +a   # loads EODHD_API_KEY into env
# All examples below assume this has been run.
```

## Endpoint cheatsheet

Full parameter list and response shapes in [`references/endpoints.md`](references/endpoints.md). Common ticker suffixes (`.US`, `.CC`, `.FOREX`, `.INDX`, `.GBOND`, `.MONEY`, exchange MICs) in [`references/ticker-codes.md`](references/ticker-codes.md).

| Family | Endpoint | Cost (calls) | Notes |
|--------|----------|--------------|-------|
| EOD OHLCV | `/api/eod/{TICKER}` | 1 | **Default fmt is CSV upstream — always pass `fmt=json`.** `from`/`to` are `YYYY-MM-DD`. |
| Intraday OHLCV | `/api/intraday/{TICKER}` | 5 | `interval=1m\|5m\|1h`. `from`/`to` are **Unix seconds (UTC)**, not dates. 1m capped to 120 d. |
| Live (delayed) | `/api/real-time/{TICKER}` | 1 per symbol | Stocks 15–20 min delayed, FX ~1 min. Add `s=AAA,BBB` for batch (each symbol = 1 call; ≤15–20 per request). |
| Technical | `/api/technical/{TICKER}` | 5 | `function=sma\|ema\|rsi\|macd\|bbands\|atr\|adx\|stochastic\|...`. Period range 2–100000. |
| Fundamentals | `/api/v1.1/fundamentals/{TICKER}` | 10 | JSON-only. Use `filter=...` to slice (e.g. `filter=General,Highlights`). |
| News (articles) | `/api/news?s={TICKER}` | 5 + 5 per ticker | Either `s=` (ticker) or `t=` (tag) required. Each article carries a `sentiment` block. |
| Sentiment (aggregate) | `/api/sentiments?s={T1,T2}` | comma-separated tickers | Daily `normalized` score in [-1, 1]. |
| News word weights | `/api/news-word-weights?s={TICKER}` | (varies) | AI-derived keyword weights — slow; narrow the date window. |
| Calendar — earnings | `/api/calendar/earnings` | 1 | Either `symbols=A.US,B.US` or `from`/`to`. |
| Calendar — trends | `/api/calendar/trends?symbols=...` | 1 | Forward + historical EPS estimates. JSON-only. |
| Calendar — IPOs | `/api/calendar/ipos` | 1 | Data from 2015; ~2–3 weeks forward. |
| Calendar — splits | `/api/calendar/splits` | 1 | Data from 2015; several months forward. |
| Screener | `/api/screener` | 5 | `filters=[[...]]` URL-encoded JSON; max `limit=100`. |
| Search | `/api/search/{query}` | 1 | **Demo key forbidden here.** URL-encode spaces. |
| Exchanges | `/api/exchanges-list/` | 1 | Static-ish list of supported venues. |
| Tickers per exchange | `/api/exchange-symbol-list/{EXCHANGE}` | 1 | Active by default; `delisted=1` for inactives. |
| Bulk EOD | `/api/eod-bulk-last-day/{EXCHANGE}` | 100 | Use sparingly. |
| Macro (bonds / rates) | `/api/eod/{TICKER}.GBOND` / `.MONEY` | 1 / 10 | E.g. `UK10Y.GBOND`, `EURIBOR3M.MONEY`. |

## Smallest possible call

```bash
set -a; source .env; set +a
curl -sS "https://eodhd.com/api/eod/AAPL.US?api_token=$EODHD_API_KEY&fmt=json&from=2026-04-01&to=2026-05-25" | jq '.[-5:]'
```

The same call from Python (no extra dependency beyond `requests` + `python-dotenv` already common in the repo):

```python
import os, requests
from dotenv import load_dotenv

load_dotenv()
key = os.environ["EODHD_API_KEY"]

r = requests.get(
    "https://eodhd.com/api/eod/AAPL.US",
    params={"api_token": key, "fmt": "json", "from": "2026-04-01", "to": "2026-05-25"},
    timeout=30,
)
r.raise_for_status()
print(r.json()[-5:])
```

> `requests.get(..., params={...})` is preferred over f-string URLs — it URL-encodes the screener `filters=[[...]]`, search queries with spaces, and other punctuation correctly. With `curl`, URL-encode by hand or quote the whole URL in single quotes.

## When to use this vs. alternatives

| Need | Reach for |
|------|-----------|
| Cited OHLCV, technicals, fundamentals, sentiment scores | **This skill.** |
| Live brokerage holdings (your own book) | `portfolio-analyzer` (robinhood-mcp) or `portfolio-export-analyzer`. |
| Headline narrative, primary-source filings, analyst commentary | Web search + `trading-swarm/references/source-allowlist.md`. EODHD news is aggregated; cross-check material headlines against Tier-1 sources. |
| Free-plan-only or no key | Stick to `/api/eod` (1 year), `/api/exchanges-list`, `/api/search`, `/api/news` and budget 20 calls/day. |

> An `eodhd` MCP entry exists in `.cursor/mcp.json` but is intentionally disabled by default — it floods the tool context. Do not enable it just to call EODHD. This skill's REST-via-`.env` path is the supported route.

## How the existing analysts should use this

Detailed recipes in [`references/usage-patterns.md`](references/usage-patterns.md). One-liners:

- `analyst-technical`: pull 1 year EOD with `/api/eod`, then up to 8 indicator series via `/api/technical?function=...`. Quote actual numbers and dates from the JSON — no fabricated OHLCV.
- `analyst-fundamentals`: one `/api/v1.1/fundamentals/{T}` call carries Highlights, Valuation, Balance Sheet, Income Statement, Cash Flow, Earnings, Splits/Dividends, ESG, holders. Slice with `filter=`.
- `analyst-news`: 7-day window via `/api/news?s={T}&from=...&to=...&limit=50`. Each article includes per-article sentiment. Aggregate with `/api/sentiments` for the macro picture.
- `analyst-sentiment`: pair `/api/sentiments` (daily aggregate) with `/api/news-word-weights` (theme detection). Flag divergence between sentiment trend and price trend.
- `analyst-macro` / `macro-swarm`: `UK10Y.GBOND`, `US10Y.GBOND`, `EURIBOR3M.MONEY`, etc. via `/api/eod`. Cross-check against the same source-allowlist as elsewhere.
- `market-opportunity-scan`: `/api/screener` is the discovery primitive; filter by sector/market-cap/signal, then hand picks to `trading-swarm`.

## Rules

1. **Cite the call.** Tag every quoted number with `Source: eodhd /api/eod/AAPL.US, as of {ISO timestamp}` (or the relevant endpoint). The verifier looks for this.
2. **Verify the upstream date.** EODHD updates EOD 2–3 hours post-close (15 min for major US). Note when the latest bar is older than expected and surface that as a data-quality flag, not a fact.
3. **Don't trust a single number.** Cross-check material price/valuation claims against `trading-swarm/references/source-allowlist.md` Tier-1 sources where possible.
4. **No trades, no recommendations from this skill.** It only fetches data; downstream personas (trader, risk, portfolio-manager) own direction.
5. **Token hygiene.** Token stays in env vars. If a user pastes a curl command that contains the literal token, tell them to revoke it and rotate.

## Common failure modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Response is a wall of comma-separated text | Forgot `fmt=json` on `/api/eod` | Always pass `fmt=json`. |
| `"Forbidden"` / 403 on `/api/v1.1/fundamentals/...` | Free plan or wrong package | Confirm plan; degrade to news + EOD only. |
| `403` on `/api/search/...` | Used `demo` key | Search rejects the demo key; use real `EODHD_API_KEY`. |
| `from`/`to` ignored on `/api/intraday` | Passed `YYYY-MM-DD` | Convert to Unix seconds (UTC). |
| Screener returns nothing | `filters=[[...]]` not URL-encoded | Use `requests`' `params=` or `--data-urlencode` with curl. |
| Daily limit exhausted mid-run | Burned 10×N on fundamentals loop | Cache per-ticker JSON to `.cache/eodhd/`; batch news with `limit=50`. |

## References

- [`references/endpoints.md`](references/endpoints.md) — every endpoint, parameters, response fields.
- [`references/usage-patterns.md`](references/usage-patterns.md) — recipes for each existing analyst persona.
- [`references/limits-and-costs.md`](references/limits-and-costs.md) — per-endpoint call math + free vs paid.
- [`references/ticker-codes.md`](references/ticker-codes.md) — `.US`, `.CC`, `.FOREX`, `.INDX`, `.GBOND`, `.MONEY`, exchange MICs.

Primary docs: [eodhd.com/financial-apis](https://eodhd.com/financial-apis/) — re-fetch if a field shape looks wrong; this skill mirrors the docs as of 2026-05-26.
