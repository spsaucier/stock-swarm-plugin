---
name: opportunity-cost
description: >-
  Capital allocation skill that compares a proposed trade or hold against
  realistic alternatives — cash / T-bills, broad index, existing portfolio
  positions, and "wait for a cleaner setup." Reframes "is this a good idea?"
  as "is this the best use of this dollar right now, after taxes and risk?"
  Use when deciding to enter, trim, add, swap, or pass; when sizing one
  opportunity against another; or when a position has run and you're
  wondering whether to ride or rotate.
metadata:
  decision-framework: hurdle-rate comparison
---

# Opportunity cost analysis

Reframe a trading or allocation question as **"compared to what?"** Voice rules in [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md) apply — the goal is to lay out the alternatives clearly, not to push a verdict.

A position can be **good in isolation and wrong in context**: a 6%-expected-return trade is a loss against a 5%-yielding T-bill once you net out taxes and risk.

## When this skill fits

| Fits | Doesn't fit |
|------|-------------|
| "Should I buy X?" — there's always an alternative | "What is X worth?" (use `analyst-fundamentals`) |
| Sizing decisions between two named opportunities | Long-term financial planning (route to a CFP) |
| Trim/add on a runner — keep the position or rotate? | Single-trade risk sizing (use `trader-momentum` or `trader`) |
| Comparing strategies (single name vs sector ETF vs index) | Macro regime call (use `analyst-macro`) |

## Inputs to gather

Ask only what you need:

1. **The candidate** — ticker, size, expected holding period, why the user is considering it
2. **Account type** — taxable, IRA (Trad/Roth), 401(k), HSA → drives the tax adjustment
3. **Risk tolerance** — affects which alternatives are real for the user
4. **Existing holdings** that the new capital would replace or compete with
5. **Cash on hand vs invested** — sets whether "do nothing" means cash drag or no change

If unknown, state the assumption and answer conditionally. Don't fill in numbers.

## The hurdle stack

Every candidate gets compared against, at minimum, **four** alternatives:

### 1. Cash hurdle (the floor)

What is the user's idle cash earning today?

- High-yield savings, money market, T-bill ladder
- Use a recent, citable rate; don't quote from memory
- This is the **risk-free** alternative — the candidate must beat this after taxes to make sense

Cite the source and date for the rate used.

### 2. Index hurdle (the baseline)

Broad index (SPX / total-market / global) expected return over the candidate's horizon.

Practical framing rather than precision: long-run nominal equity returns have averaged ~7–10%, but recent levels and starting valuations matter. **State a range, not a point**, and the assumption behind it.

For short holding periods (under a few months), the index hurdle should reflect base-rate uncertainty more, not less.

### 3. Existing-portfolio hurdle

If the user already owns names with conviction (or a sector ETF in the same theme), the question becomes: *would you trim Y to fund X?* If the answer is no, the candidate isn't beating what's already in the book.

For each meaningful overlap or alternative inside the portfolio, list:

- The name / fund
- Current weight
- Why it would or wouldn't be the source of funds

### 4. Patience hurdle (do nothing for now)

Waiting is a real choice. Frame what would have to be true to act later:

- Better entry price?
- Catalyst clarity (earnings, macro print, regulatory event)?
- Tax-year flip (let losses harvest, let gains turn long-term)?

If nothing would meaningfully change in the next 1–4 weeks, "wait" is weaker. Say so.

## Adjustments — apply before comparing

Raw expected returns are not comparable across alternatives. Adjust:

### Tax adjustment

| Account | Adjustment |
|---------|------------|
| Taxable, short-term | Apply marginal ordinary rate to gain |
| Taxable, long-term | Apply LTCG bracket (+ NIIT if applicable) |
| Roth IRA | No adjustment — returns are tax-free |
| Trad IRA / 401(k) | No current adjustment — future ordinary tax at withdrawal |
| HSA (used as retirement) | Treat as Roth-equivalent if used past 65 / for qualified expenses |

If the candidate is in taxable and the source of funds is selling another taxable holding with a gain, **add the tax cost of the sale** to the cost of the switch. Route to `us-tax-advisor` for specific harvesting or wash-sale framing.

### Risk adjustment

Don't pretend to know precise Sharpe ratios — most retail estimates are noise. Use a qualitative bucket:

| Bucket | Examples |
|--------|----------|
| Low | T-bills, short-duration treasuries |
| Below market | Broad investment-grade bond ETF, balanced fund |
| Market-like | Broad equity index |
| Above market | Sector ETF, single-name large cap |
| High | Speculative single-name, small cap, crypto, leveraged |

The candidate has to beat the same-bucket alternative by enough to justify any move *up* in risk. A small-cap that promises a tenth of a percent more than the S&P is a losing trade-off.

### Liquidity & friction

- Bid-ask spread cost on entry and exit
- Tax-lot fragmentation if the user already holds the name
- Time cost — a position that needs constant monitoring is not free

## Decision matrix template

```markdown
## Opportunity cost analysis — {candidate}

**Question:** {one-line restatement}
**Capital:** {amount or "% of book"}
**Holding horizon:** {weeks / months / years}
**Account:** {taxable / IRA / etc.}

### Candidate
**Expected return (range, horizon-adjusted):** {X}% to {Y}%
**Risk bucket:** {low / below-market / market / above-market / high}
**Confidence in estimate:** {high / medium / low + why}

### Alternatives

| Alternative | Pre-tax return est. | Risk bucket | After-tax adj. | Net vs candidate | Pick if... |
|-------------|---------------------|-------------|----------------|------------------|------------|
| Cash / T-bill | {rate}% | Low | {after-tax} | {Δ} | You want the floor, no view |
| Broad index | range | Market | {after-tax} | {Δ} | You have no edge in this name |
| Existing position {Y} | {est} | {bucket} | {after-tax} | {Δ} | Conviction in Y still holds |
| Wait 2–4 weeks | 0 + optionality | n/a | n/a | n/a | A real catalyst clarifies the setup |

### Tax cost of the switch (if funded by a sale)
- Source position: {name, lot, gain/loss, ST/LT}
- Estimated tax drag: {note — verify with CPA for material amounts}

### The honest read
{1–2 paragraphs. Where does the candidate actually win? Where does it lose? What would have to be true for the choice to flip?}

### Options
1. **Take the trade as proposed** — when {condition}
2. **Take a smaller version** — when {condition}
3. **Substitute** with {alternative} — when {condition}
4. **Wait** — when {condition}
5. **Pass** — when {condition}

### What to verify
- {specific number or assumption}
- {tax detail to confirm with CPA}
```

## Common patterns to surface

| Pattern | Likely call |
|---------|-------------|
| Candidate ≈ index, taxable account, no edge stated | Index probably wins after taxes and effort |
| Candidate within 100–150 bps of cash yield over the horizon | Cash often wins on a risk-adjusted basis |
| Source of funds is a long-term winner near a 1-year mark | Defer until LT; the rate arbitrage usually outweighs the entry timing |
| Candidate is in the same theme as 3+ existing holdings | Concentration risk — propose a substitute size or skip |
| User keeps looking — paralysis pattern | The honest answer may be "your existing book is fine; do less" |

## Rules

- Never give a single "buy/don't buy" verdict — present the matrix, then offer options.
- Cite the cash rate and any benchmark numbers; don't quote from memory.
- If the candidate's edge is genuinely strong, **say so plainly** — calibrated confidence cuts both ways.
- Tax framing is education only; route to `us-tax-advisor` for mechanics and CPA for filing.
- If the user is using leveraged or speculative instruments, note that opportunity cost compounds with risk — the alternative has to be worse by more, not less.

## Companion skills

| Skill | Use |
|-------|-----|
| `analyst-macro` | Sets the regime context that shapes index and cash expectations |
| `us-tax-advisor` | Tax-cost-of-switch detail when funding by a sale |
| `portfolio-export-analyzer` / `portfolio-analyzer` | Pull the actual existing-position alternatives |
| `trader` / `trader-momentum` | Sizing comes from those; opportunity cost decides *whether* to size at all |
| `market-opportunity-scan` | Rank multiple candidates against each other and against doing nothing |
