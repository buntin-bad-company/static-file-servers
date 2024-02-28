#!/usr/bin/env node

import express from 'express';
import serveIndex from 'serve-index';

const app = express();
const port = process.argv[2] ? parseInt(process.argv[2], 10) : 3000;

app.use(express.static(process.cwd()));
app.use(serveIndex(process.cwd(), { icons: true }));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
