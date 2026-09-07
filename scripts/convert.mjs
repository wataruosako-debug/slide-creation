#!/usr/bin/env node
// html2pptx.app の Export API を直接叩いて HTML → PPTX に変換する。
// CLI(html2pptx-cli) を入れずに使えるようにした最小実装。
//
//   HTML2PPTX_API_KEY=xxxx node scripts/convert.mjs slides/deck.html -o deck.pptx -s 16:9
//
// API キーは https://html2pptx.app のダッシュボードで発行する。
// 環境変数 HTML2PPTX_API_KEY か ~/.html2pptx/config.json の apiKey を読む。

import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, join, resolve } from "node:path";

const BASE_URL = process.env.HTML2PPTX_BASE_URL ?? "https://html2pptx.app";

function parseArgs(argv) {
  const args = { input: null, output: null, size: "16:9", css: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-o" || a === "--output") args.output = argv[++i];
    else if (a === "-s" || a === "--size") args.size = argv[++i];
    else if (a === "--css") args.css = argv[++i];
    else if (!a.startsWith("-")) args.input = a;
  }
  return args;
}

function parseSize(size) {
  if (size === "4:3") return { layout: "LAYOUT_4x3" };
  const m = /^(\d+)x(\d+)$/.exec(size);
  if (m) return { width: Number(m[1]), height: Number(m[2]) };
  return { layout: "LAYOUT_16x9" };
}

async function loadApiKey() {
  if (process.env.HTML2PPTX_API_KEY) return process.env.HTML2PPTX_API_KEY;
  try {
    const raw = await readFile(join(homedir(), ".html2pptx", "config.json"), "utf8");
    return JSON.parse(raw).apiKey ?? null;
  } catch {
    return null;
  }
}

async function serverMessage(res) {
  try {
    const data = JSON.parse(await res.text());
    return typeof data.message === "string" ? data.message : null;
  } catch {
    return null;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) {
    console.error("usage: node scripts/convert.mjs <input.html> [-o out.pptx] [-s 16:9|4:3|WxH] [--css file.css]");
    process.exit(1);
  }

  const apiKey = await loadApiKey();
  if (!apiKey) {
    console.error("API キーがありません。HTML2PPTX_API_KEY を設定するか `npx html2pptx-cli init` を実行してください。");
    process.exit(1);
  }

  const html = await readFile(resolve(args.input), "utf8");
  const css = args.css ? await readFile(resolve(args.css), "utf8") : null;
  const fileName = args.output ?? basename(args.input).replace(/\.html?$/i, "") + ".pptx";

  const body = {
    html,
    fileName,
    responseFormat: "url",
    ...parseSize(args.size),
    ...(css ? { css } : {}),
  };

  const res = await fetch(`${BASE_URL}/api/v1/export/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error((await serverMessage(res)) ?? `API error ${res.status}`);
  }
  const job = await res.json();
  console.log(`job ${job.id ?? ""} を送信しました。変換中…`);

  const statusUrl = job.statusUrl;
  let result = job;
  if (statusUrl) {
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await fetch(statusUrl, { headers: { Authorization: `Bearer ${apiKey}` } });
      if (!poll.ok) throw new Error((await serverMessage(poll)) ?? `Poll error ${poll.status}`);
      result = await poll.json();
      if (result.status === "completed") break;
      if (result.status === "failed") throw new Error(result.error ?? "Export failed");
    }
    if (result.status !== "completed") throw new Error("2分でタイムアウトしました");
  }

  const url = result.url ?? result.downloadUrl ?? result.result?.url;
  if (!url) throw new Error(`ダウンロードURLが取得できません: ${JSON.stringify(result)}`);

  const file = await fetch(url);
  if (!file.ok) throw new Error(`Download failed: ${file.status}`);
  await writeFile(fileName, Buffer.from(await file.arrayBuffer()));
  console.log(`✓ ${fileName}`);
}

main().catch((e) => {
  console.error(`✗ ${e.message}`);
  process.exit(1);
});
