# Historical recommendation tracking

Adapted from [maia-skill](https://github.com/Hainrixz/maia-skill) Step 3 / Step 7.

## Storage

```text
analyses/history/YYYY-MM-DD-market-scan.json
```

Keep last **30** files; delete older during save step.

## On each `market-opportunity-scan` run

1. Load latest `analyses/history/*.json` if present
2. Pass prior `risk_adjusted_picks` to strategy synthesizer
3. After run, compare prior buy/sell/hold calls to **current** prices (fresh search or MCP)
4. Emit `historical_accuracy` block:

```json
{
  "previous_date": "2026-05-15",
  "calls_made": 5,
  "calls_correct": 3,
  "accuracy_pct": 60,
  "notable": "BTC buy at $65k now $67.5k (+3.8%) — directionally correct"
}
```

## Directional correctness

| Prior call | Count as correct when |
|------------|----------------------|
| buy | Price higher now (or in-line if hold window <7d and flat) |
| sell | Price lower now |
| hold | Absolute move <10% over period |

Be explicit when sample size is tiny (first run: `"historical_accuracy": null`).

## Calibration

If `accuracy_pct` <50 over last 3 reports, strategy synthesizer should:

- Lower confidence scores by 1–2 points
- Add warning: "Recent scan track record weak — treat picks as exploratory"
- Prefer hold over buy unless source_agreement is high
