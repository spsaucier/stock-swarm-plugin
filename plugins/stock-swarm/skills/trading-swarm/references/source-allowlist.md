# Source allowlist

Tiered sources for equity research (honeypot `stock-data-verifier` pattern, generalized).

## Tier 1 — primary (at least one per numeric claim)

### US equities & ETFs

| Data | Sources |
|------|---------|
| Quotes, ratios | finance.yahoo.com, bloomberg.com, marketwatch.com |
| ETF fees, holdings | etf.com, issuer sites (ishares.com, vanguard.com) |
| Filings | sec.gov EDGAR |

### Korea equities & ETFs

| Data | Sources |
|------|---------|
| Quotes, ratios | finance.naver.com, data.krx.co.kr, kind.krx.co.kr |
| Filings | dart.fss.or.kr |
| ETF fees | samsungfund.com, miraeassetfund.co.kr |

## Tier 2 — cross-check

| Region | Examples |
|--------|----------|
| US | seekingalpha.com, morningstar.com, reuters.com, wsj.com |
| Korea | securities.samsung.com, securities.miraeasset.com, hankyung.com, mk.co.kr |

## Tier 3 — narrative only

Reuters, FT, company IR, central bank releases — good for news/macro, not sole source for prices.

## Blocklist (never sole source for numbers)

- Personal blogs, Medium substacks
- Wikipedia (live prices)
- Reddit, StockTwits, X/Twitter, YouTube
- Unattributed aggregator sites

Sentiment analysts may **quote** social text when actually retrieved; blocklist still applies to **price/fundamental** verification.
