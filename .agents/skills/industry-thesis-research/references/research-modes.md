# Research modes

Pick **one** primary mode per run. Blend only when the user explicitly asks (e.g. value chain **and** thesis test).

## `value_chain` — anchor company or product

**When:** User names a company/product and asks about suppliers, customers, ecosystem, or "who does X depend on."

**Workflow:**

1. Identify anchor's business model (what they sell, who pays them).
2. Decompose into 4–7 **tiers** (see [value-chain-method.md](value-chain-method.md)).
3. For each tier, list 3–8 players (public tickers where possible).
4. Rank **vital** nodes for the anchor specifically — substitutability + revenue exposure.
5. Note private chokepoints (e.g. TSMC-class foundry) even without a ticker.

**Deliverable emphasis:** tier diagram (markdown table), vital nodes table, single-source risks.

## `industry_map` — sector or niche

**When:** User asks about an industry, niche, or technology layer without a single focal company.

**Workflow:**

1. Define industry boundaries (what's in / out).
2. Map value pools and typical margin structure (qualitative + cited stats).
3. List concentration: top 3–5 incumbents, insurgents, substitutes.
4. Regulatory and policy overlay.
5. Optional: growth drivers and cyclicality.

**Deliverable emphasis:** industry structure, strategic groups, TAM/growth with sources labeled.

## `thesis_test` — thematic investment question

**When:** User states a theme or scenario — "AI power demand", "rate cuts help REITs", "China export restrictions on GPUs."

**Workflow:** Follow [thesis-framework.md](thesis-framework.md).

1. Restate thesis in one falsifiable sentence.
2. List **drivers** (2–5) that must hold.
3. **Beneficiaries** — public tickers with mechanism (why revenue/ margin moves).
4. **Losers / shorts / headwinds** — same rigor.
5. **Leading indicators** — what to watch to confirm or refute (data series, filings, policy dates).
6. **Invalidation** — what observation would kill the thesis.

**Deliverable emphasis:** driver tree, beneficiary/loser tables, watchlist — not a portfolio allocation unless user asks.

## Mode selection cheatsheet

| User phrasing | Mode |
|---------------|------|
| "suppliers of", "supply chain", "who makes components for" | `value_chain` |
| "industry overview", "landscape", "sector structure" | `industry_map` |
| "thesis", "who benefits if", "play on", "theme", "tail risk" | `thesis_test` |
| "NVIDIA suppliers" | `value_chain` (anchor NVDA) |

## Depth presets

| Depth | Passes | Typical length |
|-------|--------|----------------|
| `quick` | 3a + 3b abbreviated | 1–2 pages |
| `standard` | 3a–3e | 3–6 pages |
| `deep` | 3a–3e + extra peer compare + historical cycle | 6–10 pages |
