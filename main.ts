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

if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");
