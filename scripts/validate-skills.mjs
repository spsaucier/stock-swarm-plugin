#!/usr/bin/env node
/**
 * Validates SKILL.md frontmatter under plugins/stock-swarm/skills/.
 * Exit 0 if all pass; exit 1 with errors on stderr.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const SKILLS_ROOT = join(process.cwd(), "plugins/stock-swarm/skills");

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim();
  }
  return fm;
}

const dirs = await readdir(SKILLS_ROOT, { withFileTypes: true });
let failed = 0;

for (const ent of dirs) {
  if (!ent.isDirectory()) continue;
  const name = ent.name;
  const skillPath = join(SKILLS_ROOT, name, "SKILL.md");
  let content;
  try {
    content = await readFile(skillPath, "utf8");
  } catch {
    console.error(`FAIL ${name}: missing SKILL.md`);
    failed++;
    continue;
  }
  const fm = parseFrontmatter(content);
  if (!fm) {
    console.error(`FAIL ${name}: no YAML frontmatter`);
    failed++;
    continue;
  }
  if (!fm.name || !fm.description) {
    console.error(`FAIL ${name}: frontmatter needs name and description`);
    failed++;
    continue;
  }
  if (fm.name !== name) {
    console.error(`FAIL ${name}: frontmatter name "${fm.name}" != directory`);
    failed++;
    continue;
  }
  console.log(`OK   ${name}`);
}

if (failed > 0) {
  console.error(`\n${failed} skill(s) failed validation`);
  process.exit(1);
}
console.log(`\nAll ${dirs.filter((d) => d.isDirectory()).length} skills valid`);
