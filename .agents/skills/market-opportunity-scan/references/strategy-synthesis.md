# Strategy synthesizer

Chief strategist role from [maia-skill](https://github.com/Hainrixz/maia-skill). **Do not re-fetch prices** — synthesize the four sector JSON/markdown reports.

## Inputs

- Four sector reports
- `risk_profile` from [risk-profiles.md](../../trading-swarm/references/risk-profiles.md)
- Optional: prior scan from [historical-tracking.md](../../trading-swarm/references/historical-tracking.md)
- Optional: user's exported book from `portfolio-export-analyzer` (overlap / concentration warnings)

## Steps

1. **Macro environment** — rates, inflation, risk appetite, geopolitics (cross-read sectors)
2. **Cross-sector insights** — use [cross-sector-insights.md](../../trading-swarm/references/cross-sector-insights.md); add custom if data warrants
3. **Risk-adjusted ranking** — apply profile penalties/boosts; produce **≥5** `risk_adjusted_picks`
4. **Portfolio allocation** — sector % + cash = 100; align with risk profile bands
5. **Historical accuracy** — if history exists, score prior calls
6. **Warnings** — concentration, correlation, data gaps, regime change

## Output schema

See [assets/strategy-report-schema.md](../assets/strategy-report-schema.md).

## Position sizing language

Express as ranges ("5–10% of a hypothetical portfolio"), not orders. Tie to `risk_profile` caps in risk-profiles.md.

## Handoff to single-name analysis

For ranks 1–3, suggest: `trading-swarm on {SYMBOL}` or `equity-research-report` for institutional memo format.
