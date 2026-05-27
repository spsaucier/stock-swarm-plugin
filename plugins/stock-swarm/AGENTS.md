# Stock Swarm — Agent Skills

Multi-agent trading research as portable [Agent Skills](https://agentskills.io/home). The host agent plays each persona in sequence; no Python runtime required.

## Orchestration

| Skill | Role |
|-------|------|
| `trading-swarm` | Full pipeline: analysts → debate → trader → risk → portfolio manager |
| `macro-swarm` | Optional deep macro pre-phase (multi-step) |
| `market-opportunity-scan` | Multi-sector discovery + strategy synthesis |
| `analysis-verifier` | Final QA on numbers, sources, tone |

## Analysts

| Skill | Role |
|-------|------|
| `analyst-technical` | Charts, indicators, price action |
| `analyst-fundamentals` | Financials, valuation, quality |
| `analyst-sentiment` | News tone, social, divergences |
| `analyst-news` | Headlines, macro linkage |
| `analyst-macro` | Single-turn regime read (pair with momentum) |
| `eodhd` | Structured EODHD REST data backbone |

**Optional MCP (not in-repo credentials):** Alpha Vantage (quotes/fundamentals), Robinhood read-only (`portfolio-analyzer`), [X MCP](https://docs.x.com/tools/mcp) for live social (`analyst-sentiment`, `trader-momentum`) — see README and `analyst-sentiment/references/x-mcp-setup.md`.

## Research & trade

| Skill | Role |
|-------|------|
| `researcher-bull` / `researcher-bear` | Investment debate |
| `research-manager` | Commits to plan + five-tier rating |
| `trader` | Default transaction proposal |
| `trader-momentum` | Rules-based momentum / breakout |
| `opportunity-cost` | Compare vs cash, index, existing book |

## Risk & output

| Skill | Role |
|-------|------|
| `risk-aggressive` / `risk-conservative` / `risk-neutral` | Risk triangle debate |
| `portfolio-manager` | Final synthesis + rating |
| `equity-research-report` | Institutional memo format |

## Portfolio & tax

| Skill | Role |
|-------|------|
| `portfolio-export-analyzer` | Holdings from CSV/export (no API) |
| `portfolio-analyzer` | Live book via optional read-only broker MCP (e.g. Robinhood) |
| `us-tax-advisor` | US tax education only — not tax advice |

Shared references: `trading-swarm/references/` under this plugin's `skills/` tree (verification, allowlist, disclaimer, voice).

**Disclaimer:** Research and education only. Not financial, investment, trading, legal, or tax advice.
