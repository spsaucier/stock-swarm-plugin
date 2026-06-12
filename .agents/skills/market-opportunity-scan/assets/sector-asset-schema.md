# Sector asset fields

```json
{
  "name": "Bitcoin",
  "symbol": "BTC",
  "current_price": "$67,500.00",
  "change_24h": "+2.3%",
  "change_7d": "-1.5%",
  "change_30d": "+12.8%",
  "ytd_change": "+45.2%",
  "week_52_high": "$73,800.00",
  "week_52_low": "$38,500.00",
  "market_cap": "$1.3T",
  "volume_24h": "$28B",
  "sentiment": "bullish|bearish|neutral",
  "social_sentiment": "bullish|bearish|neutral|mixed",
  "social_buzz": "high|medium|low",
  "confidence": 7,
  "source_agreement": "high|medium|low",
  "sources_checked": ["coingecko.com", "finance.yahoo.com"],
  "key_news": ["headline with date context"],
  "social_highlights": ["paraphrased themes only — no fabricated posts"],
  "recommendation": "buy|hold|sell",
  "reasoning": "1-2 sentences"
}
```

Forex: `current_price` is the exchange rate. Commodities: note unit in `name` or `reasoning`.
