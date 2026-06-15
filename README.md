<div align="center">

# Stock Swarm

### Multi-agent trading research for Cursor, Claude Code, Codex, and 50+ agents

Portable [Agent Skills](https://agentskills.io/home) that mirror a trading desk — analysts, **catalyst calendar**, five famous-investor lenses, bull/bear debate, trader, risk triangle, portfolio manager.

<br>

[![GitHub stars](https://img.shields.io/github/stars/spsaucier/stock-swarm-plugin?style=flat-square&logo=github)](https://github.com/spsaucier/stock-swarm-plugin/stargazers)
[![Agent Skills](https://img.shields.io/badge/skills-32-blue?style=flat-square)](plugins/stock-swarm/AGENTS.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Research only](https://img.shields.io/badge/⚠️-education%20%2F%20research%20only-orange?style=flat-square)](#disclaimer)

<br>

<table>
<tr>
<td align="center" width="50%">

**Did Stock Swarm make you some money?**

[![Buy Me a Coffee](https://img.shields.io/badge/Buy_me_a_coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/saucier)

*Tips keep the skills free and updated*

<sub>Past performance ≠ future results. Not financial advice.</sub>

</td>
<td align="center" width="50%">

**⚡ Fastest path**

```text
npx skills add spsaucier/stock-swarm-plugin --skill '*' -y
```

Then ask your agent to run `trading-swarm` on a ticker.

</td>
</tr>
</table>

<br>

<sub>
Inspired by <a href="https://github.com/TauricResearch/TradingAgents">TradingAgents</a> ·
<a href="https://github.com/orientpine/honeypot">honeypot</a> ·
<a href="https://github.com/Hainrixz/maia-skill">maia-skill</a>
</sub>

</div>

---

## 60-second start (you or your AI)

1. **Install the plugin** (pick one):

   ```bash
   # Cursor — in Agent chat
   /add-plugin spsaucier/stock-swarm-plugin

   # Any agent (Cursor, Claude Code, Codex, OpenCode, …)
   npx skills add spsaucier/stock-swarm-plugin --skill '*' -y
   ```

2. **Add market data** (recommended — makes cited numbers much stronger):

   - **Option A — [Alpha Vantage MCP](https://github.com/alphavantage/alpha_vantage_mcp)** (official, free tier):
     1. Get a free key at [alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)
     2. `cp .env.example .env` and set `ALPHA_VANTAGE_API_KEY=...` (handy reference; most agents do not inject `.env` into MCP URLs)
     3. Merge the `mcpServers` block from [mcp.example.json](plugins/stock-swarm/mcp.example.json) into **your agent’s MCP config** ([paths by tool](#mcp-config-any-agent))
     4. Replace `YOUR_ALPHA_VANTAGE_API_KEY` in the `alphavantage` URL with your real key
   - **Option B — `eodhd` skill**: add `EODHD_API_KEY` to `.env` and ask your agent to use the `eodhd` skill for OHLCV, fundamentals, news, and macro series ([EODHD docs](https://eodhd.com/financial-apis/)).

   Use **both** if you want MCP tools in-chat plus the skill’s REST recipes and call-budget guidance.

   - **Option C — [Robinhood Agentic MCP](https://robinhood.com/us/en/support/articles/agentic-trading-overview/)** (optional — Robinhood customers with Agentic access): add `https://agent.robinhood.com/mcp/trading` to your MCP config, authenticate, and open an Agentic account. See [Robinhood Agentic](#robinhood-agentic-mcp-official--live-book--optional-trading).

3. **Paste this prompt** (replace the ticker):

   ```
   Run trading-swarm on AAPL as of today, standard depth.
   Use Alpha Vantage MCP and/or the eodhd skill for cited prices and fundamentals.
   Include catalyst-calendar and persona-swarm (default for stocks).
   Save output under analyses/ and run analysis-verifier before you finish.
   ```

That’s enough for a full desk-style memo. No broker account required.

---

## Pipeline (standard stock run)

```text
macro-swarm? → analysts → catalyst-calendar → persona-swarm → bull/bear debate
  → research-manager → trader → risk debate → portfolio-manager → analysis-verifier
```

| Phase | Skill(s) | Output |
|-------|----------|--------|
| 0 (optional) | `macro-swarm`, `analyst-macro` | Macro backdrop |
| 1 | `analyst-technical` → sentiment → news → fundamentals | Four analyst reports |
| 1.25 | **`catalyst-calendar`** | Dated timeline — earnings, OPEX, macro prints, milestones, conferences |
| 1.5 | **`persona-swarm`** | WSB · Buffett · O'Neil · Burry · Pelosi lenses + synthesis |
| 2–4 | debate → trader → risk → PM | Investment plan, proposal, final rating |

**`catalyst-calendar`** is a utility skill (not a persona): it builds the event map other skills consume.

**`persona-swarm`** runs five investing *personas* in parallel, then synthesizes agreement and tension before the bull/bear debate.

Skip calendar and/or personas on **`quick`** depth, crypto-only runs, or when the user opts out.

---

## Portfolio (any broker)

You do **not** need Robinhood or any specific provider.

| Situation | What to use | What you provide |
|-----------|-------------|------------------|
| **Any broker** — export or spreadsheet | `portfolio-export-analyzer` | CSV/JSON export or pasted holdings table (symbol + quantity or market value) |
| **Live book** — Robinhood Agentic account | `portfolio-analyzer` | [Robinhood Trading MCP](https://robinhood.com/us/en/support/articles/agentic-trading-overview/) — `https://agent.robinhood.com/mcp/trading` (OAuth; dedicated Agentic account) |
| **Live book** — read-only on main Robinhood account | `portfolio-analyzer` | Community [robinhood-mcp](https://github.com/verygoodplugins/robinhood-mcp) via `uvx` + `ROBINHOOD_*` in `.env` |
| **No export yet** | Ask your AI to help | “Here are my holdings: …” as a markdown table |

**Prompt — portfolio from export (Fidelity, Schwab, Vanguard, IBKR, etc.):**

```
Run portfolio-export-analyzer — standard depth.
I'm attaching my holdings export. Flag concentration, earnings in the next 14 days (or run catalyst-calendar per name),
and top 5 names by weight with one headline each. Cite sources with dates.
```

**Prompt — compare a new idea to your book:**

```
Run opportunity-cost on adding NVDA vs holding SPY and trimming my existing QQQ overlap.
Use my holdings from the attached export.
```

---

## Install (all platforms)

### Cursor

```
/add-plugin spsaucier/stock-swarm-plugin
```

Local development from a clone: `/add-plugin .`

### Claude Code

```
/plugin marketplace add spsaucier/stock-swarm-plugin
/plugin install stock-swarm
```

### Codex

```
codex plugin marketplace add spsaucier/stock-swarm-plugin
```

Then: `/plugins` → **stock-swarm-plugin** → install **stock-swarm** → restart Codex.

### 50+ other agents

[vercel-labs/skills](https://github.com/vercel-labs/skills):

```bash
npx skills add spsaucier/stock-swarm-plugin --skill '*' -y
npx skills update   # later
```

### Manual copy

Use [vercel-labs/skills](https://github.com/vercel-labs/skills) (recommended) or copy into your agent’s skills directory:

| Agent | Typical project skills path |
|-------|----------------------------|
| Cursor, Codex, Copilot, OpenCode, Gemini CLI, … | `.agents/skills/` |
| Claude Code | `.claude/skills/` |
| Cursor (legacy) | `.cursor/skills/` |

```bash
mkdir -p .agents/skills   # or .claude/skills — see table
cp -R plugins/stock-swarm/skills/* .agents/skills/   # copies symlinks; canonical tree is .agents/skills/
```

---

## MCP config (any agent)

Copy [plugins/stock-swarm/mcp.example.json](plugins/stock-swarm/mcp.example.json) into **your tool’s MCP settings** — merge the `mcpServers` object if you already have other servers. Do not commit the file after you add real keys.

| Agent | Where MCP config usually lives |
|-------|--------------------------------|
| **Cursor** | Project: `.cursor/mcp.json` · User: `~/.cursor/mcp.json` |
| **Claude Code** | Project or user MCP config — see [Claude Code MCP](https://code.claude.com/docs/en/mcp) |
| **Codex** | Codex MCP / plugin settings — see [Codex docs](https://developers.openai.com/codex/mcp/) |
| **VS Code / Copilot** | `.vscode/mcp.json` in the project |
| **Claude Desktop** | `claude_desktop_config.json` — see [Alpha Vantage MCP README](https://github.com/alphavantage/alpha_vantage_mcp) |

```bash
cp .env.example .env
# Optional: record keys in .env (EODHD, Robinhood, Alpha Vantage reference)
# Merge mcp.example.json into YOUR agent's MCP file (see table above)
# Replace YOUR_ALPHA_VANTAGE_API_KEY in the alphavantage URL
```

**Robinhood Agentic (optional):** [Robinhood Agentic Trading](https://robinhood.com/agentic) connects your agent to a dedicated Robinhood account via the official **Trading MCP** — see [Agentic Trading overview](https://robinhood.com/us/en/support/articles/agentic-trading-overview/). Add to your MCP config:

```json
"robinhood": {
  "url": "https://agent.robinhood.com/mcp/trading"
}
```

Authenticate in your agent’s MCP settings, then complete Robinhood’s Agentic account onboarding (desktop). Your agent gets read access to accounts, positions, and orders; **trades can only be placed in the Agentic account** (equities). Pair with `portfolio-analyzer` for live book research. You remain responsible for agent-placed trades — see Robinhood’s risk disclosures.

**Robinhood read-only (optional alternative):** community [robinhood-mcp](https://github.com/verygoodplugins/robinhood-mcp) for a local, read-only view of your main account — see [robinhood-mcp-setup.md](plugins/stock-swarm/skills/portfolio-analyzer/references/robinhood-mcp-setup.md).

**X / Twitter (optional):** for **`analyst-sentiment`**, **`analyst-news`**, and **`trader-momentum`** — connect [X MCP](https://docs.x.com/tools/mcp) so agents can search real posts instead of skipping the social layer. Merge `xmcp` + `x-docs` from [mcp.example.json](plugins/stock-swarm/mcp.example.json); setup: [x-mcp-setup.md](plugins/stock-swarm/skills/analyst-sentiment/references/x-mcp-setup.md).

---

## Market data setup (recommended)

### Alpha Vantage MCP (official)

- **Repo:** [github.com/alphavantage/alpha_vantage_mcp](https://github.com/alphavantage/alpha_vantage_mcp)
- **Hosted endpoint:** `https://mcp.alphavantage.co/mcp?apikey=YOUR_KEY`
- **Free API key:** [alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)

Your agent can then pull quotes, fundamentals, news, and technicals through MCP while following `trading-swarm` verification rules.

The hosted Alpha Vantage URL puts your key in the query string (their documented pattern). Keep MCP config files **out of git** — common project paths are gitignored (see [.gitignore](.gitignore)). Prefer the local `uvx` server from the [Alpha Vantage MCP README](https://github.com/alphavantage/alpha_vantage_mcp) if you do not want the key in a URL.

### EODHD skill (REST, no MCP required)

- **Skill:** `eodhd` (included in this plugin)
- **Key:** [eodhd.com](https://eodhd.com/) → `EODHD_API_KEY` in `.env`
- **Why:** Strong for batch EOD history, fundamentals v1.1, news/sentiment, macro bonds — with explicit call-cost notes in the skill.

Ask explicitly: *“Use the eodhd skill for all cited prices on this run.”*

### Robinhood Agentic MCP (official — live book & optional trading)

- **Product:** [robinhood.com/agentic](https://robinhood.com/agentic)
- **Setup guide:** [Agentic Trading overview](https://robinhood.com/us/en/support/articles/agentic-trading-overview/)
- **Trading MCP endpoint:** `https://agent.robinhood.com/mcp/trading` (Streamable HTTP — no API key in config; OAuth when you connect)
- **Tools:** `get_accounts`, `get_portfolio`, `get_equity_positions`, `get_equity_quotes`, `get_equity_orders`, `review_equity_order`, `place_equity_order`, `cancel_equity_order`, and more — see [Trading with your agent](https://robinhood.com/us/en/support/articles/trading-with-your-agent/)

Robinhood’s [Model Context Protocol](https://robinhood.com/us/en/support/articles/agentic-trading-overview/) server lets MCP-capable agents (Cursor, Claude Code, Codex, ChatGPT, etc.) read your Robinhood data and act in a **separate Agentic brokerage account** you fund for the agent. Rolling out gradually — Robinhood emails when you have access.

Best paired with **`portfolio-analyzer`** for whole-book snapshots. For research-only runs, ask your agent **not** to place orders. For execution, use explicit prompts and understand that agents can trade without per-order confirmation if you allow it.

**vs community `robinhood-mcp`:** the official MCP is hosted by Robinhood, OAuth-based, and scoped to an Agentic account (can place equity orders there). [robinhood-mcp](https://github.com/verygoodplugins/robinhood-mcp) runs locally via `uvx`, uses username/password in `.env`, and is **read-only** on your existing account.

### X MCP (optional — sentiment & momentum)

- **Docs:** [docs.x.com/tools/mcp](https://docs.x.com/tools/mcp)
- **XMCP** (local): [xdevplatform/xmcp](https://github.com/xdevplatform/xmcp) → `http://127.0.0.1:8000/mcp` — search posts, users, engagement for the sentiment pipeline
- **Docs MCP** (hosted): `https://docs.x.com/mcp` — search X API documentation from your agent

Best paired with **`analyst-sentiment`** and **`trader-momentum`**. Credentials stay in the XMCP install (X Developer Console); see [x-mcp-setup.md](plugins/stock-swarm/skills/analyst-sentiment/references/x-mcp-setup.md). Use `X_API_TOOL_ALLOWLIST` for read-only research if you do not want the agent posting on X.

### Together

| Layer | Best for |
|-------|----------|
| Alpha Vantage MCP | Interactive tool calls in any MCP-capable agent |
| `eodhd` skill | Scripted pulls, caching, screener, earnings/calendar endpoints, international tickers |
| Robinhood Agentic MCP | Live Robinhood book via `portfolio-analyzer`; optional equity orders in Agentic account |
| X MCP (XMCP + optional x-docs) | Live social/narrative for sentiment and momentum catalyst checks |

---

## Example prompts (copy-paste)

**Single stock — full pipeline**

```
Run trading-swarm on MSFT as of today, standard depth.
Use Alpha Vantage MCP and eodhd for numbers. Run analysis-verifier last.
```

**Catalyst timing only (no full swarm)**

```
Run catalyst-calendar on NVDA as of today.
Use eodhd calendar endpoints and analyst-style news search for product milestones and conferences.
Forward window 90 days.
```

**One famous-investor lens**

```
Run persona-buffett on KO using the four analyst reports from a prior run
(or run analysts first, then persona-buffett only).
```

**Momentum swing**

```
Run analyst-macro for a quick regime read, then trader-momentum on NVDA — breakout setup, moderate risk.
Use XMCP if connected for narrative/catalyst context on X; eodhd + Alpha Vantage for numbers.
```

**Industry / supply chain**

```
Run industry-thesis-research: Who are NVIDIA's most vital public suppliers?
Value chain mode, standard depth. Cite filings where possible.
Then trading-swarm on the top 2 names from the vital nodes table.
```

**Market scan → drill down**

```
Run market-opportunity-scan, moderate risk profile.
Then trading-swarm on the top 2 US equity ideas from the report.
```

**Institutional-style memo**

```
After trading-swarm on AAPL completes, reformat with equity-research-report.
```

---

## Skills (32)

| Skill | When to use |
|-------|-------------|
| `trading-swarm` | Full pipeline orchestration |
| **`catalyst-calendar`** | **Dated event timeline** — earnings, OPEX, macro, milestones (utility; Phase 1.25) |
| **`persona-swarm`** | **Five investor lenses** + synthesis (Phase 1.5) |
| `persona-wsb` | High-beta / catalyst convexity lens |
| `persona-buffett` | Buffett / Munger quality value lens |
| `persona-oneil` | O'Neil CAN SLIM growth-technical lens |
| `persona-burry` | Burry contrarian deep-value lens |
| `persona-pelosi` | Policy flow & public STOCK Act disclosures (legal only) |
| `industry-thesis-research` | Value chain, sector map, thematic thesis |
| `portfolio-export-analyzer` | **Any broker** — export or pasted holdings |
| `portfolio-analyzer` | Live book via **your** read-only broker MCP |
| `market-opportunity-scan` | Multi-sector discovery |
| `macro-swarm` | Deep macro pre-phase |
| `analyst-macro` | Quick regime read |
| `opportunity-cost` | Compare vs cash, index, existing book |
| `analysis-verifier` | Final QA on numbers and tone |
| `equity-research-report` | Sell-side style memo |
| `us-tax-advisor` | US tax education (not advice) |
| `analyst-technical` | Technical analysis |
| `analyst-sentiment` | Sentiment |
| `analyst-news` | News & macro headlines |
| `analyst-fundamentals` | Fundamentals |
| `eodhd` | EODHD REST data backbone |
| `researcher-bull` / `researcher-bear` | Debate |
| `research-manager` | Investment plan |
| `trader` | Default trade proposal |
| `trader-momentum` | Momentum / breakout |
| `risk-*` | Risk debate personas |
| `portfolio-manager` | Final rating |

Full inventory: [plugins/stock-swarm/AGENTS.md](plugins/stock-swarm/AGENTS.md)

---

## Credentials (`.env`, never committed)

```bash
cp .env.example .env
```

| Variable | Used for |
|----------|----------|
| `ALPHA_VANTAGE_API_KEY` | [Alpha Vantage MCP](https://github.com/alphavantage/alpha_vantage_mcp) |
| `EODHD_API_KEY` | `eodhd` skill |
| `ROBINHOOD_*` | Optional — community [robinhood-mcp](https://github.com/verygoodplugins/robinhood-mcp) only (not needed for [Robinhood Agentic MCP](https://robinhood.com/us/en/support/articles/agentic-trading-overview/)) |

---

## Repository layout

```
.agents/skills/          # canonical skill source (32 skills)
plugins/stock-swarm/
  skills/                # symlinks → .agents/skills/*
  mcp.example.json       # Alpha Vantage + optional Robinhood (community read-only)
  AGENTS.md
skills -> plugins/stock-swarm/skills   # symlink for npx skills CLI (macOS/Linux)
analyses/                # optional session output from trading-swarm runs
```

On **Windows**, if the symlink fails, run `npx skills add spsaucier/stock-swarm-plugin` from the repo root or point it at `plugins/stock-swarm/skills/`.

---

## Philosophy

Each analysis should compound: cited numbers, calibrated confidence, explicit alternatives, and shared verification under `trading-swarm/references/` (via `.agents/skills/trading-swarm/references/` or the plugin symlink).

---

## Disclaimer

For research and education only. Not financial, investment, trading, legal, or tax advice. Consult licensed professionals before acting. See [disclaimer.md](plugins/stock-swarm/skills/trading-swarm/references/disclaimer.md).

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

**Did Stock Swarm make you some money?**

[![Buy Me a Coffee](https://img.shields.io/badge/☕_Buy_me_a_coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/saucier)

<sub>Not financial advice — but if the research helped your P&amp;L, a coffee is appreciated.</sub>

</div>

---

## Attribution

- [TradingAgents](https://github.com/TauricResearch/TradingAgents) — multi-agent framework (independent skills distribution)
- [Alpha Vantage MCP](https://github.com/alphavantage/alpha_vantage_mcp) — recommended market data integration
- [Robinhood Agentic Trading MCP](https://robinhood.com/us/en/support/articles/agentic-trading-overview/) — optional live book / Agentic account integration
- [honeypot](https://github.com/orientpine/honeypot) — verification and macro patterns (MIT, loosely adapted)
- [maia-skill](https://github.com/Hainrixz/maia-skill) — market scan patterns (MIT, loosely adapted)
- [compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — plugin packaging model (MIT)
