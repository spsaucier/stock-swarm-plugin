---
name: trading-swarm
description: >-
  Orchestrates a multi-agent trading analysis swarm (technical, sentiment, news,
  fundamentals analysts → persona swarm → bull/bear debate → research manager →
  trader → risk triangle debate → portfolio manager) without running the TradingAgents Python
  app. Use when analyzing a stock or crypto ticker, running a trading desk
  simulation, multi-persona market analysis, or when the user mentions
  TradingAgents, trading swarm, or agent-based trade research.
license: MIT
metadata:
  author: trading-agents-skills
  version: "1.0"
  source-inspiration: TradingAgents (TauricResearch) — loosely adapted
---

# Trading swarm

Run the full **multi-agent trading desk** in your agent session. No Python graph, no LangGraph — only skills, web research, and a single working markdown report.

Inspired by [TradingAgents](https://github.com/TauricResearch/TradingAgents) (personas and flow), reimplemented as [Agent Skills](https://agentskills.io/home).

## Voice

Every persona in this swarm follows [voice-and-tone.md](references/voice-and-tone.md): respectful peer, calibrated confidence, options not mandates. Read it before running the first phase.

## Quick start

**User says:** "Run a trading swarm on NVDA as of 2026-05-22"

1. Create session folder per [session-output-protocol.md](references/session-output-protocol.md) (e.g. `analyses/2026-05-22-NVDA-abc123/analysis.md`).
2. **Optional:** run `macro-swarm` first if user wants macro backdrop (honeypot stock-consultation Step 0).
3. Execute phases below, loading each skill **in character** (read its `SKILL.md` before that phase).
4. Append outputs after each step; verify numbers per [verification-protocol.md](references/verification-protocol.md).
5. Run `analysis-verifier`, append disclaimer from [disclaimer.md](references/disclaimer.md).
6. **Optional:** reformat with `equity-research-report` for institutional memo layout.

**Extended pipeline (honeypot-inspired):**

```text
macro-swarm? → trading-swarm → analysis-verifier → equity-research-report?
```

## Inputs (confirm once)

| Input | Default |
|-------|---------|
| Ticker | Ask if missing |
| As-of date | Today |
| Asset type | `stock` |
| Analysts | All four |
| Persona swarm | On (stocks; skip on `quick` or if user opts out) |
| Investment debate rounds | 2 (4 turns) |
| Risk debate rounds | 2 (6 turns) |

**Depth presets**

- **quick** — 1 round each debate
- **standard** — 2 rounds (default)
- **deep** — 3+ rounds

## Phase 1 — Analyst team

Run in order; pass prior reports as context.

| Step | Skill | Folder |
|------|-------|--------|
| 0 (optional) | Macro regime | `analyst-macro` |
| 1 | Technical | `analyst-technical` |
| 2 | Sentiment | `analyst-sentiment` |
| 3 | News | `analyst-news` |
| 4 | Fundamentals | `analyst-fundamentals` |

Run `analyst-macro` at step 0 if a `macro-swarm` pre-phase wasn't used and macro context matters (especially before `trader-momentum`). For deeper macro pre-work, run `macro-swarm` instead.

Data rules: [references/data-gathering.md](references/data-gathering.md)

## Phase 1.5 — Persona swarm (stocks, default on)

Run `persona-swarm` after all four analysts complete. Five lenses in parallel:

`persona-wsb` · `persona-buffett` · `persona-oneil` · `persona-burry` · `persona-pelosi`

Then synthesize agreement/tension before the investment debate.

**Skip when:** `quick` preset, crypto-only run, or user says "no personas."

Save: `04b-persona-swarm.md` per [session-output-protocol.md](references/session-output-protocol.md).

## Phase 2 — Investment debate

Cycle `researcher-bull` → `researcher-bear` for `2 × investment_rounds` turns. Pass **persona swarm synthesis** as context — bulls and bears should cite persona agreement and tension.

Then `research-manager` → investment plan section.

Rating scale: [references/rating-scales.md](references/rating-scales.md)

## Phase 3 — Trader

Run `trader` with all analyst reports + investment plan.

**Alternative styles** — swap or augment based on user intent:

- `trader-momentum` — rules-based trend / breakout / relative-strength swing
- (default) `trader` — balanced Buy/Hold/Sell synthesis

If the user explicitly asks for momentum, breakouts, or short-horizon trades, use `trader-momentum`. Otherwise default to `trader`.

## Phase 4 — Risk debate

Cycle for `3 × risk_rounds` turns:

`risk-aggressive` → `risk-conservative` → `risk-neutral`

Then `portfolio-manager` → final decision.

## Phase 5 — Verify & deliver

1. Run `analysis-verifier` → save `10-verification.md` if using session folders
2. Append [disclaimer.md](references/disclaimer.md)
3. Show executive summary in chat
4. Remind: research only, not financial advice

If debate felt one-sided, inject [devils-advocate-prompts.md](references/devils-advocate-prompts.md) and re-run bear or risk round once.

## Run a single persona

Load only the relevant skill (e.g. `persona-buffett` or `analyst-technical`) when the user wants one report, not the full swarm.

## Reference docs

| Doc | Purpose |
|-----|---------|
| [workflow.md](references/workflow.md) | Diagram, working doc template, round counts |
| [data-gathering.md](references/data-gathering.md) | How to fetch market data without Python |
| [output-templates.md](references/output-templates.md) | Section headers for every persona |
| [rating-scales.md](references/rating-scales.md) | Buy/Overweight/Hold/Underweight/Sell |
| [verification-protocol.md](references/verification-protocol.md) | Anti-hallucination cross-checks |
| [source-allowlist.md](references/source-allowlist.md) | Tiered data sources |
| [session-output-protocol.md](references/session-output-protocol.md) | Folder layout & numbered artifacts |
| [disclaimer.md](references/disclaimer.md) | Required closing disclaimer |
| [devils-advocate-prompts.md](references/devils-advocate-prompts.md) | Stress-test one-sided conclusions |
| [voice-and-tone.md](references/voice-and-tone.md) | Shared writing posture for every persona |

## Companion skills

| Skill | Role |
|-------|------|
| `macro-swarm` | Optional macro pre-phase |
| `persona-swarm` | Five famous-investor lenses + synthesis (Phase 1.5) |
| `analysis-verifier` | Final QA pass |
| `equity-research-report` | Institutional memo formatting |
| `portfolio-export-analyzer` | Full book from export (no credentials) |
| `portfolio-analyzer` | Live book via local read-only robinhood-mcp |
| `market-opportunity-scan` | Multi-sector opportunity discovery (maia-skill style) |
| `industry-thesis-research` | Industry map, value chain, thematic thesis before single-name work |
| `opportunity-cost` | "Compared to what?" framing — cash, index, existing book, wait |
| `us-tax-advisor` | Educational tax framing for trade decisions (not advice) |

## Persona index

| Skill | Role |
|-------|------|
| `analyst-macro` | Regime, rates, USD, vol, sector rotation (optional Phase 0) |
| `analyst-technical` | Charts & indicators |
| `analyst-sentiment` | News + social sentiment |
| `analyst-news` | Macro & headlines |
| `analyst-fundamentals` | Financials & valuation |
| `persona-wsb` | High-beta retail / catalyst lens |
| `persona-buffett` | Buffett / Munger quality value |
| `persona-oneil` | O'Neil CAN SLIM growth-technical |
| `persona-burry` | Burry contrarian deep value |
| `persona-pelosi` | Policy flow & public disclosures |
| `persona-swarm` | Orchestrates all five personas |
| `researcher-bull` | Long thesis debate |
| `researcher-bear` | Short thesis debate |
| `research-manager` | Debate judge → plan |
| `trader` | Default Buy/Hold/Sell proposal |
| `trader-momentum` | Alternative tactical trader (trend / breakout / RS) |
| `risk-aggressive` | Upside champion |
| `risk-conservative` | Downside guardian |
| `risk-neutral` | Balanced risk |
| `portfolio-manager` | Final rating |

## Optional: memory across runs

If the user provides prior decisions or outcomes for the same ticker, pass them into `portfolio-manager` as **past lessons**. The Python app used `~/.tradingagents/memory/trading_memory.md`; you can mimic that with a user-maintained markdown log.
