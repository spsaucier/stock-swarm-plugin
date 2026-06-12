# Evidence standards

Extends [verification-protocol.md](../../trading-swarm/references/verification-protocol.md) for **relationships** and **industry claims** (not just prices).

## Relationship evidence tiers

| Tier | Definition | Examples |
|------|------------|----------|
| **A — disclosed** | Company or counterparty disclosed in filing or official IR | 10-K customer concentration; supplier named in risk factors; OEM design win in 8-K |
| **B — reputable secondary** | Major financial press, industry analyst, issuer presentation cited | Reuters, FT, trade journal with named source |
| **C — inference / market narrative** | Plausible from industry structure but not tied to this anchor | "Likely supplier" without filing — **label C** |

**Rule:** Do not state "X is a vital supplier of Y" at Tier B or above without **A** for that specific link. Tier C → "market commonly associates" or omit.

## Numeric claims

Same as trading-swarm: live search, `original_text` snippet, ≥2 sources for material figures, [source-allowlist.md](../../trading-swarm/references/source-allowlist.md).

TAM and market size are often **Tier B** estimates — label **estimate**, cite publisher and year.

## Social & forum content

- X (XMCP), Reddit, StockTwits: **narrative and buzz only** — never sole proof of a supplier relationship
- Do not fabricate posts ([data-gathering.md](../../trading-swarm/references/data-gathering.md))

## Private companies

Name them when vital to the chain. Mark:

- `listed: no`
- `evidence_tier: B or C` only unless primary disclosure exists

## Coverage gaps section (required when any apply)

- Filing not accessible
- Relationship rumored only
- Geographic exposure unverified
- Non-US anchor with thin English filings

## Inspired by (external)

Patterns adapted from [agentii industry-analysis](https://github.com/agentii-ai/agentii-investment-intelligence/tree/main/plugins/vertical-plugins/industry-analysis) (supply-chain map, sector overview, competitive positioning) and stock-swarm verification — implemented as agent instructions + web/filing research, not agentii MCP.
