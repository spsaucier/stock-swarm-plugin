---
name: portfolio-export-analyzer
description: >-
  Analyzes a whole portfolio from an exported file (CSV, JSON, or pasted
  holdings table). No broker API or MCP — user supplies the export.
metadata:
  inspired-by: TradingAgents portfolio desk
compatibility: User provides a portfolio export or holdings table. No MCP required.
---

# Portfolio export analyzer

Whole-portfolio research from **user-supplied data** (broker export, spreadsheet, or pasted table). **No live API, no MCP, no credentials.**

For a live book, use `portfolio-analyzer` only if you have a read-only broker MCP (optional [robinhood-mcp](https://github.com/verygoodplugins/robinhood-mcp)). **Most users should use this export skill** with any broker CSV.

Tone: read [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md). Present trade-offs, not verdicts.

## Before you start

Ask for the export if not attached:

- Robinhood: Account → Reports → **Export** (CSV) or screenshot/table of positions
- Other brokers: positions/holdings CSV or JSON
- Minimum columns: **symbol**, **quantity** (or market value). **Cost basis** and **sector** help but are optional.

If the user only gives tickers without weights, treat each line equally and note that concentration metrics are approximate.

## Step 1 — Parse holdings

1. Read the file or pasted table; do not invent positions.
2. Normalize symbols (uppercase US tickers; note crypto/forex if present).
3. Compute **weight %** from market value or quantity × last price if user provided prices; else from quantity share.
4. Build a holdings table: symbol, qty, cost basis (if any), weight %, unrealized P&L % (if any).

## Step 2 — Portfolio health (web research)

Using [verification-protocol.md](../trading-swarm/references/verification-protocol.md) and [source-allowlist.md](../trading-swarm/references/source-allowlist.md):

| Check | What to report |
|-------|----------------|
| Concentration | Top 3–5 names as % of book; flag if any single name >15–20% (note if weights estimated) |
| Sector / theme overlap | Cluster by sector or narrative (e.g. mega-cap tech, energy) |
| Correlation risk | Likely pairs (e.g. QQQ + individual FAANG); flag, don't lecture |
| Earnings calendar | Names with earnings in next 14 days |
| Dividend income | If export includes dividends or user asked |
| Options | If export lists options, summarize notional / expiry risk |

## Step 3 — Per-holding pass (depth: quick | standard | deep)

| Depth | Holdings analyzed |
|-------|-------------------|
| quick | Top 5 by weight only |
| standard | Top 10 by weight |
| deep | All holdings (batch smaller names lightly) |

Per analyzed symbol: recent price trend, 1–2 material headlines, valuation snippet if available. Cite sources with dates.

For **deep** on top names, offer: *Run `trading-swarm` on {SYMBOL}* — do not run full swarm unless user asks.

## Step 4 — Devil's advocate & risk

Use [devils-advocate-prompts.md](../trading-swarm/references/devils-advocate-prompts.md):

- What breaks this book in a risk-off week?
- Largest single-point failures?
- What would you trim first under user's stated risk profile ([risk-profiles.md](../trading-swarm/references/risk-profiles.md))?

## Step 5 — Deliver

Follow [session-output-protocol.md](../trading-swarm/references/session-output-protocol.md):

1. Write `analyses/{DATE}-portfolio-export/analysis.md` using [assets/portfolio-export-template.md](assets/portfolio-export-template.md)
2. Optional: `holdings.json` with parsed normalized rows
3. Run `analysis-verifier` on quoted numbers
4. Append [disclaimer.md](../trading-swarm/references/disclaimer.md)

## Companion skills

| Skill | Use when |
|-------|----------|
| `trading-swarm` | Deep single-name desk on a holding |
| `market-opportunity-scan` | New ideas; compare scan picks vs this book for overlap |
| `macro-swarm` | Optional macro context before portfolio review |
| `us-tax-advisor` | Educational tax framing for harvesting / lot selection / year-end planning |

## Error handling

| Issue | Action |
|-------|--------|
| Unparseable export | Ask for CSV with symbol + quantity columns |
| Ambiguous symbol | Ask user to clarify (e.g. BRK vs BRK.B) |
| Stale export date | Note "as of export date"; flag if >7 days old |
