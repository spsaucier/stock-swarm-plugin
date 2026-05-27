# Stock Swarm Plugin

Multi-agent trading research as portable [Agent Skills](https://agentskills.io/home) — analysts, bull/bear debate, trader, risk triangle, portfolio manager. **Research and education only; not financial advice.**

Loosely inspired by [TradingAgents](https://github.com/TauricResearch/TradingAgents) (desk metaphor, no Python dependency), [honeypot](https://github.com/orientpine/honeypot) (verification, macro), and [maia-skill](https://github.com/Hainrixz/maia-skill) (multi-sector scan).

## Philosophy

Each analysis should compound: cited numbers, calibrated confidence, explicit alternatives, and shared verification protocols under `plugins/stock-swarm/skills/trading-swarm/references/`.

## Install

Replace `YOUR_ORG` with your GitHub username or org after you publish the repo.

### Cursor

In Agent chat:

```
/add-plugin stock-swarm
```

Or install from the plugin marketplace when listed. For local development from this checkout:

```
/add-plugin .
```

### Claude Code

```
/plugin marketplace add YOUR_ORG/stock-swarm-plugin
/plugin install stock-swarm
```

### Codex

```
codex plugin marketplace add YOUR_ORG/stock-swarm-plugin
```

Then in Codex: `/plugins` → **stock-swarm-plugin** → install **stock-swarm**. Restart Codex.

### All other agents (50+)

Uses [vercel-labs/skills](https://github.com/vercel-labs/skills) — no custom converter to maintain:

```bash
npx skills add YOUR_ORG/stock-swarm-plugin --skill '*' -y
npx skills add YOUR_ORG/stock-swarm-plugin -a cursor -a claude-code -a codex -y
```

Update later:

```bash
npx skills update
```

### Manual copy

```bash
cp -R plugins/stock-swarm/skills/* .cursor/skills/
```

## Quick start

**Full swarm:**

> Run the trading-swarm skill on AAPL as of today, standard depth.

**Portfolio (export, no credentials):**

> Run portfolio-export-analyzer — standard depth.

**Portfolio (live, local MCP):**

> Run portfolio-analyzer — standard depth.

**Market scan:**

> Run market-opportunity-scan, moderate risk profile.

## Skills (24)

| Skill | When to use |
|-------|-------------|
| `trading-swarm` | Full pipeline orchestration |
| `portfolio-export-analyzer` | Whole portfolio from export |
| `portfolio-analyzer` | Live Robinhood via local MCP |
| `market-opportunity-scan` | Multi-sector discovery |
| `macro-swarm` | Deep macro pre-phase |
| `analyst-macro` | Quick regime read |
| `opportunity-cost` | Compare vs alternatives |
| `analysis-verifier` | Final QA |
| `equity-research-report` | Sell-side style memo |
| `us-tax-advisor` | US tax education (not advice) |
| `analyst-technical` | Technical analysis |
| `analyst-sentiment` | Sentiment |
| `analyst-news` | News & macro headlines |
| `analyst-fundamentals` | Fundamentals |
| `eodhd` | EODHD REST data |
| `researcher-bull` / `researcher-bear` | Debate |
| `research-manager` | Investment plan |
| `trader` | Default trade proposal |
| `trader-momentum` | Momentum / breakout |
| `risk-*` | Risk debate personas |
| `portfolio-manager` | Final rating |

See [plugins/stock-swarm/AGENTS.md](plugins/stock-swarm/AGENTS.md) for the full inventory.

## Optional credentials

Copy `.env.example` → `.env` (never commit):

| Variable | Skill |
|----------|-------|
| `EODHD_API_KEY` | `eodhd`, analysts |
| `ROBINHOOD_*` | `portfolio-analyzer` |

### MCP (Robinhood, read-only)

```bash
cp plugins/stock-swarm/mcp.example.json .cursor/mcp.json
```

Setup: [robinhood-mcp-setup.md](plugins/stock-swarm/skills/portfolio-analyzer/references/robinhood-mcp-setup.md).

## Repository layout

```
.claude-plugin/marketplace.json
plugins/stock-swarm/
  skills/           # canonical skill tree
  mcp.example.json
  AGENTS.md
skills -> plugins/stock-swarm/skills   # symlink for npx skills CLI
```

## Suggested flows

1. `market-opportunity-scan` → `trading-swarm` on top names → `portfolio-analyzer` vs your book  
2. `analyst-macro` → `trader-momentum` on a ticker  
3. `trading-swarm` → `analysis-verifier` → `equity-research-report`

## Disclaimer

For research and education only. Not financial, investment, trading, legal, or tax advice. Consult licensed professionals before acting. See `plugins/stock-swarm/skills/trading-swarm/references/disclaimer.md`.

## License

MIT — see [LICENSE](LICENSE).

## Attribution

- [TradingAgents](https://github.com/TauricResearch/TradingAgents) — multi-agent trading framework (Apache-2.0 upstream; this repo is an independent skills distribution)
- [honeypot](https://github.com/orientpine/honeypot) — verification and macro patterns (MIT, loosely adapted)
- [maia-skill](https://github.com/Hainrixz/maia-skill) — market scan patterns (MIT, loosely adapted)
- [compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — plugin packaging model (MIT)
