---
name: persona-swarm
description: >-
  Runs five famous-investor persona lenses in parallel after the analyst team:
  high-beta retail (WSB), Buffett/Munger value, O'Neil CAN SLIM, Burry
  contrarian, and policy/disclosure flow (Pelosi). Synthesizes agreement and
  tension before the bull/bear debate. Standard phase in trading-swarm for
  stocks. Use when the user wants persona views, famous investor takes, or
  multi-style framing on a ticker.
metadata:
  trading-agents-role: persona-orchestrator
  phase: "1.5-persona-swarm"
  version: "1.0"
---

# Persona swarm

Run **five investing personas** on the same ticker after Phase 1 analyst reports. Each persona reads the four analyst reports (and optional macro outlook) and produces an independent view. A short **synthesizer** pass maps agreement, tension, and who to weight for the investment debate.

Inspired by multi-desk shops where value, growth, macro, and tactical traders argue before a PM decision — without impersonating real people or giving financial advice.

## When to run

| Run | Skip |
|-----|------|
| Standard `trading-swarm` on **stocks** | User explicitly opts out ("no personas") |
| User asks for Buffett/Burry/WSB/etc. take | Crypto-only quick runs (personas are equity-oriented) |
| Deep / standard depth preset | `quick` preset if user wants speed |

Default: **on** for standard and deep stock swarms.

## Inputs (required)

- `01-technical` through `04-fundamentals` (or inline analyst sections in `analysis.md`)
- **`04a-catalyst-calendar.md`** or `## Catalyst calendar` section — run `catalyst-calendar` first if missing
- Optional: `00-macro-outlook.md` from `macro-swarm` or `analyst-macro`
- Ticker, as-of date, asset type

If fundamentals or technical are missing, run those analysts first — personas cannot invent numbers.

## Execution

### Step 1 — Parallel persona passes

Run all five skills **in character**. Load each `SKILL.md` before writing that section. Subagents may run in parallel when available; otherwise run sequentially in this order:

| # | Skill | Lens |
|---|-------|------|
| 1 | `persona-wsb` | High-beta retail / catalyst convexity |
| 2 | `persona-buffett` | Quality value / 10-year compounder |
| 3 | `persona-oneil` | CAN SLIM growth + chart |
| 4 | `persona-burry` | Contrarian deep value / forensic |
| 5 | `persona-pelosi` | Policy catalysts + public STOCK Act disclosures |

Each persona outputs per its template. Pass **catalyst calendar** into every persona pass for timing context. **No persona issues the final portfolio rating.**

### Step 2 — Synthesizer

After all five views exist, write:

```markdown
## Persona swarm synthesis

**Agreement:** {what 3+ personas align on}
**Tension:** {e.g. Buffett pass vs O'Neil buy vs WSB yolo}
**Horizon clash:** {long-term quality vs tactical momentum — name it}

### Persona rating matrix

| Persona | Rating | Horizon | Key reason |
|---------|--------|---------|------------|
| WSB | ... | days–weeks | ... |
| Buffett | ... | years | ... |
| O'Neil | ... | weeks–months | ... |
| Burry | ... | years | ... |
| Pelosi | ... | weeks–quarters | ... |

### Implications for investment debate
- **Bull ammunition:** {personas + points}
- **Bear ammunition:** {personas + points}
- **Weighting suggestion:** {which lens fits user's stated horizon/risk — optional}

### Persona to challenge in debate
{Name the outlier or weakest-evidence view and why the bear/bull should stress-test it.}
```

Voice: [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md). Synthesis is calm and specific — not a vote count.

## Outputs

### Session folder

Write `04b-persona-swarm.md` containing all five persona sections + synthesis.

Append to master `analysis.md`:

```markdown
## Persona swarm

### High-beta retail (WSB lens)
...

### Buffett / Munger
...

### O'Neil / CAN SLIM
...

### Burry contrarian
...

### Policy & disclosure (Pelosi lens)
...

## Persona swarm synthesis
...
```

## Handoff to Phase 2

Pass the full persona swarm (especially **synthesis**) into:

- `researcher-bull` / `researcher-bear` — cite persona tension explicitly
- `research-manager` — may weight personas by user horizon
- `portfolio-manager` — optional "persona disagreement" paragraph in final decision

## Run a single persona

Load only the relevant skill (e.g. `persona-buffett`) when the user wants one famous-investor take, not the full swarm.

## Reference

| Doc | Purpose |
|-----|---------|
| [persona-frameworks.md](references/persona-frameworks.md) | Checklist anchors per persona |
| [catalyst-calendar](../catalyst-calendar/SKILL.md) | Run upstream if calendar section missing |
| [output-templates.md](../trading-swarm/references/output-templates.md) | Shared swarm headers |
| [persona-pelosi/references/stock-act-disclosures.md](../persona-pelosi/references/stock-act-disclosures.md) | Legal guardrails for disclosure lens |

## Persona index

| Skill | Archetype |
|-------|-----------|
| `persona-wsb` | High-beta retail / meme momentum |
| `persona-buffett` | Buffett / Munger quality value |
| `persona-oneil` | William O'Neil CAN SLIM |
| `persona-burry` | Michael Burry contrarian value |
| `persona-pelosi` | Policy flow + public congressional disclosures |

## Rules

- Personas **debate ideas**, not impersonate for entertainment.
- Pelosi lens: public filings only — see that skill's guardrails.
- WSB lens: no undefined-risk options, no all-in sizing.
- If all five agree bullish/bearish, synthesis must still name **what would break** the consensus (use [devils-advocate-prompts.md](../trading-swarm/references/devils-advocate-prompts.md)).
- Persona swarm does not replace bull/bear debate — it **feeds** it.
