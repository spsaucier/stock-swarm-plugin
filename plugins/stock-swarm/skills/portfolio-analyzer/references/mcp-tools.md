# robinhood-mcp tools

Use via MCP server `robinhood` ([tool list](https://github.com/verygoodplugins/robinhood-mcp#available-tools)).

## Portfolio snapshot (call once)

| Tool | Purpose |
|------|---------|
| `robinhood_get_portfolio` | Equity, buying power, day change |
| `robinhood_get_positions` | All holdings, weights, P&L |
| `robinhood_get_dividends` | Dividend income |
| `robinhood_get_options_positions` | Options risk |
| `robinhood_get_order_history` | Recent fills (`limit` 20–50) |

## Per symbol

| Tool | Purpose |
|------|---------|
| `robinhood_get_position` | One ticker (prefer over full positions) |
| `robinhood_get_quote` | Last price, volume |
| `robinhood_get_fundamentals` | P/E, div yield, 52w |
| `robinhood_get_historicals` | `interval=day`, `span=year` |
| `robinhood_get_news` | Headlines |
| `robinhood_get_earnings` | Next earnings |
| `robinhood_get_ratings` | Analyst mix |

## Optional

| Tool | Purpose |
|------|---------|
| `robinhood_get_watchlist` | Non-held names |
| `robinhood_search_symbols` | Resolve tickers |

## Efficiency

- One `robinhood_get_positions` per run.
- Deep dive top N: `robinhood_get_position` + fundamentals + earnings per symbol.
