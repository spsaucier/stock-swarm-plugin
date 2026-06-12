# Source agreement scoring

From [maia-skill](https://github.com/Hainrixz/maia-skill) sector agents. Use alongside [verification-protocol.md](verification-protocol.md).

## Rules

- Check **≥2 sources** per price or rate
- Record `sources_checked` as URL domains or site names
- Set `source_agreement`:

| Level | Price / rate spread | Action |
|-------|---------------------|--------|
| **high** | Within tight band (equities ±5%, FX ±0.1%, commodities ±0.5%, crypto ±1%) | Use in picks |
| **medium** | Wider but directionally same | Use with caveat in reasoning |
| **low** | Material disagreement | Do not rank highly; note discrepancy |

## Per-asset fields (market scan)

```yaml
source_agreement: high | medium | low
sources_checked: [coingecko.com, finance.yahoo.com]
confidence: 1-10  # separate from agreement — conviction on thesis
```

## Confidence guide (maia-style)

| Score | Meaning |
|-------|---------|
| 8–10 | Price, news, fundamentals, and social align |
| 5–7 | Mixed signals or medium agreement |
| 1–4 | Thin data, conflicting sources, or event risk |

Never set confidence ≥8 when `source_agreement` is **low**.
