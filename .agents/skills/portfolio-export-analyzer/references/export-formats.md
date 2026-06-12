# Common export formats

## Robinhood CSV

Typical columns: Symbol, Quantity, Average Cost, Current Price, Equity, etc. Use **Symbol** + **Quantity**; derive weight from **Equity** or quantity × price.

## Generic CSV

Minimum: `symbol`, `quantity` (headers may vary — map `ticker`, `shares`, `qty`).

Helpful: `cost_basis`, `market_value`, `sector`, `unrealized_pl_pct`.

## JSON

Expect array of objects, e.g. `{ "symbol": "AAPL", "quantity": 10, "market_value": 1900 }`.

## Pasted table

Markdown or plain text tables are fine. Parse row by row; confirm column meaning with user if unclear.

## Privacy

Do not ask for broker passwords. Exports may contain account IDs — redact in saved analysis if user prefers.
