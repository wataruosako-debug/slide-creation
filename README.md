# slide-creation

[html2pptx.app](https://html2pptx.app) で、HTML/CSS から編集可能な PowerPoint (.pptx) を書き出すためのリポジトリ。

```
slides/
  ai-insight-sales-v1.html  AIインサイトセールス サービス紹介・敬体版（20枚）
  ai-insight-sales.html     AIインサイトセールス サービス紹介・常体版（20枚）
  sample.html               変換の動作確認用サンプル
scripts/
  convert.mjs             HTML -> PPTX（html2pptx.app のAPIを直接叩く）
  shot.mjs                各スライドをPNGに書き出して見た目を確認する
  preview-pdf.mjs         確認用PDFを作る
```

## 見た目の確認（ローカル、APIキー不要）

`scripts/shot.mjs` と `scripts/preview-pdf.mjs` はヘッドレスChromiumでHTMLを描画する。
はみ出し（900pxを超える中身）があれば shot.mjs が警告を出す。

```bash
npm install playwright-core
node scripts/shot.mjs slides/ai-insight-sales-v1.html shots
node scripts/preview-pdf.mjs slides/ai-insight-sales-v1.html preview.pdf
```

日本語フォントは描画環境のものが使われるため、PowerPoint上の最終的な字幅とは完全には一致しない。レイアウトの確認用と考える。

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

各ファイルの `:root` に配色トークンを置き、全スライドで同じマスターを守る。

### 敬体版 `ai-insight-sales-v1.html`

- **キャンバス** 1600 × 900px。余白は上40 / 左右80 / 下26px
- **上部の章ナビ** 6分割。現在地はオレンジの罫＋ネイビーの文字、他は #8794A6
- **見出しゾーン** 高さ132px固定。タイトルは40pxで**必ず1行**に収める（全角36文字まで）
- **本文ゾーン** 483px（「要点」バーのないページは554px）
- **要点バー** 各章の結論。ネイビーの縦罫＋薄い青の地
- **黄色マーカー** `linear-gradient(transparent 62%, #FFE87E 62%)` で下端だけを塗り、文字にかぶらせない
- **文字サイズ** 本文23px（PPTX換算 約14pt）が下限
- **配色** ネイビー #13315D は構造、オレンジ #C25309 は強調、ゴールド #F2C94C は濃紺地の上でのみ使う

### 常体版 `ai-insight-sales.html`

- **キャンバス** 1600 × 900px。余白は上44 / 右80 / 下34 / 左124px
- **見出しゾーン** 高さ164px固定。1行タイトルでも2行タイトルでも罫線の位置が動かない
- **本文ゾーン** 585px。フッターまでの縦を使い切り、下に死んだ余白を作らない
- **文字サイズ** 本文24px（PPTX換算 約14pt）を下限とする。表の中身も同じ
- **配色** ネイビー #13315D は構造（見出し・罫線）、オレンジ #C25309 は1スライドにつき「見てほしい1箇所」だけ
- **弱い情報** #54637A より薄いグレー文字は使わない
- **左端の縦レール** 6章のどこを読んでいるかを示すシグネチャ要素
