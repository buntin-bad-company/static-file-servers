#!/usr/bin/env bun

import { $ } from 'bun';
import { parseArgs } from 'util';

const args = parseArgs({
  args: Bun.argv,
  options: {
    port: {
      type: 'string',
      short: 'p',
      description: 'The port to listen on',
    },
    version: {
      type: 'boolean',
      short: 'v',
      description: 'Print the version number',
    },
    help: {
      type: 'boolean',
      short: 'h',
      description: 'Print this help message',
    },
  },
  strict: true,
  allowPositionals: true,
});

if (args.values.version) {
  console.log('0.0.1');
  process.exit(0);
} else if (args.values.help) {
  console.log(`Usage: webs-npm-serve [-p,--port PORT(3000)] [dirPath(./)]
        webs-npm-serve [-h,--help | -v,--version]`);
  process.exit(0);
}

let PORT = -1;
const parsed = parseInt(args.values.port || '3000');
if (isNaN(parsed)) {
  PORT = 3000;
} else {
  PORT = parsed;
}

const filePath = args.positionals[0] || './';

await $`bunx serve -p ${PORT} ${filePath}`;
