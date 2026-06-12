---
name: equity-research-report
description: >-
  Reformats completed trading-swarm analysis into an institutional-style equity
  research memo with executive summary, catalysts, valuation scenarios, and
  risk table. Use when the user wants sell-side style output, @equity-research
  format, or a detailed single-ticker memo instead of the default swarm doc.
metadata:
  trading-agents-role: formatter
  inspired-by: honeypot/equity-research
---

# Equity research report (institutional format)

**Input:** finished `trading-swarm` analysis (all phases). **Do not** fetch new data unless filling verified gaps flagged in `analysis-verifier`.

Tone: institutional, not pompous. Follow [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md) — preserve calibrated confidence and present scenarios, not single-track verdicts.

## Structure (exact headers)

```markdown
# {TICKER} — Equity research memo ({DATE})

## Executive summary
**{Rating}** · Price context · 1–2 sentence thesis · Key catalyst · Risk/reward in plain terms.

## Fundamental analysis
Metrics with YoY/QoQ where known · Peer table (P/E, P/S, margins) · Forward view from fundamentals analyst.

## Catalyst analysis
| Horizon | Catalyst | Timing | Impact |
|---------|----------|--------|--------|
| 0–6 mo | | | |
| 6–24 mo | | | |

## Valuation & scenarios
| Case | Assumptions | Fair value / return | Probability |
|------|-------------|---------------------|-------------|
| Bull | | | |
| Base | | | |
| Bear | | | |

Weights must sum to 100%. No false precision — ranges OK.

## Risk assessment
Company · Macro · Position sizing notes (ranges, not advice).

## Technical & positioning context
From technical analyst; 52-week range, supports/resistance if verified.

## Recommendation summary

| Metric | Value |
|--------|-------|
| Rating | Buy / Hold / Sell (or 5-tier if PM used Overweight/Underweight) |
| Conviction | High / Medium / Low |
| Horizon | e.g. 6–12 months |
| Key invalidation | What would break the thesis |

## Disclaimer
[Use disclaimer.md](../trading-swarm/references/disclaimer.md)
```

## Quality bar

- Specific numbers only when already verified in source analysis
- Name analyst firms only when actually cited in source material
- Include bear case prominently (from bear researcher + risk debate)
