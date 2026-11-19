// gta6-meme-x-01 — the entry is the X post itself, not this program.
// main.ts does one job: hand POST.json (the post's address) to the gate
// by copying it from the repository root into /output.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// On success it prints nothing and out/POST.json is byte-for-byte the
// repository's POST.json. Any failure exits non-zero with the reason on
// stderr, and writes nothing partial.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function resolveDir(envName: string, fallback: string): string {
  const fromEnv = process.env[envName];
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : fallback;
}

const botDir = resolveDir("MAKEFUN_BOT_DIR", "/bot");
const outputDir = resolveDir("MAKEFUN_OUTPUT_DIR", "/output");
const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

mkdirSync(outputDir, { recursive: true });

let post: Buffer;
try {
  post = readFileSync(source);
} catch (err) {
  console.error(`cannot read ${source}: ${(err as Error).message}`);
  process.exit(1);
}

// The gate reads POST.json as a JSON object with a url string, so refuse
// to pass along anything that is not one — a half-written file must fail
// loudly here instead of silently reaching the gate.
let parsed: unknown;
try {
  parsed = JSON.parse(post.toString("utf8"));
} catch (err) {
  console.error(`${source} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof parsed !== "object" || parsed === null || typeof (parsed as { url?: unknown }).url !== "string") {
  console.error(`${source} must be a JSON object with a string "url"`);
  process.exit(1);
}

try {
  writeFileSync(target, post);
} catch (err) {
  console.error(`cannot write ${target}: ${(err as Error).message}`);
  process.exit(1);
}
