# EODHD endpoint reference

Mirror of [eodhd.com/financial-apis/](https://eodhd.com/financial-apis/) as of 2026-05-26. Re-fetch the source page if a field shape looks wrong — EODHD evolves the surface.

All examples assume:

```bash
set -a; source .env; set +a
```

Every URL takes `api_token=$EODHD_API_KEY` and (almost always) `fmt=json`. The token always goes in the query string — there is no header auth.

---

## 1. End-of-Day OHLCV — `/api/eod/{TICKER}`

Cost: **1 call** regardless of date range.

```bash
curl -sS "https://eodhd.com/api/eod/AAPL.US?api_token=$EODHD_API_KEY&fmt=json&from=2025-01-01&to=2026-05-25"
```

Parameters:

| Param | Default | Notes |
|-------|---------|-------|
| `fmt` | `csv` | **Set explicitly to `json` for this skill.** |
| `period` | `d` | `d` daily, `w` weekly, `m` monthly. |
| `order` | `a` | `a` ascending, `d` descending. |
| `from` / `to` | — | `YYYY-MM-DD`. |
| `filter` | — | E.g. `last_close`, `last_volume` to return one scalar. |

Response (array of objects):

```json
[{"date":"2026-05-23","open":189.12,"high":190.40,"low":188.77,"close":189.95,"adjusted_close":189.95,"volume":51234567}]
```

`open/high/low/close` are raw (not split-adjusted). `adjusted_close` is split + dividend adjusted. For split-only adjustment, use `/api/technical/{T}?function=splitadjusted`.

Free plan: any ticker, 1 year of history.

---

## 2. Intraday OHLCV — `/api/intraday/{TICKER}`

Cost: **5 calls**.

```bash
# 09:35 UTC 2021-08-02 → 09:35 UTC 2021-09-02
curl -sS "https://eodhd.com/api/intraday/AAPL.US?api_token=$EODHD_API_KEY&fmt=json&interval=5m&from=1627896900&to=1630575300"
```

| Param | Default | Notes |
|-------|---------|-------|
| `interval` | `5m` | `1m`, `5m`, `1h`. |
| `from` / `to` | — | **Unix seconds, UTC** — *not* `YYYY-MM-DD`. |
| `split-dt` | `0` | If `1`, splits the timestamp into separate `date` and `time` fields. |

Time-range caps: 1m → 120 d, 5m → 600 d, 1h → 7200 d. 1m for US since 2004; 5m / 1h for everyone from Oct 2020. Finalized ~2–3 h after after-hours close.

---

## 3. Live (delayed) quote — `/api/real-time/{TICKER}`

Cost: **1 call per ticker.** Stocks delayed 15–20 min; FX ~1 min.

```bash
# Single ticker
curl -sS "https://eodhd.com/api/real-time/AAPL.US?api_token=$EODHD_API_KEY&fmt=json"

# Batch — first ticker in path, rest via s=, comma-separated, ≤15–20 per call.
curl -sS "https://eodhd.com/api/real-time/AAPL.US?s=MSFT.US,NVDA.US,BTC-USD.CC&api_token=$EODHD_API_KEY&fmt=json"
```

Response fields: `code`, `timestamp` (Unix UTC seconds), `gmtoffset`, `open`, `high`, `low`, `close`, `volume`, `previousClose`, `change`, `change_p`.

`timestamp == -1` or `volume == "NA"` means the venue has not opened yet today.

---

## 4. Technical indicators — `/api/technical/{TICKER}`

Cost: **5 calls per request.**

```bash
curl -sS "https://eodhd.com/api/technical/AAPL.US?api_token=$EODHD_API_KEY&fmt=json&function=rsi&period=14&from=2026-01-01&order=d"
```

| Param | Default | Notes |
|-------|---------|-------|
| `function` | — required | See table below. |
| `period` | `50` | Range 2–100000 (where applicable). |
| `from` / `to` / `order` / `fmt` | as for `/api/eod` | |
| `splitadjusted_only` | `0` | Set to `1` to compute on split-only-adjusted closes (works for `sma`, `ema`, `wma`, `volatility`, `rsi`, `slope`, `macd`). |
| `filter` | — | E.g. `last_rsi`, `last_ema` to return one scalar. |

Functions and their extra parameters:

| Function | Extra params | Output keys |
|----------|--------------|-------------|
| `splitadjusted` | `agg_period=d\|w\|m` | OHLC split-adjusted |
| `avgvol`, `avgvolccy` | `period` | `value` |
| `sma`, `ema`, `wma` | `period` | `value` |
| `volatility` | `period` | `value` |
| `rsi`, `stddev`, `slope`, `dmi`, `adx`, `cci`, `atr` | `period` | `value` |
| `stochastic` | `fast_kperiod=14`, `slow_kperiod=3`, `slow_dperiod=3` | `k_values`, `d_values` |
| `stochrsi` | `fast_kperiod=14`, `fast_dperiod=14` | `k_values`, `d_values` |
| `macd` | `fast_period=12`, `slow_period=26`, `signal_period=9` | `macd`, `signal`, `divergence` |
| `sar` | `acceleration=0.02`, `maximum=0.20` | `value` |
| `beta` | `code2=GSPC.INDX`, `period` | `value` |
| `bbands` | `period` | `uband`, `mband`, `lband` |

---

## 5. Fundamentals — `/api/v1.1/fundamentals/{TICKER}`

Cost: **10 calls.** JSON only. The legacy `/api/fundamentals/{T}` still works; v1.1 fixes Q4 collisions in Earnings Trend and exposes `Q1..Q4` labels.

```bash
curl -sS "https://eodhd.com/api/v1.1/fundamentals/AAPL.US?api_token=$EODHD_API_KEY&fmt=json"

# Subset by top-level section
curl -sS "https://eodhd.com/api/v1.1/fundamentals/AAPL.US?filter=General,Highlights,Valuation&api_token=$EODHD_API_KEY"
```

Common top-level sections (stocks):

| Section | Contains |
|---------|----------|
| `General` | Code, name, sector, industry, IPO date, address, exchange, currency, country, officers, listings, `IsDelisted` |
| `Highlights` | Market cap, EBITDA, P/E, PEG, EPS, dividend yield, profit/operating margin, ROA, ROE, revenue, RPS, gross profit, diluted EPS, quarterly earnings growth YoY |
| `Valuation` | Trailing/forward P/E, P/S, P/B, EV/Revenue, EV/EBITDA |
| `SharesStats` | Shares outstanding, float, % insider, % institutional |
| `Technicals` | Beta, 52-week high/low, 50-day MA, 200-day MA, short ratio, short % |
| `SplitsDividends` | Forward / trailing yields, ex-div date, payout ratio, history |
| `AnalystRatings` | Rating, target price, strong buy/buy/hold/sell/strong sell counts |
| `Holders` | Institutions + funds with shares, % held, change |
| `InsiderTransactions` | Date, owner, code, transaction, value |
| `ESGScores` | E, S, G, total, controversy levels |
| `outstandingShares` | Quarterly + annual share counts |
| `Earnings` | `History`, `Trend` (quarterly + annual in v1.1), `Annual` |
| `Financials` | `Balance_Sheet`, `Cash_Flow`, `Income_Statement` (each with `currency_symbol`, `quarterly`, `yearly`) |

ETFs return a different shape with `ETF_Data.Asset_Allocation`, `ETF_Data.Sector_Weights`, `ETF_Data.Holdings`, etc.

Use `filter=` to drop weight. Examples:

```
filter=General,Highlights                 # quick name/valuation snapshot
filter=Financials::Income_Statement       # nested path with :: separator
filter=Earnings::Trend::quarterly         # nested with quarterly-only earnings trend
```

---

## 6. News articles — `/api/news`

Cost: **5 calls per request + 5 per ticker.** One ticker request = 10 calls.

```bash
curl -sS "https://eodhd.com/api/news?s=AAPL.US&from=2026-05-18&to=2026-05-25&limit=50&api_token=$EODHD_API_KEY&fmt=json"
```

| Param | Required | Notes |
|-------|----------|-------|
| `s` | Yes if `t` not set | Ticker (`AAPL.US`). |
| `t` | Yes if `s` not set | Topic tag (`technology`, `earnings release`, etc.). |
| `from` / `to` | No | `YYYY-MM-DD`. |
| `limit` | No (default 50, max 1000) | |
| `offset` | No | Pagination. |
| `fmt` | No | `json` or `xml`. |

Each article: `date` (ISO 8601), `title`, `content`, `link`, `symbols[]`, `tags[]`, `sentiment{polarity, neg, neu, pos}`.

Standard tag list (subset): `earnings release`, `earnings report`, `earnings surprise`, `price target`, `growth rate`, `dividend payments`, `insider transactions`, `institutional investors`, `share price`, `revenue growth`, `roe`, `quarterly results`. EODHD also auto-detects AI tags (e.g. `MERGERS AND ACQUISITIONS`, `ARTIFICIAL INTELLIGENCE`).

---

## 7. Aggregate sentiment — `/api/sentiments`

Cost: 1 call per ticker (comma-separated).

```bash
curl -sS "https://eodhd.com/api/sentiments?s=AAPL.US,BTC-USD.CC&from=2026-04-01&to=2026-05-25&api_token=$EODHD_API_KEY&fmt=json"
```

Response: object keyed by ticker, each value an array of `{date, count, normalized}` (normalized ∈ [-1, 1]; `count` = article count that day).

---

## 8. News word weights — `/api/news-word-weights`

```bash
curl -sS "https://eodhd.com/api/news-word-weights?s=AAPL.US&filter[date_from]=2026-04-08&filter[date_to]=2026-04-16&page[limit]=10&api_token=$EODHD_API_KEY&fmt=json"
```

AI-derived keyword weights over news in a window. Slow — narrow the window. Returns `{data: {word: weight, ...}, meta: {news_found, news_processed}, links: {next}}`.

> The query uses bracketed param names (`filter[date_from]`). With `curl`, single-quote the URL or URL-encode brackets. With Python `requests`, the brackets are literal in dict keys: `params={"filter[date_from]": "..."}`.

---

## 9. Corporate-events calendar — `/api/calendar/{earnings|trends|ipos|splits}`

Cost: 1 call per request.

```bash
# Upcoming earnings for a few names
curl -sS "https://eodhd.com/api/calendar/earnings?symbols=AAPL.US,MSFT.US&api_token=$EODHD_API_KEY&fmt=json"

# Whole-market earnings window
curl -sS "https://eodhd.com/api/calendar/earnings?from=2026-05-26&to=2026-06-09&api_token=$EODHD_API_KEY&fmt=json"

# Forward + historical EPS trend (JSON only)
curl -sS "https://eodhd.com/api/calendar/trends?symbols=AAPL.US&api_token=$EODHD_API_KEY&fmt=json"

# Recent + upcoming IPOs (~2–3 weeks forward, from Jan 2015)
curl -sS "https://eodhd.com/api/calendar/ipos?from=2026-05-26&to=2026-06-09&api_token=$EODHD_API_KEY&fmt=json"

# Splits — historical (from 2015) + several months forward
curl -sS "https://eodhd.com/api/calendar/splits?symbols=TSLA.US&from=2020-01-01&to=2030-01-01&api_token=$EODHD_API_KEY&fmt=json"
```

| Endpoint | Required params | Notes |
|----------|-----------------|-------|
| `/api/calendar/earnings` | one of `symbols` or `from`/`to` | Returns `report_date`, `before_after_market`, `currency`, `actual`, `estimate`, `difference`, `percent`. |
| `/api/calendar/trends` | `symbols=...` | Per-symbol arrays of quarterly + annual estimate vs actual EPS. |
| `/api/calendar/ipos` | optional `symbols` or `from`/`to` | Items include filing/amended ranges, offer price, share count. |
| `/api/calendar/splits` | optional `symbols` or `from`/`to` | `effective_date`, `split_ratio` (e.g. `"4:1"`). |

---

## 10. Screener — `/api/screener`

Cost: **5 calls.**

```bash
curl -sS -G "https://eodhd.com/api/screener" \
  --data-urlencode "api_token=$EODHD_API_KEY" \
  --data-urlencode "sort=market_capitalization.desc" \
  --data-urlencode 'filters=[["market_capitalization",">",1000000000],["earnings_share",">",0],["sector","=","Technology"],["exchange","=","us"]]' \
  --data-urlencode "signals=200d_new_hi" \
  --data-urlencode "limit=50" \
  --data-urlencode "offset=0"
```

| Param | Required | Notes |
|-------|----------|-------|
| `filters` | No | JSON array of `[field, op, value]`. Use `requests` `params=` or `--data-urlencode` — do not hand-build. |
| `signals` | No | Comma-separated calculated filters. |
| `sort` | No | `field.asc` or `field.desc`. Numeric fields only. |
| `limit` | No | Default 50, max 100. |
| `offset` | No | Max 999. |

Filterable fields (subset): `code`, `name`, `exchange`, `sector`, `industry`, `market_capitalization`, `earnings_share`, `dividend_yield`, `refund_1d_p`, `refund_5d_p`, `avgvol_1d`, `avgvol_200d`, `adjusted_close`.

Operations: strings → `=`, `match`; numbers → `=`, `>`, `<`, `>=`, `<=`.

Signals: `200d_new_lo`, `200d_new_hi`, `bookvalue_neg`, `bookvalue_pos`, `wallstreet_lo`, `wallstreet_hi`.

`sector` and `industry` with multi-word names need `match` (not `=`).

---

## 11. Search — `/api/search/{query}`

Cost: 1 call. **Demo key forbidden here.**

```bash
curl -sS "https://eodhd.com/api/search/Apple%20Inc?limit=5&api_token=$EODHD_API_KEY&fmt=json"
```

| Param | Notes |
|-------|-------|
| `query_string` | Ticker, name, or ISIN. URL-encode spaces. |
| `limit` | Default 15, max 500. |
| `bonds_only` | `1` to restrict to bonds. |
| `exchange` | Filter (`US`, `LSE`, `NYSE`, etc.). |
| `type` | `all`, `stock`, `etf`, `fund`, `bond`, `index`, `crypto`. |

Each result: `Code`, `Exchange`, `Name`, `Type`, `Country`, `Currency`, `ISIN`, `previousClose`, `previousCloseDate`, `isPrimary`.

---

## 12. Exchanges and ticker lists

```bash
curl -sS "https://eodhd.com/api/exchanges-list/?api_token=$EODHD_API_KEY&fmt=json"

curl -sS "https://eodhd.com/api/exchange-symbol-list/US?type=etf&api_token=$EODHD_API_KEY&fmt=json"
```

`/api/exchanges-list/` returns 60+ venues with `Name`, `Code`, `OperatingMIC`, `Country`, `Currency`, `CountryISO2`, `CountryISO3`. Includes virtual classes: `EUFUND`, `CC` (crypto), `FOREX`, `GBOND`, `MONEY`.

`/api/exchange-symbol-list/{CODE}`:

| Param | Notes |
|-------|-------|
| `delisted=1` | Return only inactive tickers. |
| `type` | `common_stock`, `preferred_stock`, `stock`, `etf`, `fund`. |

For US: pass `US` to get NYSE + NASDAQ + ARCA + OTC consolidated, or pass an explicit code (`NYSE`, `NASDAQ`, `BATS`, `OTCQB`, `PINK`, `OTCQX`, `OTCMKTS`, `NMFQS`, `NYSE MKT`, `OTCBB`, `OTCGREY`, `OTC`).

---

## 13. Bulk last-day EOD — `/api/eod-bulk-last-day/{EXCHANGE}`

Cost: **100 calls.** Plus 1 per symbol if `symbols=...` is used.

```bash
curl -sS "https://eodhd.com/api/eod-bulk-last-day/US?api_token=$EODHD_API_KEY&fmt=json&filter=extended"
curl -sS "https://eodhd.com/api/eod-bulk-last-day/US?api_token=$EODHD_API_KEY&type=splits&fmt=json"
curl -sS "https://eodhd.com/api/eod-bulk-last-day/US?symbols=AAPL,MSFT&api_token=$EODHD_API_KEY&fmt=json"
```

| Param | Notes |
|-------|-------|
| `type` | omit for prices; `splits` or `dividends` for those. |
| `date` | Specific date `YYYY-MM-DD`. |
| `symbols` | Comma-separated; `symbols` does **not** work for splits/dividends. |
| `filter=extended` | Adds company name, EMA50/200, avgvol14/50/200 — only for the past 30 days. |
| `fmt` | `csv` default; `json` for richer fields. |

---

## 14. Macro — government bonds and money market

These live under `/api/eod/{TICKER}.GBOND` and `/api/eod/{TICKER}.MONEY` (1 call for GBOND, 10 calls for MONEY).

```bash
# UK 10-year yield
curl -sS "https://eodhd.com/api/eod/UK10Y.GBOND?api_token=$EODHD_API_KEY&fmt=json"

# EURIBOR 3 month
curl -sS "https://eodhd.com/api/eod/EURIBOR3M.MONEY?api_token=$EODHD_API_KEY&fmt=json"

# ECB EUR/USD reference rate
curl -sS "https://eodhd.com/api/eod/ECBEURUSD.MONEY?api_token=$EODHD_API_KEY&fmt=json"
```

Discover available tickers via `/api/exchange-symbol-list/GBOND` and `/api/exchange-symbol-list/MONEY`.

---

## Generic guardrails

- **URL-encode user input.** Search queries, screener filters, news tags — pass via `params=` (Python) or `--data-urlencode` (curl).
- **Cache.** Each `/api/v1.1/fundamentals/{T}` call is 10 of your 100k daily calls. Persist responses to `.cache/eodhd/{ticker}.json` per session and stamp them with the request time.
- **Detect plan tier early.** If `/api/v1.1/fundamentals/AAPL.US?filter=General` returns 403/402, you are on the free plan or the wrong package — degrade gracefully (EOD + news + search only) and tell the user.
- **Time zone.** Everything is UTC. Intraday timestamps are Unix seconds UTC. EOD `date` is the trading-day date in the exchange's local calendar.
