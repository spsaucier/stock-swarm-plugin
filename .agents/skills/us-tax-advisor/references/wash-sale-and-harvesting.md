# Wash sale rule and tax-loss harvesting

Practical reference for the most common tax planning question retail investors ask.

## The rule (IRC §1091)

You cannot deduct a loss on a sale of stock or securities if, within **30 days before or 30 days after** the sale, you (or your spouse, or a controlled entity) buy:

- The same security
- A "substantially identical" security
- An option or contract to buy a substantially identical security

Window is **61 days total** (30 + sale day + 30). Disallowed loss is added to the basis of the replacement shares; the holding period of the original carries forward.

## What counts as "substantially identical"

| Definitely yes | Probably yes (most pros treat as washes) | Generally no |
|----------------|------------------------------------------|--------------|
| Same CUSIP | Different share class of same company (Class A vs B with identical economics) | Different companies in same sector |
| Same ETF on different exchange | Calls/puts on the same underlying within the window | Different ETFs tracking different indexes (SPY vs RSP) |
| Reinvested dividend purchases | | Different bond issues from same issuer |

The IRS hasn't given a bright-line test; SPY vs VOO (both S&P 500) is the most-cited gray area. Many practitioners treat them as different funds because they have different sponsors, expense ratios, and minor methodology differences. Verify with a CPA before relying on it for material amounts.

## Common gotchas

1. **Automatic dividend reinvestment (DRIP)** in any account during the window will trigger a wash sale. Turn it off before harvesting.
2. **IRA / 401(k) repurchase** triggers a wash sale on a taxable-account loss. The disallowed loss is **permanently lost** because it can't be added to basis in a tax-advantaged account.
3. **Spouse's accounts** count. Year-end harvesting requires coordinating both households.
4. **End of year trades** that settle in January — for tax purposes, **trade date** governs.
5. **Multiple lots** of the same security — wash sale rule applies lot by lot; can shelter losses on some lots while triggering on others.
6. **Buy first, sell later** — yes, the window also runs **backward**. Buying more in the 30 days before a loss sale can wash that loss.

## Crypto status

As of the 2024 tax year, **digital assets are not securities for §1091 purposes** — the wash sale rule does not apply. Pending legislation has repeatedly proposed extending it; verify the current-year status before relying on this. Treat crypto wash-sale-free planning as a moving target.

## Harvesting playbook

### Setup

1. List unrealized losses by lot (specific-lot detail).
2. Check buys within prior 30 days for each candidate.
3. Disable auto-reinvest in retirement and taxable accounts.
4. Decide on replacement strategy.

### Replacement strategies

| Strategy | Pros | Cons |
|----------|------|------|
| Buy a similar but **not** substantially identical fund (e.g. swap S&P 500 ETF for total-market ETF) | Continuous market exposure | Tracking error vs original; potential drift |
| Sit in cash 31+ days, then re-buy original | Simplest bookkeeping | Market risk during the window |
| Buy a sector or theme proxy | Maintains broad exposure direction | Higher tracking error |

If the user is harvesting a single name they don't actually want anymore, the "replacement" is just **don't replace it** — they didn't want the position.

### After the 30-day window

If you held a "different" replacement, you can usually rotate back to the original; verify that doing so doesn't trigger any other wash via cross-account purchases.

## Reporting

- Brokers report wash sales per account on **Form 1099-B**
- Cross-account washes (different brokers, IRA, spouse) are **your responsibility** to track
- Disallowed loss flows to the basis of the replacement on **Form 8949** with code "W"

## When the math doesn't work

Harvesting is not always worth it:

- **No gains to offset and limited ordinary income offset** — $3k/year cap means harvesting a $50k loss in a year with no gains buys you ~$1k/year of tax savings for 17 years (carry-forward)
- **Bracket arbitrage** — harvesting in a low-income year to offset gains in a future high-income year can be backwards
- **Bid-ask spread + slippage** — for small positions, transaction cost can exceed tax benefit
- **Position is in a Roth / Trad IRA** — no tax benefit, period

Surface "do nothing" as a real option when these apply.

## Output format for a harvesting recommendation

```markdown
### Candidate: {SYMBOL}, {qty} shares, {-$X} unrealized

**Wash sale risk**
- Last buy: {date} ({"safe" if > 30 days ago else "wash if sold today"})
- Auto-reinvest: {on/off}
- Other accounts holding {SYMBOL}: {none / list}

**Tax benefit (estimated)**
- Loss to realize: ${X}
- Type: {short-term / long-term}
- Likely offset: {against gains / $3k ordinary income / carryforward}

**Replacement options**
1. {Different ETF, e.g. VOO → SPLG} — minimal tracking error
2. {Sector / theme proxy} — broader drift
3. Cash 31 days, re-buy original — simplest

**Do-nothing case**
{condition where harvesting is not worth it for this user}
```

Always end with: *Verify with your broker's actual cost basis records and a CPA before executing year-end trades.*
