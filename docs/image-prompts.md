# Gemini 画像生成プロンプト（9枚・1枚ずつ生成）

## ⚠️ 最初に読んでください

**必ず1枚ずつ生成してください。** 「9枚まとめて」と指示すると、Geminiは9コマを1枚のシートにまとめて出力します。その場合、1コマあたり300px程度しかなく、PDFにするとぼやけます。

- 下のプロンプトを**1つずつ**貼って、**1枚ずつ**生成する
- **比率はGeminiの画面にあるアスペクト比の選択で指定する**（プロンプト文中の指定は無視されることがあります）
- 2枚目以降は、**1枚目に生成した画像を参照画像として添付**すると画風が揃います

### 必要なサイズ

| ID | 比率 | 資料での表示 | 必要な最低サイズ |
|---|---|---|---|
| KV-01 | 16:9 | 600 × 338 | **1200 × 675 以上** |
| CH-01 / CH-02 | 16:9 | 620 × 349 | **1240 × 698 以上** |
| P-01〜P-04 | 1:1 | 約300〜360角 | **720 × 720 以上** |
| D-01 | 4:3 | 480 × 360 | **960 × 720 以上** |
| D-02 | 4:3 | 約500 × 375 | **1000 × 750 以上** |

生成後、画像を右クリック →「情報を見る」で横幅を確認してください。上記に届いていなければ、Geminiの出力解像度の設定を上げるか、生成し直してください。

### 前回の出力で直したい点

| 気になった点 | 対策（プロンプトに反映済み） |
|---|---|
| 人物のスーツが黄色・オレンジになった | スーツは濃紺かグレーに限定。オレンジは小物とアクセントのみ |
| 女性の髪が赤毛になった | 髪色を黒〜濃い茶に明示 |
| コマに黒い枠線が付いた | 1枚ずつ生成すれば出ません。念のため「枠線なし」を明記 |

画風・線の太さ・ベタ塗りは狙いどおりでした。**前回のシート画像を参照画像として添付**すれば、その画風のまま再生成できます。

---

## KV-01 ／ 16:9 ／ 表紙

```
Flat vector illustration, single image, no panels, no borders, no frame.
Uniform-width outlines in deep navy (#123061), never black. Flat solid fills only —
no gradients, no shading, no 3D, no glow, no texture.
Palette: deep navy #123061, light blue #D3E4F9, orange #E16D02, yellow #FFD24A, white.
Business suits must be NAVY or GREY only. Orange and yellow appear only in small
accents such as ties, chair seats, or objects — never as suit colors.
All people are Japanese with BLACK or dark brown hair. Calm, natural expressions.
Pure white background. Generous empty space. NO text, letters, numbers or logos anywhere.

Scene: Two Japanese businessmen sitting across a small table in a bright meeting room.
One is explaining while pointing at a simple document; the other listens and nods.
A laptop and a few papers on the table. Cooperative, calm atmosphere.
Wide horizontal composition with space around the subjects.
```

## CH-01 ／ 16:9 ／ 章扉①（課題）

```
（上と同じスタイル指定をそのまま貼る）

Scene: One Japanese businessman alone at a desk, looking at a wall calendar and a
flat line chart that is not rising. One hand on his chin, thinking.
Slightly troubled but not despairing. Leave the RIGHT THIRD of the frame empty.
```

## CH-02 ／ 16:9 ／ 章扉②（サービス）

```
（同じスタイル指定）

Scene: Three Japanese business people in NAVY and GREY suits standing together,
looking in the same direction at a large upward arrow and a simple bar chart.
Confident, forward-looking. Leave the LEFT THIRD of the frame empty.
```

## P-01 ／ 1:1 ／ 採用しても続かない

```
（同じスタイル指定）

Scene: One Japanese businessman in a navy suit standing alone, holding a resume
document, looking at an empty office chair beside him.
Single subject, centered, lots of white space around him.
```

## P-02 ／ 1:1 ／ 紹介と既存に依存

```
（同じスタイル指定）

Scene: One Japanese businesswoman with BLACK hair, in a navy suit, sitting at a desk
waiting with her hands folded. A silent telephone sits next to her.
Single subject, centered, lots of white space.
```

## P-03 ／ 1:1 ／ 当てる先を外している

```
（同じスタイル指定）

Scene: One Japanese businessman wearing a telephone headset at a desk, papers scattered
around him, looking slightly puzzled. A small orange question mark shape floats beside him.
Single subject, centered, lots of white space.
```

## P-04 ／ 1:1 ／ 共催セミナー

```
（同じスタイル指定）

Scene: One Japanese businesswoman with BLACK hair, in a navy suit, standing and
presenting with an open hand gesture toward the viewer, welcoming, as if guiding
people into a seminar. Single subject, centered, lots of white space.
```

## D-01 ／ 4:3 ／ 当てる先の概念図

```
（同じスタイル指定）

Scene: Conceptual illustration, NO PEOPLE. A large target with concentric rings in
light blue and navy, with one orange arrow landing in the center ring.
Beside it, three small stylized company buildings of different shapes,
with a magnifying glass hovering over one of them.
Clean geometry, generous white space.
```

## D-02 ／ 4:3 ／ リストの絞り込み

```
（同じスタイル指定）

Scene: Conceptual illustration, NO PEOPLE. A large loose stack of document cards at the
top, funneling downward through three narrowing filter layers (light blue, then orange,
then navy) into a small neat stack of cards at the bottom.
Simple funnel shape, clean geometry, generous white space.
```

---

## 資料への入れ方（フォルダ不要）

`ais-dl-deck.html` をブラウザで開き、**画像をウィンドウにドラッグ＆ドロップ**するだけです。
ファイル名からIDを読み取って、自動で正しい枠に入ります。上部の「🖼 画像を入れる」ボタンからも選べます。

**ファイル名は何でも構いません。** 入れ方は3通りあります。

| やり方 | 動き |
|---|---|
| **枠を直接クリック** | 「✎ 文字を編集」モードで画像の枠をクリック → ファイルを選ぶと、その枠だけ差し替わる |
| **まとめてドロップ** | 名前にIDがあるものは自動で入り、判別できなかったものは割り当て画面が出る |
| **ファイル名にIDを入れる** | `KV-01` などが名前に含まれていれば自動。前後に文字があっても可（`gemini_KV-01_v2.png`）|

割り当て画面では、画像のサムネイルを見ながら入れる場所を選べます。使わない画像は「入れない」を選んでください。
- 入れた画像はHTMLの中に埋め込まれるので、**「HTMLを書き出す」で画像込みの1ファイル**になります。そのまま送れます
- `slides/images/` フォルダに置く従来の方法も、そのまま使えます

## ファイル名

下記のIDをファイル名に含めてください。

| ファイル名 | 使われるページ |
|---|---|
| `KV-01` | p.1 表紙 |
| `CH-01` | p.3 章扉①（課題） |
| `CH-02` | p.8 章扉②（サービス） |
| `P-01` | p.4 採用しても続かない |
| `P-02` | p.4 紹介と既存に依存 |
| `P-03` | p.4 当てる先を外している |
| `P-04` | p.13 共催セミナー |
| `D-01` | p.7 勝ち筋は相手側にある |
| `D-02` | p.11 リストの絞り込み |

- 拡張子は `.png` `.jpg` `.jpeg` `.webp` のいずれでも読み込みます
- 背景は白でも透過でも構いません
- 比率が多少ずれても切り取られません（枠に収めて余白が出るだけです）

---

## うまくいかないときの追記フレーズ

| 症状 | プロンプトに足す |
|---|---|
| 複数コマの1枚になる | `Output exactly ONE single illustration. Do not create a grid, collage, or multi-panel sheet.` |
| 影やグラデーションが出る | `Strictly flat fills. No shadows, no gradients, no ambient occlusion.` |
| 線が黒くなる | `All outlines must be dark navy blue #123061, absolutely no pure black lines.` |
| スーツが派手な色になる | `Suits must be navy blue or grey only.` |
| 髪が明るい色になる | `All hair must be black or very dark brown.` |
| 外国人になる | `All people must be Japanese.` |
| 文字が入る | `The image must contain zero text or letterforms of any kind.` |
| 背景に色がつく | `Background must be pure white #FFFFFF with nothing behind the subject.` |
| 情報が多すぎる | `Minimal composition. At most three objects in the frame.` |
