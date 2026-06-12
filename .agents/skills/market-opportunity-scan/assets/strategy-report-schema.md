# Strategy report schema

```json
{
  "risk_profile": "conservative|moderate|aggressive",
  "macro_environment": {
    "summary": "string",
    "interest_rate_outlook": "rising|stable|falling",
    "inflation_outlook": "rising|stable|falling",
    "geopolitical_risk": "high|medium|low",
    "key_factors": ["string"]
  },
  "portfolio_allocation": {
    "crypto": 0,
    "stocks": 0,
    "currencies": 0,
    "materials": 0,
    "cash": 0
  },
  "cross_sector_insights": [
    { "insight": "string", "implication": "string" }
  ],
  "risk_adjusted_picks": [
    {
      "rank": 1,
      "name": "string",
      "symbol": "string",
      "sector": "crypto|stocks|currencies|materials",
      "confidence": 9,
      "risk_score": 6,
      "risk_adjusted_score": 8.2,
      "recommendation": "buy|hold|sell",
      "reasoning": "string",
      "position_size": "e.g. 5-10% hypothetical"
    }
  ],
  "historical_accuracy": null,
  "warnings": ["string"],
  "strategy_summary": "3-4 sentences"
}
```

`historical_accuracy` uses shape from [historical-tracking.md](../../trading-swarm/references/historical-tracking.md) when available.
