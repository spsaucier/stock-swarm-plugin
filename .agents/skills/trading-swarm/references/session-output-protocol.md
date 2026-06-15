# Session output protocol

Adapted from honeypot `file-save-protocol-stock`. Keeps multi-phase swarms auditable.

## Session folder

```text
analyses/{YYYY-MM-DD}-{TICKER}-{session_id}/
```

Generate `session_id` as 6 random alphanumeric chars if not provided.

## Master artifact

Always maintain:

```text
analyses/{date}-{ticker}-{id}/analysis.md
```

Use [assets/analysis-template.md](../assets/analysis-template.md). Update after **each phase** — do not claim "saved" without writing the file.

## Optional structured sidecars

When the user wants machine-readable output, add JSON summaries **alongside** markdown (never replace the narrative report):

| File | Phase | Producer |
|------|-------|----------|
| `00-macro-outlook.md` | Macro (optional) | macro-swarm |
| `01-technical.md` | Analyst | analyst-technical |
| `02-sentiment.md` | Analyst | analyst-sentiment |
| `03-news.md` | Analyst | analyst-news |
| `04-fundamentals.md` | Analyst | analyst-fundamentals |
| `04a-catalyst-calendar.md` | Calendar | catalyst-calendar |
| `04b-persona-swarm.md` | Personas | persona-swarm |
| `05-debate.md` | Bull/bear | researchers |
| `06-investment-plan.md` | Manager | research-manager |
| `07-trader-proposal.md` | Trader | trader |
| `08-risk-debate.md` | Risk | risk personas |
| `09-final-decision.md` | PM | portfolio-manager |
| `10-verification.md` | QA | analysis-verifier |

JSON mirrors (e.g. `04-fundamentals.json`) must not introduce numbers absent from markdown.

## Save rules

- Write with the editor/file tool; confirm path in the reply
- On write failure: report `FILE_SAVE_FAILED` — never pretend success
- MD summaries may condense JSON; **no new figures** in MD-only pass
