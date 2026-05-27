# Data gathering (no Python app required)

Skills replace the TradingAgents Python data tools with agent-native research. **Never invent prices, filings, or headlines.** If data is unavailable, say so and lower confidence.

**Verification:** follow [verification-protocol.md](verification-protocol.md) and [source-allowlist.md](source-allowlist.md) (honeypot `stock-data-verifier` pattern).

## Required inputs

Ask the user when missing:

- **Ticker / symbol** (e.g. NVDA, BTC-USD)
- **As-of date** (analysis anchor; default: today)
- **Asset type:** stock (default) or crypto
- **Depth:** quick (1 debate round each) or standard (2 rounds, default) or deep (3+)

## Stock — technical (analyst-technical)

Gather ~6–12 months of price history, then compute or cite:

- Trend: 50 SMA, 200 SMA, 10 EMA (golden/death cross context)
- Momentum: MACD line, signal, histogram; RSI (note trend persistence in strong moves)
- Volatility: Bollinger bands, ATR for stop placement
- Volume: VWMA or volume trend vs price

**Sources (pick what works in your environment):**

- Web search: "[TICKER] stock chart technical analysis [DATE]"
- Financial sites: Yahoo Finance, TradingView public pages, broker research
- Shell (optional): `curl` public chart APIs only if the user approves network commands

Select **up to 8** complementary indicators; avoid redundant pairs (e.g. RSI + StochRSI).

## Stock — fundamentals (analyst-fundamentals)

- Company profile, sector, market cap
- Latest income statement, balance sheet, cash flow highlights
- Valuation: P/E, P/S, EV/EBITDA, margins, growth, debt
- Insider activity if findable
- Red flags: dilution, covenant stress, accounting noise

**Sources:** SEC EDGAR (10-K/10-Q), Yahoo Finance statistics, company IR, earnings call summaries.

## News & macro (analyst-news)

- 7-day window around as-of date
- Company-specific headlines
- Macro: rates, FX, sector regulation, geopolitics affecting the name

**Sources:** Reuters, Bloomberg snippets, company PR, central bank releases. Prefer primary headlines over commentary.

## Sentiment (analyst-sentiment)

Triangulate three layers (do not fabricate social posts):

1. **News tone** — institutional framing from headlines
2. **Retail social** — StockTwits/X/Reddit *only if you can retrieve real posts*; otherwise state "social feed unavailable"
3. **Divergence** — where news and retail disagree

Weight Reddit/forum posts by engagement when visible. Flag thin sample sizes.

## Crypto

Fundamentals may be sparse. Emphasize on-chain metrics, ETF flows, regulatory news, and correlation to BTC/ETH if applicable. Label gaps explicitly.

## Cross-check rules

- Two independent sources for material claims when possible
- Quote dates on every number
- Distinguish **fact** (earnings beat) from **opinion** (bullish thread)
