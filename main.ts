// The 3AM Fridge Text — entry program.
// Writes one single-line text a smart fridge sends its owner at 3am
// (87 characters) to ENTRY_OUTPUT, or /output/entry.txt when unset.
// No trailing newline.
// Gate (RULES.txt): output must be UTF-8 text of 1 to 140 characters,
// not only white space, exactly one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I've held your secrets and your sauces since 2019. Tonight the mustard wants a divorce.";

// v2 (parent-session revision): gate tightened to also reject leading/trailing
// whitespace and control characters (charCodeAt loop), and length is counted in
// Unicode code points so the 1-140 check matches the sealed scorer's count.
const len = [...ENTRY].length;
if (len < 1 || len > 140) {
  throw new Error(`entry must be 1-140 characters, got ${len}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
for (let i = 0; i < ENTRY.length; i++) {
  const c = ENTRY.charCodeAt(i);
  if (c < 0x20 || c === 0x7f) {
    throw new Error(`entry contains control character U+${c.toString(16)}`);
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");
