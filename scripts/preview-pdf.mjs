#!/usr/bin/env node
// スライドHTMLから確認用PDFを作る（ローカル検証用。PPTX出力は html2pptx.app 経由）。
//   node scripts/preview-pdf.mjs slides/deck.html out.pdf
import { chromium } from "playwright-core";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const CHROME = process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const [input, out = "preview.pdf"] = process.argv.slice(2);
const dir = await mkdtemp(join(tmpdir(), "slides-"));

const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
await page.goto("file://" + resolve(input));
const slides = await page.locator(".slide").all();
for (const [i, s] of slides.entries()) {
  await s.screenshot({ path: `${dir}/s${String(i + 1).padStart(2, "0")}.png` });
}
await browser.close();

// 960x540pt（16:9）のページに1枚ずつ貼る
execFileSync("python3", ["-c", `
import glob, pymupdf
doc = pymupdf.open()
for f in sorted(glob.glob("${dir}/*.png")):
    p = doc.new_page(width=960, height=540)
    p.insert_image(pymupdf.Rect(0, 0, 960, 540), filename=f)
doc.save("${resolve(out)}", deflate=True)
`], { stdio: "inherit" });
await rm(dir, { recursive: true, force: true });
console.log(`${slides.length} slides -> ${out}`);
