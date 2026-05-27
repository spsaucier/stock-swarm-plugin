---
name: market-opportunity-scan
description: >-
  Multi-sector market opportunity scan inspired by maia-skill (Tododeia): four parallel
  sector researchers (crypto, stocks, forex, commodities) plus a strategy synthesizer
  with risk profiles, source agreement scoring, cross-sector insights, and optional
  historical accuracy tracking. Use for "analyze markets", investment opportunities,
  market report, best assets today, or multi-asset research across asset classes.
license: MIT
metadata:
  author: trading-agents-skills
  version: "1.0"
  inspired-by: Hainrixz/maia-skill
---

# Market opportunity scan

Discover and rank opportunities across **crypto, stocks, forex, and commodities** — then synthesize for a risk profile. Loosely based on [maia-skill](https://github.com/Hainrixz/maia-skill) (5-agent design) as **markdown + optional JSON**, without requiring the Tododeia Next.js dashboard.

Tone: read [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md) before writing. Rank with calibrated confidence; if signals are mixed, say so.

## vs other skills

| Skill | Scope |
|-------|--------|
| `market-opportunity-scan` | Multi-sector discovery + top picks (maia-style) |
| `trading-swarm` | Deep single-ticker desk (TradingAgents-style) |
| `portfolio-export-analyzer` | Your holdings from an exported file |
| `macro-swarm` | Macro-only pre-phase |

Typical stack: `market-opportunity-scan` → `trading-swarm` on rank #1–3, or `portfolio-export-analyzer` to compare picks vs your exported book.

## Step 1 — Risk profile

Ask if not provided ([risk-profiles.md](../trading-swarm/references/risk-profiles.md)):

- **conservative** — preservation, lower vol
- **moderate** — balanced (default)
- **aggressive** — growth, higher vol tolerance

## Step 2 — History (optional)

Load latest file per [historical-tracking.md](../trading-swarm/references/historical-tracking.md) from `analyses/history/`.

## Step 3 — Four sector researchers (parallel)

Run four in-character passes using [references/sector-research.md](references/sector-research.md):

| Sector | Anchors | Discover |
|--------|---------|----------|
| Crypto | BTC, ETH | 3–5 trending alts |
| Stocks | SPX, IXIC | 3–6 catalyst-driven names |
| Forex | DXY | 3–5 event-driven pairs |
| Commodities | Gold, WTI | 3–5 relevant materials |

Each sector:

- Fresh web research (today's date in queries)
- [verification-protocol.md](../trading-swarm/references/verification-protocol.md) + [source-agreement.md](../trading-swarm/references/source-agreement.md)
- Output per [assets/sector-asset-schema.md](assets/sector-asset-schema.md)
- Do **not** use a fixed ticker list every run — discover what's relevant **now**

Social: real themes only; apply sentiment analyst anti-fabrication rules for posts.

## Step 4 — Strategy synthesizer

Follow [references/strategy-synthesis.md](references/strategy-synthesis.md):

- Macro environment block
- [cross-sector-insights.md](../trading-swarm/references/cross-sector-insights.md) (≥2 when valid)
- Risk-adjusted top **5+** picks
- `portfolio_allocation` summing to 100%
- `warnings`, `strategy_summary`
- `historical_accuracy` if prior scan exists

Output schema: [assets/strategy-report-schema.md](assets/strategy-report-schema.md).

## Step 5 — Deliver

1. Write `analyses/{DATE}-market-scan-{id}/market-scan.md` from [assets/market-scan-template.md](assets/market-scan-template.md)
2. Optional JSON: `report.json` in same folder
3. Save history snapshot: `analyses/history/{DATE}-market-scan.json`
4. Run `analysis-verifier` on material numbers
5. Append [disclaimer.md](../trading-swarm/references/disclaimer.md)

## Step 6 — Follow-ups (offer, don't auto-run)

- Deep dive: `trading-swarm {SYMBOL}`
- Compare to holdings: `portfolio-export-analyzer` (attach export)
- Recurring scans: user may schedule manually (no `/loop` unless their client supports it)

## Error handling

| Failure | Action |
|---------|--------|
| Sector JSON malformed | Re-prompt once; else `data_unavailable: true` for that sector |
| No web data | Mark sector unavailable; do not invent prices |
| Strategy fails | Fall back to confidence sort within sectors; note degraded synthesis |
| First run | `historical_accuracy: null` |

## Freshness

Every invocation does **new** research — do not reuse prior scan prices as current.

## References

| Doc | Purpose |
|-----|---------|
| [sector-research.md](references/sector-research.md) | Per-sector discovery & sources |
| [strategy-synthesis.md](references/strategy-synthesis.md) | Synthesizer steps |
| [risk-profiles.md](../trading-swarm/references/risk-profiles.md) | Profile scoring |
| [source-agreement.md](../trading-swarm/references/source-agreement.md) | Agreement tiers |
| [historical-tracking.md](../trading-swarm/references/historical-tracking.md) | Accuracy over time |
