---
name: macro-swarm
description: >-
  Optional macroeconomic pre-phase for trading analysis. Runs index, rates,
  sector, geopolitical risk, and policy lenses, then synthesizes and
  cross-checks before the trading-swarm analyst team. Use when the user wants
  macro context first, market backdrop, or honeypot-style stock-consultation
  Step 0.
metadata:
  trading-agents-role: macro
  inspired-by: honeypot/macro-analysis
---

# Macro swarm (optional pre-phase)

Run **before** `trading-swarm` when macro context should frame single-name work. Loosely mirrors honeypot `macro-analysis` (7 agents → streamlined 5 passes in one session).

## Outputs

Write to session folder per [session-output-protocol.md](../trading-swarm/references/session-output-protocol.md):

- `00-macro-outlook.md` — synthesis for downstream analysts
- Optional: `index-data.json` if user wants structured data

## Execution order

| Step | Persona | Focus |
|------|---------|-------|
| 1 | **Index scout** | SPX, NDX, KOSPI/KOSDAQ (if relevant), USD/KRW; ±1% cross-check, 3 sources |
| 2a–d | **Parallel quad** | Rates · Sectors · Macro risks · Policy/leadership |
| 3 | **Macro synthesizer** | Merge into one outlook; cite only verified numbers |
| 4 | **Macro critic** | Logic gaps, stale data, missing bear scenario; PASS/FAIL |

Steps 2a–d can run as four subsections in one turn if subagents unavailable.

### Index scout

Indices and FX only — no stock picks. See [verification-protocol.md](../trading-swarm/references/verification-protocol.md) (±1% for indices).

### Rates lens

Fed/BoK (or relevant CB) path, yield curve shape, USD impact on the ticker’s earnings geography.

### Sector lens

Sector of the target ticker vs benchmarks; rotation and relative strength (qualitative + numbers where verified).

### Risk lens

Bull / base / bear **macro** scenarios (not company-specific). Include tail risks (liquidity, geopolitics, credit).

### Policy lens

Elections, trade policy, industrial policy, regulation affecting the sector.

### Synthesizer template

```markdown
## Macro outlook ({DATE})

**Regime:** risk-on | risk-off | mixed

**Index & FX snapshot:** [verified table]

**Rates & liquidity:** ...

**Sector backdrop for {TICKER}:** ...

**Top macro risks:** 1. ... 2. ... 3. ...

**Implication for single-name work:** [how analysts should weight news/tech/fundamentals]
```

### Critic gate

FAIL if: unverified index levels, internal contradictions, or no bear macro scenario. On FAIL, fix synthesizer once, then proceed or stop per user preference.

## Handoff

Pass `00-macro-outlook.md` into every `trading-swarm` analyst phase as **Macro context** section.
