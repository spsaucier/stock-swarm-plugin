# Contributing

## Skill changes

1. Edit skills under `plugins/stock-swarm/skills/<skill-name>/SKILL.md`.
2. Keep YAML frontmatter with `name` (matches directory) and `description`.
3. Run validation: `node scripts/validate-skills.mjs`
4. Follow voice and verification references in `trading-swarm/references/`.

## Pull requests

- One skill or concern per PR when possible.
- No API keys, broker credentials, or live `mcp.json` in commits.
- Update `plugins/stock-swarm/CHANGELOG.md` for user-visible skill changes.

## Publishing

Maintainer repo: https://github.com/spsaucier/stock-swarm-plugin
