#!/usr/bin/env node
// スライドHTMLの各 .slide をPNGに書き出して見た目を確認する（ローカル検証用）。
//   node scripts/shot.mjs slides/deck.html out_dir
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const CHROME = process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const [input, outDir = "shots"] = process.argv.slice(2);
if (!input) { console.error("usage: node scripts/shot.mjs <input.html> [outDir]"); process.exit(1); }

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox", "--font-render-hinting=none"] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
await page.goto("file://" + resolve(input));
const slides = await page.locator(".slide").all();
for (const [i, s] of slides.entries()) {
  const n = String(i + 1).padStart(2, "0");
  await s.screenshot({ path: `${outDir}/s${n}.png` });
  // はみ出し検出：スライド内で高さ900pxを超える中身がないか
  const over = await s.evaluate((el) => {
    const nodes = [el, ...el.querySelectorAll(".bd, .card, .hd")];
    return nodes
      .map((x) => ({ cls: x.className || x.tagName, d: x.scrollHeight - x.clientHeight }))
      .filter((x) => x.d > 6);
  });
  for (const o of over) console.log(`slide ${n}: ${String(o.cls).slice(0, 40)} が ${o.d}px はみ出している`);
}
console.log(`${slides.length} slides -> ${outDir}/`);
await browser.close();
