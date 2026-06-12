---
name: industry-thesis-research
description: >-
  Maps industries, value chains, and investment theses with cited evidence — suppliers,
  customers, concentration, regulation, strategic groups, and public beneficiaries/losers.
  Use for industry research, thematic investing, supply chain questions (e.g. vital
  suppliers of a company), TAM/sector structure, "who wins if X", or testing a thesis
  before single-name trading-swarm work. Research and education only; not a trade signal.
metadata:
  trading-agents-role: research
  inspired-by: agentii-industry-analysis, maia-skill-discovery, honeypot-verification
---

# Industry & thesis research

Answer **structural** questions (who sits where in a chain, who benefits from a theme, what could break the thesis) without forcing a Buy/Hold/Sell. Outputs a cited dossier and optional ticker shortlist for downstream skills.

Tone: [voice-and-tone.md](../trading-swarm/references/voice-and-tone.md). Evidence: [verification-protocol.md](../trading-swarm/references/verification-protocol.md) + [evidence-standards.md](references/evidence-standards.md).

## vs other skills

| Skill | Scope |
|-------|--------|
| `industry-thesis-research` | Multi-company industry / theme / value chain (this skill) |
| `trading-swarm` | Deep **one ticker** → trade debate |
| `market-opportunity-scan` | Cross-**asset-class** discovery (crypto, FX, commodities) |
| `macro-swarm` / `analyst-macro` | Macro regime backdrop, not supplier mapping |
| `analyst-fundamentals` | Single-name financials inside `trading-swarm` |

Typical stack: **this skill** → `trading-swarm` on 1–3 names, or `market-opportunity-scan` if the user wants a broader book idea hunt.

## Step 1 — Frame the question

Clarify if missing (defaults in parentheses):

| Input | Why |
|-------|-----|
| **Anchor** | Company ticker, industry name, or theme (required) |
| **Mode** | See [research-modes.md](references/research-modes.md) — auto-pick if obvious |
| **Geography** | US, global, Korea, etc. (infer from anchor) |
| **Depth** | `quick` (1 page) / `standard` / `deep` (standard) |
| **Output** | Names only vs public tickers to research next |

## Step 2 — Pick research mode

| Mode | User intent | Example |
|------|-------------|---------|
| `value_chain` | Map upstream/downstream around an anchor | "NVIDIA's most vital suppliers" |
| `industry_map` | Structure of a sector without one focal company | "US datacenter power ecosystem" |
| `thesis_test` | Stress-test a directional theme | "AI capex slows — who gets hurt?" |

Follow the mode playbook in [research-modes.md](references/research-modes.md). Value-chain detail: [value-chain-method.md](references/value-chain-method.md). Thesis drivers: [thesis-framework.md](references/thesis-framework.md).

## Step 3 — Research passes (run in order; parallelize when possible)

### 3a — Structure & economics

- Industry definition, value pools, pricing power, cycle stage
- TAM / growth: cite sources; label **estimate** vs **reported**
- Concentration: leaders, HHI-style read if data exists (qualitative OK with limits)

### 3b — Value chain & dependencies

Per [value-chain-method.md](references/value-chain-method.md):

- Tier map (inputs → assembly → distribution → end demand)
- **Customer concentration** and **supplier dependency** from filings when public
- Bottlenecks, single-source risk, geographic concentration
- Rank players **vital / important / peripheral** with explicit criteria — not vibes

### 3c — Competitive landscape

- Strategic groups (who competes on what axis)
- Moat sources: scale, IP, switching costs, regulation, distribution
- Substitutes and disruption vectors

### 3d — Policy, regulation & macro overlay

- Industrial policy, export controls, tariffs, subsidies relevant to the chain
- Optional: skim `analyst-macro` or `macro-swarm` **only** for regime context — do not duplicate full macro reports

### 3e — Public market map (if requested)

- List **public** tickers per tier with evidence tier (A/B/C per [evidence-standards.md](references/evidence-standards.md))
- Flag private or unverified names as **unlisted / unverified** — never invent tickers
- Use `eodhd` screener (`sector`, `industry`) and Alpha Vantage MCP for profiles — not for asserting undisclosed customer relationships

## Step 4 — Synthesize

Produce markdown from [assets/thesis-report-template.md](assets/thesis-report-template.md).

Required sections:

1. **Executive summary** — answer the user's question in 3–6 sentences
2. **Mode & scope** — anchor, geography, depth, as-of date
3. **Industry / chain map** — tiers or thesis drivers (mode-specific)
4. **Vital nodes table** — ranked with evidence tier + 1-line rationale each
5. **Beneficiaries & losers** — if `thesis_test` or user asked "who wins/loses"
6. **Risks to the map** — what would falsify the structure or thesis
7. **Coverage gaps** — unavailable data, private companies, unverified links
8. **Suggested next steps** — tickers for `trading-swarm`, or `analysis-verifier` if numbers cited

## Step 5 — Deliver

```text
analyses/{YYYY-MM-DD}-thesis-{slug}-{session_id}/
  thesis-report.md          # from template
  thesis-report.json        # optional: tiers, tickers, evidence_tiers
```

`slug` = short kebab from anchor (e.g. `nvda-suppliers`, `ai-capex-slowdown`). `session_id` = 6 alphanumeric chars if not provided.

Append [disclaimer.md](../trading-swarm/references/disclaimer.md).

## Step 6 — Follow-ups (offer, don't auto-run)

- `trading-swarm {TICKER}` on top 1–3 public names
- `analysis-verifier` on any material financial figures in the dossier
- `market-opportunity-scan` if user wants cross-asset ideas from the theme

## Anti-hallucination (non-negotiable)

| Rule | Detail |
|------|--------|
| **No invented links** | Supplier/customer ties need Tier A or B evidence — see [evidence-standards.md](references/evidence-standards.md) |
| **No fabricated posts** | X/Reddit are narrative only; use XMCP if connected |
| **Fail closed** | Unknown → say unknown; do not fill with training-memory "common knowledge" |
| **Not investment advice** | Map structure and evidence; downstream skills handle ratings |

## Error handling

| Failure | Action |
|---------|--------|
| Anchor too broad | Narrow to one chain or sub-theme; say what was excluded |
| No filing access | Rely on Tier B + mark gaps; do not assert concentration % |
| Conflicting sources | Present both; downgrade evidence tier |
| User wants a stock pick only | Run this skill for context, then hand off to `trading-swarm` |

## Freshness

New research each run — do not treat prior `analyses/...-thesis-...` folders as current fact.

## References

| Doc | Purpose |
|-----|---------|
| [research-modes.md](references/research-modes.md) | Mode selection & checklists |
| [value-chain-method.md](references/value-chain-method.md) | Tiers, vital ranking, filing hooks |
| [thesis-framework.md](references/thesis-framework.md) | Drivers, scenarios, beneficiaries |
| [evidence-standards.md](references/evidence-standards.md) | Relationship & number evidence tiers |
| [source-allowlist.md](../trading-swarm/references/source-allowlist.md) | Approved sources for numbers |
