# EODHD ticker codes — `{SYMBOL}.{EXCHANGE}`

Every EODHD endpoint that takes a ticker uses the `{SYMBOL}.{EXCHANGE}` convention. The same symbol on different venues is a different ticker (e.g. `AAPL.US` ≠ `AAPL.TO` — the latter is the Canadian Apple CDR).

Discover anything not listed here via `/api/exchanges-list/` (venues) and `/api/exchange-symbol-list/{EXCHANGE}` (tickers within a venue), or `/api/search/{q}` (cross-venue search).

## US equities and ETFs — `.US`

| Suffix | Meaning |
|--------|---------|
| `AAPL.US` | Consolidated US — NYSE + NASDAQ + ARCA + OTC. Default for retail US equities. |
| `AAPL.NASDAQ` | NASDAQ only. |
| `AAPL.NYSE` | NYSE only. |
| `AAPL.BATS` | BATS only. |
| `OTCBB`, `PINK`, `OTCQB`, `OTCQX`, `OTCMKTS`, `NMFQS`, `OTCGREY`, `OTC`, `NYSE MKT` | OTC-side venues. |

Prefer `.US` unless you have a venue-specific reason.

## Indices — `.INDX`

| Ticker | Meaning |
|--------|---------|
| `GSPC.INDX` | S&P 500. |
| `DJI.INDX` | Dow Jones Industrial Average. |
| `IXIC.INDX` | NASDAQ Composite. |
| `NDX.INDX` | NASDAQ 100. |
| `RUT.INDX` | Russell 2000. |
| `VIX.INDX` | CBOE VIX. |
| `FTSE.INDX` | FTSE 100. |
| `N225.INDX` | Nikkei 225. |
| `HSI.INDX` | Hang Seng. |
| `STOXX50E.INDX` | EURO STOXX 50. |
| `GDAXI.INDX` | DAX. |

Use `/api/exchange-symbol-list/INDX` to enumerate the rest.

## Cryptocurrencies — `.CC`

| Ticker | Meaning |
|--------|---------|
| `BTC-USD.CC` | Bitcoin priced in USD. |
| `ETH-USD.CC` | Ether priced in USD. |
| `SOL-USD.CC` | Solana. |
| `XRP-USD.CC` | XRP. |

EODHD aggregates across exchanges (no single-venue crypto tickers). Quote currency goes in the symbol (`-USD`, `-EUR`, `-USDT`).

## Forex — `.FOREX`

| Ticker | Meaning |
|--------|---------|
| `EURUSD.FOREX` | EUR/USD. |
| `GBPUSD.FOREX` | GBP/USD. |
| `USDJPY.FOREX` | USD/JPY. |
| `DX-Y.NYB` | DXY (US Dollar Index) — note it sits under NYB, not FOREX. |

## Government bonds — `.GBOND`

Pattern: `{COUNTRY}{TENOR}.GBOND`.

| Ticker | Meaning |
|--------|---------|
| `US10Y.GBOND` | US 10-year. |
| `US2Y.GBOND`, `US5Y.GBOND`, `US30Y.GBOND` | Other US tenors. |
| `UK10Y.GBOND` | UK 10-year. |
| `DE10Y.GBOND` | Germany 10-year (Bund). |
| `JP10Y.GBOND` | Japan 10-year. |
| `FR10Y.GBOND`, `IT10Y.GBOND`, `ES10Y.GBOND` | France / Italy / Spain. |
| `BR10Y.GBOND`, `IN10Y.GBOND`, `CN10Y.GBOND` | Brazil / India / China. |

Tenors published: 1m, 3m, 6m, 1y, 3y, 5y, 10y (where available). Enumerate the full list with:

```bash
curl -sS "https://eodhd.com/api/exchange-symbol-list/GBOND?api_token=$EODHD_API_KEY&fmt=json"
```

## Money market and reference rates — `.MONEY`

| Ticker | Meaning |
|--------|---------|
| `EURIBOR1W.MONEY`, `EURIBOR1M.MONEY`, `EURIBOR3M.MONEY`, `EURIBOR6M.MONEY`, `EURIBOR12M.MONEY` | EURIBOR tenors. |
| `LIBORUSD1M.MONEY`, `LIBORUSD3M.MONEY`, `LIBORUSD6M.MONEY` | LIBOR USD (winding down). |
| `LIBOREUR2M.MONEY`, etc. | LIBOR by currency / tenor. |
| `ECBEURUSD.MONEY`, `ECBEURGBP.MONEY`, etc. | ECB reference rates (quoted vs EUR). |
| `NORGEUSDNOK.MONEY` | Norges Bank rates (quoted vs NOK). |
| `FEI.MONEY` | EURIBOR futures. |

`.MONEY` calls cost **10 calls** each — sparingly. Discover the full set:

```bash
curl -sS "https://eodhd.com/api/exchange-symbol-list/MONEY?api_token=$EODHD_API_KEY&fmt=json"
```

## Selected non-US equity venues

| Code | Venue |
|------|-------|
| `LSE` | London Stock Exchange. |
| `XETRA`, `F` | Deutsche Börse, Frankfurt. |
| `PA` | Euronext Paris. |
| `AS` | Euronext Amsterdam. |
| `MI` | Borsa Italiana (Milan). |
| `MC` | Bolsa de Madrid. |
| `TO`, `V` | Toronto / Vancouver (TSX, TSX-V). |
| `MX` | Mexican Stock Exchange. |
| `BR` | B3 (Brazil). |
| `HK` | Hong Kong. |
| `SHG`, `SHE` | Shanghai / Shenzhen. |
| `TSE`, `T` | Tokyo. |
| `KS`, `KQ` | Korea KOSPI / KOSDAQ. |
| `BSE`, `NSE` | Bombay / National Stock Exchange of India. |
| `AX` | ASX (Australia). |
| `JSE` | Johannesburg. |
| `WAR` | Warsaw. |

Examples:

- `BMW.XETRA`, `BMW.F` — BMW on Frankfurt vs XETRA.
- `BABA.US` vs `9988.HK` — Alibaba US ADR vs Hong Kong dual listing.
- `SAP.US` vs `SAP.XETRA` — SAP ADR vs primary.

## Virtual / synthetic venues

| Code | Asset class |
|------|-------------|
| `INDX` | Indices. |
| `CC` | Crypto. |
| `FOREX` | Forex pairs. |
| `GBOND` | Government bonds. |
| `MONEY` | Reference rates / money market. |
| `EUFUND` | European mutual funds. |

These aren't real exchanges; they're EODHD-internal namespaces for data not tied to a single venue.

## Quick lookup

```bash
# What is "ASML"?
curl -sS "https://eodhd.com/api/search/ASML?api_token=$EODHD_API_KEY&fmt=json" | jq '.[].Code + "." + .[].Exchange'

# All ETFs on US:
curl -sS "https://eodhd.com/api/exchange-symbol-list/US?type=etf&api_token=$EODHD_API_KEY&fmt=json"
```

The search endpoint rejects the `demo` token. Use the real `EODHD_API_KEY` for any lookup.
