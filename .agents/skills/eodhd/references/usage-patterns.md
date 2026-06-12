# EODHD usage patterns — recipes by persona

These map the existing trading-swarm personas onto specific EODHD endpoints, with concrete call sequences and call-budget math. Token is assumed loaded:

```bash
set -a; source .env; set +a
```

Token cost is "calls" per [`limits-and-costs.md`](limits-and-costs.md). 1 call ≈ 0.001 % of a paid plan's 100k daily budget; 5 % of the free plan's 20.

---

## `analyst-technical` — chart and indicator read

**Budget per ticker: ~1 + 5 × N indicators.** With 5 indicators that's 26 calls.

1. **Trend context** — `/api/eod/{T}?fmt=json&from=YYYY-MM-DD&period=d` for ~1 year of daily closes.
2. **Picked indicators** (up to 8 per the `analyst-technical` skill, but most reads use 4–6):
   - 50-day SMA: `/api/technical/{T}?function=sma&period=50`
   - 200-day SMA: `/api/technical/{T}?function=sma&period=200`
   - MACD default: `/api/technical/{T}?function=macd`
   - RSI 14: `/api/technical/{T}?function=rsi&period=14`
   - Bollinger 20: `/api/technical/{T}?function=bbands&period=20`
   - ATR 14: `/api/technical/{T}?function=atr&period=14`
3. **Anchor latest values** — append `&filter=last_<name>` to grab one number for the key-signals table (e.g. `filter=last_rsi`).
4. **Intraday confirmation** (optional) — `/api/intraday/{T}?interval=1h` for the past few sessions (Unix-seconds range).

Hand the JSON to the persona — quote the actual closes, dates, and indicator values into the technical report. No fabricated OHLCV.

Crypto: `BTC-USD.CC`, ETH-USD.CC` — same endpoints work. Forex: `EURUSD.FOREX`.

---

## `analyst-fundamentals` — financials, valuation, business quality

**Budget per ticker: 10 calls.** One full fundamentals pull covers nearly everything.

1. Single pull: `/api/v1.1/fundamentals/{T}?fmt=json`. Cache to `.cache/eodhd/fundamentals/{T}.json` for the session.
2. Slice in code, not via re-requests. Useful filters when echoing back to the user:
   - `General` → name, sector, IPO date, country, currency, officers.
   - `Highlights` → market cap, P/E, EPS, ROE, margins, revenue.
   - `Valuation` → trailing/forward P/E, EV/EBITDA, P/S, P/B.
   - `Earnings::Trend` (v1.1 splits Q vs A) → estimate consensus, surprise history.
   - `Financials::Income_Statement.yearly` / `quarterly`.
   - `Financials::Balance_Sheet.quarterly` → leverage check.
   - `Financials::Cash_Flow.yearly` → free cash flow.
   - `Holders` → ownership concentration.
   - `InsiderTransactions` → recent capital allocation signals.
3. Cross-reference recent earnings via `/api/calendar/earnings?symbols={T}` for the next report date (1 call).
4. Cross-check material valuation claims against Tier-1 sources (Yahoo Finance, Bloomberg, SEC EDGAR) per `trading-swarm/references/source-allowlist.md`.

For ETFs: the response shape is different — use `ETF_Data.Asset_Allocation`, `ETF_Data.Sector_Weights`, `ETF_Data.Holdings.Top_10_Holdings`, plus `ETF_Data.NetExpenseRatio`.

---

## `analyst-news` — 7-day company + macro headlines

**Budget per ticker: 10 calls for news + 1 for sentiment.**

1. Company news, 7-day window:

    ```bash
    curl -sS "https://eodhd.com/api/news?s=AAPL.US&from=2026-05-18&to=2026-05-25&limit=50&api_token=$EODHD_API_KEY&fmt=json"
    ```

   Each item carries `sentiment{polarity, neg, neu, pos}` — use it as a per-article tag, not as a substitute for reading the article.

2. Topic news (macro / sector backdrop): swap `s=` for `t=` with a tag like `earnings release`, `price target`, `MERGERS AND ACQUISITIONS`, `ARTIFICIAL INTELLIGENCE`.

3. Aggregate sentiment trend for the 7-day window:

    ```bash
    curl -sS "https://eodhd.com/api/sentiments?s=AAPL.US&from=2026-05-18&to=2026-05-25&api_token=$EODHD_API_KEY&fmt=json"
    ```

4. Cross-check material headlines against Tier-1 sources. EODHD aggregates from many feeds — for class actions, regulatory rulings, M&A, etc., open the article `link` and verify.

Mark each bullet in the persona's report with the article date and a short identifier; the verifier checks that dates exist.

---

## `analyst-sentiment` — daily aggregate + theme detection

**Budget per ticker: 1 (sentiments) + 1 (word weights, but slow).**

1. Daily aggregate sentiment over 30–60 days:

    ```bash
    curl -sS "https://eodhd.com/api/sentiments?s={T}&from=2026-04-01&to=2026-05-25&api_token=$EODHD_API_KEY&fmt=json"
    ```

2. Top themes over the same window:

    ```bash
    curl -sS "https://eodhd.com/api/news-word-weights?s={T}&filter[date_from]=2026-04-01&filter[date_to]=2026-05-25&page[limit]=20&api_token=$EODHD_API_KEY&fmt=json"
    ```

3. Compare with price: pull `/api/eod/{T}?from=...&fmt=json` for the same window and flag divergence (price up, sentiment falling — or vice versa).

EODHD's `sentiment.normalized` is news-derived; for retail social sentiment (Reddit, X), still rely on the manual triangulation in `analyst-sentiment/SKILL.md`. EODHD's score is not a substitute for community read.

---

## `analyst-macro` / `macro-swarm` — regime check and rate context

**Budget: ~5–10 calls.**

1. Yield curve snapshot — `/api/eod/{TICKER}.GBOND` for each tenor:
   - `US2Y.GBOND`, `US5Y.GBOND`, `US10Y.GBOND`, `US30Y.GBOND` for the US curve.
   - Same pattern for `UK*Y.GBOND`, `DE*Y.GBOND`, `JP*Y.GBOND`, etc.
2. Money-market context — `EURIBOR3M.MONEY`, `LIBORUSD3M.MONEY` (where still published), `ECBEURUSD.MONEY` for FX reference.
3. Volatility regime — `VIX.INDX` via `/api/eod/VIX.INDX`.
4. Sector rotation — `XLK.US`, `XLF.US`, `XLE.US`, `XLU.US`, `XLV.US`, `XLY.US`, `XLP.US`, `XLB.US`, `XLI.US`, `XLRE.US`, `XLC.US` over the past 1–3 months via `/api/eod/{T}`.
5. Discover unfamiliar macro tickers: `/api/exchange-symbol-list/GBOND` and `/api/exchange-symbol-list/MONEY`.

Output goes into the macro report; no buy/sell calls here.

---

## `market-opportunity-scan` — multi-sector discovery

**Budget per scan: 5 (screener) + 1 (EOD) × top picks.**

1. **Screen** — define the discovery question, then call `/api/screener` with filters and signals:

    ```bash
    curl -sS -G "https://eodhd.com/api/screener" \
      --data-urlencode "api_token=$EODHD_API_KEY" \
      --data-urlencode "sort=refund_5d_p.desc" \
      --data-urlencode 'filters=[["market_capitalization",">",2000000000],["adjusted_close",">",5],["exchange","=","us"]]' \
      --data-urlencode "signals=200d_new_hi" \
      --data-urlencode "limit=50"
    ```

   Filterable fields: `code`, `name`, `exchange`, `sector`, `industry`, `market_capitalization`, `earnings_share`, `dividend_yield`, `refund_1d_p`, `refund_5d_p`, `avgvol_1d`, `avgvol_200d`, `adjusted_close`.

   Signals: `200d_new_lo`, `200d_new_hi`, `bookvalue_neg`, `bookvalue_pos`, `wallstreet_lo`, `wallstreet_hi`.

2. **Enrich top N** — for each candidate, call `/api/eod/{T}` (1 call) and optionally `/api/v1.1/fundamentals/{T}` (10 calls — only if the user wants deep). Cap N to keep budget reasonable.

3. **Hand off** the survivors to `trading-swarm` per the maia-skill pattern.

Crypto / forex screening is not supported by `/api/screener` — for those, use `/api/exchange-symbol-list/CC` / `.FOREX` to enumerate and then loop with `/api/eod`.

---

## `portfolio-analyzer` (Robinhood MCP) + EODHD overlay

The local Robinhood MCP gives you holdings. EODHD enriches with cleaner valuation / sentiment / calendar.

For each unique symbol in `robinhood_get_positions`:

| Need | Robinhood tool | EODHD endpoint | Why EODHD wins |
|------|----------------|----------------|----------------|
| Multi-year history | `robinhood_get_historicals` | `/api/eod/{T}` | No span cap; faster. |
| Fundamentals depth | `robinhood_get_fundamentals` | `/api/v1.1/fundamentals/{T}` | Full statements + ESG. |
| Upcoming earnings | `robinhood_get_earnings` | `/api/calendar/earnings?symbols=...` | Batch in one call. |
| Sentiment trend | (n/a) | `/api/sentiments?s=...` | Daily aggregate. |

Budget for a 25-name book: 25 × 10 (fundamentals) + 1 × 25 (EOD) + 1 (calendar batch) ≈ 276 calls. Easy on paid; impossible on free.

---

## `equity-research-report` — sell-side memo

Use the same calls as `analyst-fundamentals` + `analyst-news` + `analyst-technical`, but emit per the memo template. Add:

- **Earnings trend table** from `Earnings::Trend::quarterly` in fundamentals.
- **Catalyst calendar** from `/api/calendar/earnings?symbols={T}` + `/api/calendar/splits?symbols={T}`.
- **Valuation table** from `Valuation` + `Highlights`.

---

## `us-tax-advisor` — lot-level history

Only useful if the user supplies their lots. Then:

- Verify cost basis dates via `/api/eod/{T}?from=<purchase_date>&to=<purchase_date>` — confirm a trading day's open/close that matches the user's broker reporting.
- Pull dividend history via `Financials::SplitsDividends.NumberDividendsByYear` or `/api/eod/{T}?period=...` if needed.

This skill cannot determine wash-sale status by itself; refer the user to a CPA.

---

## Defensive call patterns

- **Cache fundamentals.** Don't re-fetch `/api/v1.1/fundamentals/{T}` in the same run. Stash JSON in `.cache/eodhd/`.
- **Batch.** `/api/sentiments`, `/api/calendar/earnings`, `/api/calendar/trends`, `/api/real-time` all accept comma-separated `symbols` / `s=`. Use them.
- **Filter at the source.** `filter=last_close` on EOD returns a single number — cheaper to parse, smaller to log.
- **Fail loudly.** If a paid endpoint 403s, raise it to the user immediately — do not fall back to web search and pretend the data was authoritative.
