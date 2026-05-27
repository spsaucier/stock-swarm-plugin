# Risk profiles

Adapted from [maia-skill](https://github.com/Hainrixz/maia-skill) strategy agent. Ask once per scan; pass to synthesizer and ranking.

| Profile | Goal | Sector tilt | Single-asset cap (hypothetical) |
|---------|------|-------------|----------------------------------|
| **conservative** | Preservation, income | ↑ materials, ↓ crypto; favor blue chips, gold, defensive FX | ~5% high-vol names |
| **moderate** | Balanced growth | Default balance across crypto, stocks, forex, commodities | ~10% |
| **aggressive** | Max growth | ↑ crypto, momentum stocks; tolerate drawdowns | ~20% |

## Scoring adjustments (strategy synthesizer)

**Conservative**

- Penalize high-volatility picks (crypto −3, speculative stocks −2)
- Boost stability (gold +2, large-cap +1)
- Prefer hold/accumulate over aggressive buy

**Moderate**

- Slight crypto penalty (−1)
- Standard buy/hold/sell thresholds

**Aggressive**

- Boost momentum (+2 when 7d/30d trend aligned)
- Favor high `social_buzz` with fundamental support
- Buy-the-dip allowed when thesis intact

## Portfolio allocation bands (% must sum to 100 with cash)

| Sector | Conservative | Moderate | Aggressive |
|--------|--------------|----------|------------|
| stocks | 40–55 | 35–50 | 25–45 |
| materials | 20–30 | 15–25 | 10–20 |
| currencies | 10–20 | 10–20 | 5–15 |
| crypto | 0–10 | 5–15 | 15–30 |
| cash | 10–25 | 5–15 | 5–15 |

These are **research defaults**, not personalized advice. Override when macro regime clearly differs (e.g. liquidity crisis → raise cash in narrative).
