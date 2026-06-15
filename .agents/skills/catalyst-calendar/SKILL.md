---
name: catalyst-calendar
description: >-
  Builds a verified forward-and-back event timeline for a ticker — earnings,
  ex-dividend, splits, options expiries, macro prints, product launches,
  conferences, regulatory dates, and lockups. Invoked by trading-swarm after
  analysts, and on demand by trader, trader-momentum, persona-swarm, and other
  skills that need timing context. Not a persona; outputs a dated calendar only.
metadata:
  trading-agents-role: utility
  phase: "1.25-catalyst-calendar"
---

# Catalyst calendar

Produce a **dated event map** so downstream skills know what is coming, what just passed, and how timing affects entry, sizing, and hold period. You are a calendar analyst, not a famous investor and not a rating authority.

Voice: [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md). Factual, date-precise, explicit about unknowns.

## When to run

| Invoker | Timing |
|---------|--------|
| `trading-swarm` | After Phase 1 analysts, **before** `persona-swarm` (default on for stocks) |
| `persona-swarm` | Use existing calendar if present; run this skill first if missing |
| `trader` / `trader-momentum` | Before proposing entry — skip only if calendar already in session |
| `research-manager` / debate | Read calendar for catalyst-aware horizon |
| User asks | "What catalysts?", "earnings date", "timing", "event calendar" |

**Skip when:** user opts out, crypto-only quick run, or user only wants a single analyst report with no trade timing.

## Inputs

- Ticker, as-of date (required)
- Analyst reports: technical, sentiment, news, fundamentals (required in swarm)
- Optional: `00-macro-outlook.md`, `analyst-macro`
- Optional: `eodhd` for `/api/calendar/earnings`, splits, trends (preferred when key exists)

Do not invent dates. Unverified items go in **Watchlist (unconfirmed)** with source gap noted.

## Window (defaults)

| Direction | Default | Override |
|-----------|---------|----------|
| Back | 7 days | User horizon |
| Forward | 90 days | User horizon (e.g. "next 2 weeks only") |

## Event categories

Scan every category; mark **N/A** when not applicable to the ticker (e.g. no FDA for a bank).

| Category | Examples | Primary sources |
|----------|----------|-----------------|
| **Earnings & guidance** | Report date, BMO/AMC, quiet period, conference call | EODHD calendar, IR site, news report |
| **Corporate actions** | Ex-div, record date, split, buyback blackout | EODHD splits, fundamentals, filings |
| **Options & vol** | Monthly/quarterly OPEX, known max-pain/OI clusters if cited | Exchange calendar + verified options data; else standard OPEX only |
| **Macro (relevant)** | FOMC, CPI, PCE, jobs, GDP — only if moves the name | Macro outlook, news, central bank calendars |
| **Company milestones** | Product launch, keynote, ship date, store opening | News, IR, verified press releases |
| **Conferences** | Investor day, industry conf (GTC, WWDC, JPM Healthcare), presentation slot | IR calendar, news |
| **Regulatory / legal** | FDA PDUFA, antitrust ruling, tariff effective date | News, FDA calendar, filings |
| **Capital markets** | IPO lockup expiry, secondary offering window, index rebalance | News, filings, index provider |
| **Political / policy** | Signed bill effective date, hearing (not MNPI) | News, public calendars — not `persona-pelosi` PTR copy-trade |

Event-type checklist: [event-types.md](references/event-types.md).

## Data gathering

1. **Mine analyst reports** — extract every dated item already cited; do not duplicate without cross-check.
2. **EODHD** (if `EODHD_API_KEY` in `.env`): earnings + splits per [eodhd](../eodhd/SKILL.md). One batched calendar call when possible.
3. **Web / IR** — company investor relations events page, recent 8-K for dated milestones.
4. **Deterministic dates** — compute standard monthly OPEX (3rd Friday) and next quarterly OPEX for index-heavy names; label as **exchange schedule**, not name-specific flow.

Verify material dates per [verification-protocol.md](../trading-swarm/references/verification-protocol.md).

## Output template

Use this header verbatim so downstream skills can parse the section:

```markdown
## Catalyst calendar — {TICKER}

**As-of:** {DATE}  
**Window:** {start} → {end}  
**Data quality:** Verified core dates | Partial | Sparse — {one line}

### Timeline

| Date | Event | Category | Timing note | Source | Status |
|------|-------|----------|-------------|--------|--------|
| YYYY-MM-DD | ... | Earnings / OPEX / Macro / ... | days until / days since | ... | Confirmed / Estimated / Unconfirmed |

Sort ascending by date. Include **past 7d** events that still affect vol or sentiment.

### Next 14 days (action window)

- **Highest impact:** {event} on {date} — {why it matters for the trade}
- **Volatility regime:** expanding into | compressing after | quiet | unknown
- **Quiet period / blackout flags:** {if any}

### Timing implications (not a rating)

- **Favor waiting until after:** {event + condition}
- **Favor acting before:** {event + condition}
- **Hard avoid:** {e.g. binary event with no edge, through earnings without plan}

### Watchlist (unconfirmed)

| Item | Why it might matter | What would confirm it |
|------|---------------------|------------------------|
| ... | ... | IR page / filing / ... |
```

## Rules

- **No Buy/Hold/Sell** — timing context only; traders and PM rate.
- Distinguish **confirmed** (primary source or two agreeing sources) vs **estimated** (consensus earnings date) vs **unconfirmed** (rumor).
- If earnings is within the user's likely hold window, it must appear in **Next 14 days** or timeline with BMO/AMC.
- Options: never claim "max pain" or heavy OI without a cited source; standard OPEX dates are fine to compute.
- Pass output to all Phase 2+ skills as **Catalyst calendar** section in `analysis.md`.
- Session artifact: `04a-catalyst-calendar.md` per [session-output-protocol.md](../trading-swarm/references/session-output-protocol.md).

## Downstream consumers

Skills that should **read** this output when present:

- `persona-swarm` (all lenses — especially WSB, O'Neil, Pelosi)
- `researcher-bull` / `researcher-bear`
- `research-manager`
- `trader` / `trader-momentum`
- `risk-aggressive` / `risk-conservative` / `risk-neutral`
- `portfolio-manager`

If invoked standalone, deliver the calendar only — suggest `trading-swarm` if the user wants a full recommendation.
