# Investment thesis framework

Process-first pattern (cf. [biga](https://github.com/sun-btc/biga) growth/event skills): structure the question before naming tickers.

## 1 — Falsifiable thesis statement

One sentence:

> **If** {condition} **then** {mechanism} **benefits** {group} **at the expense of** {group}, **until** {invalidation}.

Example:

> If hyperscaler AI capex growth decelerates below 20% YoY, then GPU and HBM suppliers with high customer concentration face estimate cuts, until cloud revenue re-accelerates or new workload categories offset training spend.

## 2 — Driver tree

| Driver | Must hold? | Observable proxy | Source type |
|--------|------------|------------------|-------------|
| ... | yes/no | ... | filing / macro / industry data |

Limit to **2–5** drivers — more dilutes focus.

## 3 — Beneficiaries & losers

For each **public** name:

| Field | Content |
|-------|---------|
| Ticker | Or "private / unlisted" |
| Role | Why this name is on the list |
| Mechanism | Revenue, margin, or multiple channel |
| Lag | Immediate vs 2–4 quarters |
| Evidence tier | A / B / C |
| Bear case | What breaks the link |

**Losers** get the same table — symmetry prevents one-sided cheerleading.

## 4 — Scenario grid (standard+ depth)

| Scenario | Probability band | Driver state | Implication for beneficiaries |
|----------|------------------|--------------|------------------------------|
| Bull | low / base / high | ... | ... |
| Base | ... | ... | ... |
| Bear | ... | ... | ... |

Use qualitative probability bands unless user supplies a formal model.

## 5 — Leading indicators & calendar

- **Quant:** order rates, book-to-bill, utilization, pricing, inventory (cite series)
- **Qual:** policy dates, product launches, earnings of bellwethers
- **Thesis health:** green / yellow / red if indicator moves vs expectation

## 6 — Invalidation checklist

Bullet what would make you **retire** the thesis:

- Specific data prints (with threshold if possible)
- Policy reversals
- Technology shifts (substitution)

## 7 — What this skill does *not* do

- DCF, comps, or price targets → use `trading-swarm` + `analyst-fundamentals`
- Portfolio weights → `market-opportunity-scan` or user discretion
- Tax/legal advice → `us-tax-advisor` only when user asks tax questions
