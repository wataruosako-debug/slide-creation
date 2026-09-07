# slide-creation

[html2pptx.app](https://html2pptx.app) で、HTML/CSS から編集可能な PowerPoint (.pptx) を書き出すためのリポジトリ。

```
slides/         スライドのHTML（1ファイル = 1デッキ）
scripts/        変換スクリプト
```

## 変換の実行（ローカル環境で）

API キーが必要。https://html2pptx.app でアカウントを作って発行する。

**方法A: 公式CLI**

```bash
npx html2pptx-cli init                      # APIキーを ~/.html2pptx/config.json に保存
npx html2pptx-cli convert slides/sample.html -o sample.pptx -s 16:9
```

**方法B: 同梱スクリプト（CLIを入れない場合）**

```bash
export HTML2PPTX_API_KEY=xxxxx
node scripts/convert.mjs slides/sample.html -o sample.pptx -s 16:9
```

どちらも `POST /api/v1/export/jobs` にHTMLを送り、ジョブ完了後にPPTXをダウンロードする。

オプション: `-s 16:9 | 4:3 | 1920x1080`、`--css external.css`。

> **注意**: Claude Code のリモート実行環境からは `html2pptx.app` への通信が egress ポリシーでブロックされているため、変換はローカルPCで実行する必要がある。このリポジトリ側で作るのは HTML まで。

## HTMLの書き方（html2pptxの仕様）

- **1スライド = `class="slide"` の要素**。これがスライドの区切り。
- **各 `.slide` に明示的な幅・高さを指定する**。16:9 の既定は `1600px × 900px`（13.333in × 7.5in）。APIでは `layout` / `width` / `height` で縦向きやカスタムサイズも指定できる。
- **使えるCSS**: flexbox、grid、linear-gradient、radial-gradient、box-shadow、text-shadow、border-radius、transform（rotate / scale / translate / skew）、opacity。
- **フォント**: 変換環境と出力先のPowerPoint環境の両方にインストールされているフォントを使う。公開REST APIでは `@font-face` は除去され、外部フォントのダウンロードもブロックされる。日本語は `"Yu Gothic", "Hiragino Sans", Meiryo, sans-serif` のようなフォールバック付きで指定する。
- **画像**: base64 データURI か絶対URLのみ。**相対パスは失敗する**。
- **SVG**: インラインSVGはサポートされ、高品質PNGに変換されて埋め込まれる。
- JavaScriptで生成する動的コンテンツは対象外。書き出したいものは静的HTMLとして確定させる。

## デザインの取り決め

`slides/sample.html` の `:root` にトークン（配色・余白）を置き、全スライドで共通のマスター（左右96px / 上下72pxの余白、見出しゾーン、罫線位置）を守る。案件ごとにトークンを差し替えて使う。
