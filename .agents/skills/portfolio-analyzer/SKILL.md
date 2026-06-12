---
name: portfolio-analyzer
description: >-
  Analyzes an entire Robinhood portfolio via local read-only robinhood-mcp.
  Credentials stay in your .env on your machine — never sent to Trayd or other
  remote brokers. Use for live portfolio health check, holdings, or earnings
  calendar. Not for placing trades.
metadata:
  requires-mcp: robinhood
  inspired-by: verygoodplugins/robinhood-mcp
compatibility: Requires local robinhood-mcp MCP and ROBINHOOD_* vars in project .env. Read-only.
---

# Portfolio analyzer (local Robinhood MCP)

Whole-portfolio research using [robinhood-mcp](https://github.com/verygoodplugins/robinhood-mcp) running **on your machine** via `uvx`. **Read-only** — never place, modify, or cancel orders.

Tone: read [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md). Surface options, not verdicts; the user owns the decision.

**No Trayd / no third-party broker login.** Credentials are only in your gitignored `.env` and are read by the local MCP process.

Prefer zero credentials? Use `portfolio-export-analyzer` with a broker CSV instead.

## Before you start

1. MCP configured — [robinhood-mcp-setup.md](references/robinhood-mcp-setup.md)
2. `ROBINHOOD_USERNAME` and `ROBINHOOD_PASSWORD` set in project `.env` (optional `ROBINHOOD_TOTP_SECRET`)
3. Smoke test: `robinhood_get_portfolio` succeeds before continuing

If MCP is unavailable, stop and point the user to setup docs. Do not guess holdings from memory.

## Depth

| Depth | Behavior |
|-------|----------|
| quick | Snapshot + top 5 holdings |
| standard | Snapshot + top 10 + earnings calendar |
| deep | All holdings + optional `trading-swarm` on top 3 (only if user asks) |

## Step 1 — Snapshot (MCP)

Call once per run (see [mcp-tools.md](references/mcp-tools.md)):

1. `robinhood_get_portfolio`
2. `robinhood_get_positions`
3. `robinhood_get_options_positions`
4. `robinhood_get_dividends`
5. (optional) `robinhood_get_order_history` with `limit=30`, `state=executed`

Build holdings table: symbol, weight %, cost basis, P&L %, day change.

## Step 2 — Health checks

- **Concentration:** top 3–5 weights; flag single name >15–20%
- **Winners / losers:** day and vs cost basis
- **Drawdown flags:** positions down >20% from cost
- **Options risk:** summarize options book if non-empty
- **Dividend income:** summarize if material

## Step 3 — Calendar

For top holdings by weight, batch `robinhood_get_earnings` — list names with earnings in next 14 days.

## Step 4 — Per-holding (standard / deep)

Per analyzed symbol:

| Tool | Use |
|------|-----|
| `robinhood_get_fundamentals` | Valuation, 52w range |
| `robinhood_get_historicals` | `span=year`, `interval=day` |
| `robinhood_get_news` | 3–5 headlines |
| `robinhood_get_ratings` | Consensus |

Prefer `robinhood_get_position` when checking one ticker again.

## Step 5 — Watchlist (optional)

`robinhood_get_watchlist` → for symbols not held, `robinhood_get_quote` + fundamentals. Note overlap / correlation risk.

## Step 6 — Synthesis

- Rebalance *ideas* only (not orders)
- Devil's advocate on largest position — [devils-advocate-prompts.md](../trading-swarm/references/devils-advocate-prompts.md)
- Tag: `Source: robinhood-mcp/{tool_name}, as of {ISO timestamp}`

## Step 7 — Deliver

Follow [session-output-protocol.md](../trading-swarm/references/session-output-protocol.md):

1. Write `analyses/{DATE}-portfolio/analysis.md` from [assets/portfolio-analysis-template.md](assets/portfolio-analysis-template.md)
2. Run `analysis-verifier` on quoted numbers
3. Append [disclaimer.md](../trading-swarm/references/disclaimer.md)

## Error handling

| Issue | Action |
|-------|--------|
| Not logged in | User fixes `.env` / 2FA / approves push in Robinhood app; retry |
| MCP missing | Point to [robinhood-mcp-setup.md](references/robinhood-mcp-setup.md) |
| Rate limit | Pause and retry fewer symbols |
