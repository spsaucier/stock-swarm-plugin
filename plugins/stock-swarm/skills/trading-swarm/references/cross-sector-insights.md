# Cross-sector insight patterns

From [maia-skill](https://github.com/Hainrixz/maia-skill) strategy agent. The synthesizer should flag **≥2** when data supports them.

| Pattern | What it may imply |
|---------|-------------------|
| Gold ↑ + Crypto ↑ | Fiat hedge / liquidity seeking hard assets |
| USD ↑ + Stocks ↑ | Risk-on with strong dollar — often unstable |
| Oil ↑ + Stocks ↓ | Stagflation or margin pressure |
| Crypto ↑ + Stocks ↓ | Crypto decoupling — sector rotation |
| Gold ↑ + USD ↑ | Fear / safe-haven bid |
| Broad risk assets ↓ | Raise cash narrative; defer aggressive buys |
| Rates ↑ + Growth stocks ↓ | Duration headwind for tech |
| Commodities ↑ + Inflation data cooling | Supply shock vs demand story — investigate which |

## Output format

```markdown
### Cross-sector insights

1. **{pattern}** — {1 sentence evidence from sector reports}
   - *Implication:* {what a {risk_profile} investor should weigh}
```

Do not force patterns that the sector data does not support.
