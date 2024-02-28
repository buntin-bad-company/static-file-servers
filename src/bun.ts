#!/usr/bin/env bun
import { serve } from 'bun';
import { parseArgs } from 'util';

const args = parseArgs({
  args: Bun.argv,
  options: {},
  strict: true,
  allowPositionals: true,
});
let PORT = -1;
const parsed = parseInt(args.positionals[3]);
if (isNaN(parsed)) {
  PORT = 3000;
} else {
  PORT = parsed;
}

const _ = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const file = Bun.file(path);
    return new Response(file);
  },
});

console.log(`Server running at http://localhost:${PORT}/`);
