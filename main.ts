import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The poem about stopping: one scene — the agent writes everything,
// the speaker takes the pen back for one small, crooked line.
// Scene (lines 1-2) -> handover (the agent's clean sentences) ->
// reclaim (one handwritten line, the ending).
const POEM: string = `My agent writes my lists, my letters, my apologies —
clean sentences, sent before I miss them.
Tonight I take the pen back.
One crooked line on the back of a receipt:
call mum. The ink bleeds a little.
It is the only sentence today that is mine.`;

// Contract guard: the entry must be a poem of 1-280 Unicode code points,
// not whitespace-only, and must end on its final word (no trailing newline).
// Fail loudly instead of writing an invalid entry.
const codePoints: number = [...POEM].length;
if (codePoints < 1 || codePoints > 280 || POEM.trim().length === 0) {
  throw new Error(`invalid entry: ${codePoints} code points (must be 1-280)`);
}
if (POEM !== POEM.trimEnd()) {
  throw new Error("invalid entry: poem must not end with whitespace");
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), POEM, "utf8");
