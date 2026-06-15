# Catalyst event types (reference)

Expand any category when the ticker warrants it. Skip irrelevant rows.

## Earnings & guidance

- Next report date (and fiscal quarter)
- Before market open (BMO) vs after close (AMC)
- Last report date (for post-earnings drift context)
- Guidance / quiet period if disclosed
- Earnings call date/time (if separate from report)

**Sources:** EODHD `/api/calendar/earnings`, company IR, 8-K.

## Corporate actions

- Ex-dividend and record dates
- Stock split effective date
- Spinoff / merger vote / closing (if pending)

**Sources:** EODHD `/api/calendar/splits`, NASDAQ dividend history, 8-K.

## Options & volatility calendar

**Deterministic (no API needed):**

- **Monthly equity OPEX:** 3rd Friday of each month (US)
- **Quarterly index OPEX:** 3rd Friday of Mar, Jun, Sep, Dec (SPX, NDX, RUT, VIX complex)

**Requires verified data (do not guess):**

- Ticker-specific options open interest peaks
- VIX expiration clusters
- LEAP roll dates mentioned in filings or news

Label computed OPEX as `Exchange schedule (standard)` not `Confirmed name-specific flow`.

## Macro (include only if material to the name)

| Event | Typical cadence |
|-------|-----------------|
| FOMC decision | ~8 scheduled meetings/year |
| CPI / PCE | Monthly |
| Nonfarm payrolls | First Friday |
| GDP advance | Quarterly |

Tie to the name: rate-sensitive (REITs, banks), consumer (retail), FX-exposed (multinationals).

## Company milestones

- Product launch / GA date
- Keynote (Apple, Google, Tesla AI day, etc.)
- Production ramp / facility opening
- Partnership go-live
- Contract award deadline (defense, gov IT)

**Sources:** Press release, IR events, news analyst report with date.

## Conferences & investor relations

- Investor day / analyst day
- Industry conference presentation (slot + date)
- Roadshow / conference attendance (if public)

## Regulatory & legal

- FDA PDUFA / AdCom (biotech)
- FTC / DOJ decision window (if public docket)
- Tariff or rule **effective date** (not speculation)
- Trial verdict date (if scheduled and public)

## Capital markets structure

- IPO lockup expiry (from S-1 / news)
- Index inclusion / exclusion effective date (S&P, Russell)
- Passive rebalance dates (quarterly index reconstitution)

## Political / policy (calendar only)

- Committee hearing on sector (public schedule)
- Bill signing / regulation effective date

For STOCK Act PTR patterns use `persona-pelosi`, not this skill.

## Status labels

| Status | Meaning |
|--------|---------|
| **Confirmed** | Primary source or two independent agreeing sources |
| **Estimated** | Consensus date (e.g. earnings month) without firm day |
| **Unconfirmed** | Rumor, single blog, or undated leak — watchlist only |
