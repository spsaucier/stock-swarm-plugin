# Security

## Scope

**stock-swarm-plugin** ships static Agent Skills (markdown instructions). It does not execute trades, hold funds, or run a server.

## Credentials

- API keys (`EODHD_API_KEY`, broker credentials) belong in your local `.env` only — never commit them.
- Copy `plugins/stock-swarm/mcp.example.json` into your agent’s MCP config (path varies by tool — see README). Never commit MCP files that contain real API keys in URLs or env blocks.

## Reporting

If you find a security issue in this repository, open a private report via GitHub Security Advisories on the published repo, or contact the maintainer listed on the repository homepage.
