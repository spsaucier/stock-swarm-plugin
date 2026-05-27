# GitHub: spsaucier account setup

Commits from this repo should appear on **[spsaucier](https://github.com/spsaucier)**, not `saucier-consulting`.

## Git identity (already configured if you ran setup)

`~/.gitconfig` includes this repo via `includeIf` → `~/.gitconfig-spsaucier` (noreply email `596143+spsaucier@users.noreply.github.com`).

Verify in this directory:

```bash
git config user.email
# → 596143+spsaucier@users.noreply.github.com
```

## GitHub CLI (`gh`) — one-time per machine

Add the **spsaucier** account and make it active for pushes:

```bash
gh auth login -h github.com -u spsaucier
gh auth switch -h github.com -u spsaucier
gh auth setup-git
gh auth status
```

To use `saucier-consulting` again on other repos:

```bash
gh auth switch -h github.com -u saucier-consulting
```

## Remote

```bash
git remote set-url origin https://github.com/spsaucier/stock-swarm-plugin.git
git push -u origin main
```
