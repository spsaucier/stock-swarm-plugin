# Sector research guides

Loosely adapted from [maia-skill/references/agent-prompts.md](https://github.com/Hainrixz/maia-skill/blob/main/references/agent-prompts.md). Run **four sector passes in parallel** when your client supports it.

Shared rules: [verification-protocol.md](../../trading-swarm/references/verification-protocol.md), [source-agreement.md](../../trading-swarm/references/source-agreement.md).

---

## Crypto sector

**Anchors:** always include BTC, ETH.

**Discover 3–5 more** via search: trending altcoins, DeFi/AI narratives, weekly gainers (CoinGecko/CoinMarketCap trending).

Per asset: price, 24h/7d/30d, YTD, 52w range, market cap, volume, `sentiment`, `social_sentiment`, `social_buzz`, news, social highlights, buy/hold/sell, confidence, source_agreement.

**Sources:** CoinGecko, CoinDesk, Yahoo crypto, Reddit r/cryptocurrency (narrative only).

---

## Stocks sector

**Anchors:** SPX and NASDAQ (IXIC) as benchmarks.

**Discover 3–6 names** across sectors — not only mega-cap tech. Search: top movers, analyst picks, earnings catalysts, retail sentiment (do not fabricate WSB posts).

Per stock: same price fields as crypto schema; add sector/industry tag.

**Sources:** Yahoo Finance, MarketWatch, Reuters; cross-check per verification protocol.

**Deep dive:** For top 1–2 picks only, optional `trading-swarm` on that ticker.

---

## Forex / currencies sector

**Anchors:** DXY; add USD/MXN if user cares about LatAm (ask if unclear).

**Discover 3–5 pairs** affected by current CB decisions, volatility, or geopolitics.

`current_price` = exchange rate. Tighter agreement band (±0.1%).

**Sources:** Reuters, Trading Economics, central bank releases.

---

## Commodities / materials sector

**Anchors:** Gold (XAU), WTI crude.

**Discover 3–5 more** (industrial metals, ags if relevant — cocoa, wheat, lithium, etc. when in the news).

Per commodity: unit in reasoning (oz, barrel, lb).

**Sources:** Kitco, Reuters commodities, Trading Economics.

---

## Sector JSON schema

Each sector returns:

```json
{
  "sector": "crypto|stocks|currencies|materials",
  "timestamp": "ISO-8601",
  "assets": [],
  "sector_summary": "2-3 sentences",
  "sector_outlook": "bullish|bearish|neutral",
  "top_pick": "SYMBOL",
  "top_pick_reasoning": "..."
}
```

Asset object fields: see [assets/sector-asset-schema.md](../assets/sector-asset-schema.md).
