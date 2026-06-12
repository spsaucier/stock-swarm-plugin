# Value chain method

Adapted from institutional supply-chain mapping practice ([agentii supply-chain-map](https://github.com/agentii-ai/agentii-investment-intelligence/tree/main/plugins/vertical-plugins/industry-analysis)) — generalized for web + filing research without a proprietary data plane.

## Tier template

Build **4–7 tiers** from inputs to end demand. Example (semiconductor / AI accelerator anchor):

| Tier | Examples (illustrative) |
|------|-------------------------|
| Design / IP | GPU architect, EDA, licensable IP |
| Manufacturing | Foundry, OSAT, advanced packaging |
| Memory & interconnect | HBM, DRAM, networking ASICs |
| Equipment | Lithography, deposition, inspection |
| Materials & substrates | Wafers, chemicals, substrates |
| Power / cooling / facilities | Grid, UPS, liquid cooling |
| End demand | Hyperscaler capex, enterprise AI, auto |

**Customize tiers** to the anchor — do not copy the table blindly.

## Vital vs important vs peripheral

Score each named node on two axes (1–3 each; document scores in the report):

| Axis | Question |
|------|----------|
| **Exposure** | How much of the anchor's COGS, revenue, or unit build depends on this node? |
| **Substitutability** | How hard to dual-source or redesign away in <24 months? |

| Label | Typical pattern |
|-------|-----------------|
| **Vital** | High exposure + low substitutability — outage or price spike hits the anchor fast |
| **Important** | Material but dual-sourceable or design-flexible |
| **Peripheral** | Commodity or many vendors |

A famous brand is not automatically **vital** — prove exposure.

## Filing & primary-source hooks (US public)

Search latest **10-K / 10-Q / 20-F** and recent **8-K** for:

| Topic | Where to look |
|-------|----------------|
| Customer concentration | Risk factors, MD&A — "% of revenue from top customers" |
| Supplier dependency | Risk factors — single/sole source, geographic concentration |
| Segment mix | Segment footnotes — what drives revenue |
| Capex & commitments | Cash flow, commitments table |
| Related parties | Related-party note |

**Earnings calls:** supplier/customer commentary, lead times, allocation — quote briefly with date.

Korea: DART filings (`dart.fss.or.kr`) for listed names — same concentration logic.

## Geographic & policy concentration

Flag when >40% of a critical input comes from one country/region **if cited**; otherwise mark as **unverified geography risk**.

Link export controls, tariffs, and industrial policy to specific tiers (not generic macro filler).

## Bottleneck identification

A **bottleneck** is a tier where:

- Industry utilization is high **and** lead times are extending (cite), or
- Capacity additions are slow (multi-year fabs, power interconnect), or
- Regulatory cap binds supply (export licenses)

Separate **industry-wide** bottlenecks from **anchor-specific** allocation fights.

## Output table (required for `value_chain` mode)

| Rank | Company | Ticker | Tier | Vital? | Exposure rationale | Evidence tier | Key risk |
|------|---------|--------|------|--------|-------------------|---------------|----------|
| 1 | ... | ... | ... | vital | ... | A/B/C | ... |

Sort by vital first, then exposure.
