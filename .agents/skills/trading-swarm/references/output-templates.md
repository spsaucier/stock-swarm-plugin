# Output templates

Each persona ends with a clearly labeled section. Copy these headers verbatim so downstream personas can parse prior work.

## Analyst reports

All analyst skills append a **Key signals** markdown table.

```markdown
## Key signals

| Signal | Direction | Evidence | Confidence |
|--------|-----------|----------|------------|
| ... | Bullish / Bearish / Neutral | ... | High / Medium / Low |
```

## Persona swarm — individual view

Each persona skill ends with its labeled section (e.g. `## Buffett / Munger view — {TICKER}`) and a **Persona rating** line — not the final portfolio rating.

## Persona swarm — synthesis

```markdown
## Persona swarm synthesis

**Agreement:** ...
**Tension:** ...
**Horizon clash:** ...

### Persona rating matrix

| Persona | Rating | Horizon | Key reason |
|---------|--------|---------|------------|
| ... | ... | ... | ... |

### Implications for investment debate
- **Bull ammunition:** ...
- **Bear ammunition:** ...
- **Weighting suggestion:** {which lens fits user's stated horizon/risk — optional}

### Persona to challenge in debate
{Name the outlier or weakest-evidence view and why the bear/bull should stress-test it.}
```

## Bull / Bear debate turn

```markdown
## [Bull|Bear] Analyst — Round N

[Conversational argument. Engage the opposing side directly. Cite analyst reports and persona synthesis when present — agreement, tension, outlier to stress-test.]

**Strongest point this round:** ...
**Weakest point in opposing view:** ...
```

## Research Manager — investment plan

```markdown
## Investment plan

**Recommendation:** Buy | Overweight | Hold | Underweight | Sell

**Rationale:** [Which debate arguments carried the decision. Conversational tone.]

**Strategic actions:** [Concrete steps for the trader: sizing bias, triggers, what would invalidate the thesis.]
```

## Trader — transaction proposal

```markdown
## Transaction proposal

**Action:** Buy | Hold | Sell

**Reasoning:** [2–4 sentences anchored in analyst reports and the investment plan.]

**Entry price:** [optional, quote currency]
**Stop loss:** [optional]
**Position sizing:** [optional, e.g. "5% of portfolio"]

FINAL TRANSACTION PROPOSAL: **BUY|HOLD|SELL**
```

## Risk debator turn

```markdown
## [Aggressive|Conservative|Neutral] Risk Analyst — Round N

[Conversational rebuttal focused on the trader proposal. Reference analyst reports. Challenge the other risk stances directly.]
```

## Portfolio Manager — final decision

```markdown
## Final trading decision

**Rating:** Buy | Overweight | Hold | Underweight | Sell

**Executive summary:** [2–4 sentences: entry, sizing, key risks, horizon.]

**Investment thesis:** [Evidence from the full pipeline; cite debate highlights.]

**Persona disagreement:** [optional — horizon clash or material split across persona lenses, when synthesis ran]

**Price target:** [optional]
**Time horizon:** [optional, e.g. "3–6 months"]
```
