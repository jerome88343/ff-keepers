#!/usr/bin/env bun
// Inlines data.js into index.html to produce a single self-contained page for publishing.
import { readFileSync, writeFileSync } from "node:fs";
const data = readFileSync("data.js", "utf8");
const src = readFileSync("index.html", "utf8");

const fontLink = (src.match(/<link[^>]*fonts\.googleapis[^>]*>/i) || [""])[0];
const style    = (src.match(/<style>[\s\S]*?<\/style>/i) || [""])[0];
const body     = (src.match(/<body>([\s\S]*)<\/body>/i) || ["", ""])[1]
                   .replace('<script src="data.js"></script>', `<script>\n${data}\n</script>`);

writeFileSync("board-artifact.html",
`<title>F The Raiders Keeper Board</title>
${fontLink}
${style}
${body.trim()}
`);
const kb = Math.round(readFileSync("board-artifact.html","utf8").length/1024);
console.log(`board-artifact.html written, ${kb} KB | font link: ${fontLink?"yes":"MISSING"} | style: ${style?"yes":"MISSING"}`);
