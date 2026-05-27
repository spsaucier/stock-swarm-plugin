# X MCP (optional — live social & API)

Recommended when running **`analyst-sentiment`**, **`analyst-news`**, or **`trader-momentum`** and you want retrievable X posts instead of marking “social feed unavailable.” Official docs: [X MCP Servers](https://docs.x.com/tools/mcp).

## Two servers

| Server | URL | Use in swarm |
|--------|-----|----------------|
| **XMCP** | `http://127.0.0.1:8000/mcp` (local) | Search recent posts, look up accounts, read engagement — real social layer for sentiment |
| **Docs MCP** | `https://docs.x.com/mcp` (hosted) | Look up X API docs while building or debugging integrations |

You can connect both; see [Using both servers together](https://docs.x.com/tools/mcp#using-both-servers-together).

## Quick setup (XMCP)

Requires Python 3.9+, X Developer app credentials, and a running local server. Full steps: [XMCP on docs.x.com](https://docs.x.com/tools/mcp#xmcp--x-api-endpoints) and [github.com/xdevplatform/xmcp](https://github.com/xdevplatform/xmcp).

```bash
git clone https://github.com/xdevplatform/xmcp && cd xmcp
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp env.example .env   # OAuth keys + bearer token from console.x.com
python server.py      # listens on http://127.0.0.1:8000/mcp by default
```

Restrict tools for read-only research (example):

```bash
export X_API_TOOL_ALLOWLIST="searchPostsRecent,getUsersByUsername,getPostsById"
```

Credentials live in **XMCP’s** `.env`, not in this plugin repo.

## MCP config (any agent)

Merge into your agent’s MCP settings (see plugin README). Example block from [mcp.example.json](../../../mcp.example.json):

```json
{
  "mcpServers": {
    "xmcp": {
      "url": "http://127.0.0.1:8000/mcp"
    },
    "x-docs": {
      "url": "https://docs.x.com/mcp"
    }
  }
}
```

Start `python server.py` in the XMCP directory before each session. OAuth tokens are in-memory only — you may need to re-authenticate after a restart.

## How analysts should use it

- **`analyst-sentiment`:** Use XMCP for the **retail social** layer — cite real post IDs or URLs; never invent X content.
- **`analyst-news`:** Optional — breaking narrative or official account posts around a ticker.
- **`trader-momentum`:** Optional — confirm narrative/catalyst buzz aligns with technical breakout (not a substitute for price/volume).

If XMCP is not connected, state **“X social feed unavailable”** and rely on EODHD news/sentiment + allowlisted web sources per [data-gathering.md](../../trading-swarm/references/data-gathering.md).

## Security

- Do not commit XMCP `.env` or OAuth tokens.
- Use `X_API_TOOL_ALLOWLIST` to block `createPosts` / destructive tools if the agent should be read-only.
- XMCP is unofficial relative to your brokerage; it does not place trades.
