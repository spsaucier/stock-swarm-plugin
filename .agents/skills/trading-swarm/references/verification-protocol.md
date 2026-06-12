# Data verification protocol

Adapted from honeypot `analyst-common-stock` / `stock-data-verifier`. **Skills are instructions, not APIs** — never call fictional functions like `search_stock()`.

## Non-negotiables

| Rule | Detail |
|------|--------|
| **Live search** | Fetch numbers via web search or fetch tools before citing |
| **Quote source text** | Every material number needs a verbatim `original_text` snippet |
| **Cross-check** | ≥2 independent sources; ±5% tolerance for equities (±1% for major indices) |
| **Fail closed** | If verification fails, mark `verified: false` — do not invent values |
| **Date stamp** | State as-of date on every price or ratio |

## Per-number record (use in tables or JSON blocks)

```json
{
  "metric": "P/E",
  "value": 28.4,
  "original_text": "NVDA trailing P/E 28.4x as of May 21, 2026",
  "source": "Yahoo Finance",
  "url": "https://finance.yahoo.com/quote/NVDA",
  "as_of": "2026-05-21"
}
```

`value` must appear in `original_text`. Missing `original_text` → treat as unverified.

## Cross-check procedure

1. Collect from source A (prefer Tier 1 — see [source-allowlist.md](source-allowlist.md))
2. Collect from source B
3. If \|A − B\| / average ≤ tolerance → `verified: true`
4. If 5–10% off → use newer primary source, note warning
5. If >10% off → `verified: false`, do not use in bull/bear arguments

## Sentiment exception

Do not treat Reddit/StockTwits/forum posts as numeric sources. Narrative only; never fabricate posts.

## Analyst checklist (before handing off)

- [ ] Searched (not recalled from training) for every cited figure
- [ ] Each figure has URL + date + quote snippet
- [ ] Material figures cross-checked (2+ sources)
- [ ] Unverified items labeled explicitly in the report
