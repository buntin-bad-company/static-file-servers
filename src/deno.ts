#!/usr/bin/env deno run --allow-net --allow-read
import { serve } from 'https://deno.land/std/http/server.ts';
import { serveDir } from 'https://deno.land/std@0.217.0/http/file_server.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { port = 3000 } = parse(Deno.args);

serve(
  (req) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    return serveDir(req, {
      fsRoot: '.',
      urlRoot: '',
      showDirListing: true,
      enableCors: true,
    });
  },
  { port: +port }
);

console.log(`Server running at http://localhost:${port}/`);
