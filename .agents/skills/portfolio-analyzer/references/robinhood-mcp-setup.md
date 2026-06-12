# Robinhood MCP setup (local, read-only)

Portfolio data via [robinhood-mcp](https://github.com/verygoodplugins/robinhood-mcp). Runs locally with `uvx` — credentials stay in your `.env`, not on Trayd or other remote services.

## Install

```bash
pip install robinhood-mcp
# or: uvx robinhood-mcp
```

## Credentials (local only)

Add to project `.env` (gitignored):

```bash
ROBINHOOD_USERNAME=your_email
ROBINHOOD_PASSWORD=your_password
# Optional — authenticator app (base32 secret):
# ROBINHOOD_TOTP_SECRET=
# Optional — seconds to wait for push approval if no TOTP:
# ROBINHOOD_APPROVAL_TIMEOUT=60
```

**Passkey-only accounts:** omit `ROBINHOOD_TOTP_SECRET`; first tool call may require approving a push in the Robinhood app (location may show Ashburn, VA — normal for cloud-ish endpoints in unofficial clients).

Never commit `.env`. Session cache: `~/.tokens/robinhood.pickle` (robin_stocks, local disk).

## MCP config (any agent)

Merge the `robinhood` entry from [mcp.example.json](../../../mcp.example.json) into **your agent’s MCP config**. Typical project paths:

| Agent | MCP config location |
|-------|---------------------|
| Cursor | `.cursor/mcp.json` |
| VS Code / Copilot | `.vscode/mcp.json` |
| Claude Code / Codex / others | See your tool’s MCP docs — merge the same JSON block |

Minimal `robinhood` server block:

```json
{
  "mcpServers": {
    "robinhood": {
      "command": "uvx",
      "args": ["robinhood-mcp"],
      "envFile": "${workspaceFolder}/.env"
    }
  }
}
```

Reload or restart your agent, then enable the `robinhood` MCP server in that tool’s MCP settings UI.

## Before running `portfolio-analyzer`

1. Confirm `robinhood` MCP is connected in your agent.
2. Call `robinhood_get_portfolio` once — if "Not logged in", fix `.env` or approve device login.
3. Prefer **export-only** workflow? Use `portfolio-export-analyzer` instead (no credentials).

## vs Trayd

| | robinhood-mcp (this) | Trayd |
|--|----------------------|--------|
| Where creds go | Your machine `.env` only | Trayd server + `link_robinhood` |
| Trades | Read-only | Can buy/sell/short |
| OAuth | N/A (direct Robinhood login) | Google + Robinhood link |
