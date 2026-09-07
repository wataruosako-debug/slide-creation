# Gemini 画像生成プロンプト（全9枚・1バッチ）

生成した画像は **`slides/images/` に、下記のID名（例：`KV-01.png`）で保存**すると、資料に自動で入ります。

- 全9枚なので、10枚制限の1回で収まります
- プロンプトは英語です。画風の指定は英語のほうが安定します
- **画像の中に文字を入れさせない**指定を全プロンプトに入れています（日本語の文字は崩れるため）

## サイズについて（先に読んでください）

**比率はGeminiの画面にあるアスペクト比の選択で指定してください。** プロンプトの文中に「16:9」と書いても、無視されることがあります。1枚ずつ比率を切り替えて生成するのが確実です。

ピクセル数は、Gemini側で細かく指定できません（1024〜2048px程度で出力されます）。この資料で必要な最低サイズは下記です。**Geminiの標準出力なら、いずれも足ります。**

| ID | 比率 | 資料上の表示サイズ | 必要な最低ピクセル | 理由 |
|---|---|---|---|---|
| KV-01 | 16:9 | 600 × 338 px | **1200 × 675 px 以上** | 表紙。PDFにしたとき一番粗が目立つ |
| CH-01 / CH-02 | 16:9 | 620 × 349 px | **1240 × 698 px 以上** | 章扉 |
| P-01〜P-04 | 1:1 | 約 300〜360 px 角 | **720 × 720 px 以上** | 小さく使うので余裕あり |
| D-01 | 4:3 | 480 × 360 px | **960 × 720 px 以上** | 概念図 |
| D-02 | 4:3 | 約 500 × 375 px | **1000 × 750 px 以上** | 概念図 |

**足りているかの確認方法**：画像を右クリック →「情報を見る」で横幅を確認。表示サイズの**2倍以上**あればPDFにしても粗くなりません。

**比率がずれても壊れません。** 資料側は画像を切り取らず、枠に収める設定にしてあるので、多少ずれても構図が欠けることはありません（左右または上下に余白が出るだけです）。

**ファイル形式**：`.png` `.jpg` `.jpeg` `.webp` のどれでも読み込みます。拡張子は変換せず、そのまま `KV-01.jpg` のように保存して構いません。背景は白でも透過でもどちらでも問題ありません。

---

## そのまま貼る（9枚まとめて）

```
Create 9 separate illustrations in ONE consistent style.

=== STYLE (apply to all 9) ===
Flat vector illustration. Clean uniform-width outlines in deep navy (#123061), never black.
Flat solid fills only — no gradients, no realistic shading, no 3D, no glow, no texture.
Limited palette: deep navy #123061, light blue #D3E4F9, orange #E16D02, deep orange #D6540F,
yellow #FFD24A, plus white and light warm skin tones.
Pure white background (#FFFFFF), suitable for cutting out.
Subjects are JAPANESE business people in business attire. Natural, calm expressions —
friendly but not exaggerated, no big open-mouth smiles.
Generous empty space around the subject. Simple composition, few objects.
ABSOLUTELY NO text, letters, numbers, logos, or watermarks anywhere in the image.
No stock-photo look, no photorealism, no dark backgrounds, no lens flare.

=== IMAGES ===

1. [16:9 landscape] Two Japanese businessmen sitting across a small table in a bright meeting,
   one explaining while pointing at a simple document, the other listening and nodding.
   A laptop and a few papers on the table. Calm, cooperative atmosphere.

2. [16:9 landscape] A Japanese businessman alone at a desk looking at a wall calendar and a
   flat line chart that is not rising, one hand on his chin, thinking. Slightly troubled but
   not despairing. Empty space on the right side of the frame.

3. [16:9 landscape] Three Japanese business people standing together looking in the same
   direction at a large upward arrow and a simple bar chart. Confident, forward-looking.
   Empty space on the left side of the frame.

4. [1:1 square] A Japanese businessman in a suit standing alone, holding a resume document,
   looking at an empty chair beside him. Represents difficulty hiring and retaining sales staff.
   Simple, single subject, lots of white space.

5. [1:1 square] A Japanese businesswoman sitting at a desk waiting, hands folded, a silent
   telephone next to her. Represents depending on referrals and waiting for work to come in.
   Simple, single subject, lots of white space.

6. [1:1 square] A Japanese businessman wearing a telephone headset at a desk, papers scattered,
   looking slightly puzzled with a small question mark shape floating beside him.
   Represents calling the wrong prospects. Simple, single subject, lots of white space.

7. [1:1 square] A Japanese businesswoman in a suit standing and presenting with an open hand
   gesture toward the viewer, welcoming, as if guiding people into a seminar.
   Simple, single subject, lots of white space.

8. [4:3 landscape] A conceptual illustration: a large simple target with concentric rings,
   and one arrow landing in the center ring. Beside it, three small stylized company buildings
   of different shapes, with a magnifying glass hovering over one of them.
   No people. Represents choosing which companies to aim at.

9. [4:3 landscape] A conceptual illustration: a large stack of document cards funneling
   downward through three narrowing filter layers into a small neat stack of cards at the bottom.
   Simple funnel shape, clean geometry. No people.
   Represents narrowing a large database down to a call list.
```

---

## 保存するファイル名

| 生成順 | ファイル名 | 比率 | 使われるページ |
|---|---|---|---|
| 1 | `KV-01.png` | 16:9 | p.1 表紙 |
| 2 | `CH-01.png` | 16:9 | p.3 章扉①（課題） |
| 3 | `CH-02.png` | 16:9 | p.8 章扉②（サービス） |
| 4 | `P-01.png` | 1:1 | p.4 採用しても続かない |
| 5 | `P-02.png` | 1:1 | p.4 紹介と既存に依存 |
| 6 | `P-03.png` | 1:1 | p.4 当てる先を外している |
| 7 | `P-04.png` | 1:1 | p.13 共催セミナー |
| 8 | `D-01.png` | 4:3 | p.7 勝ち筋は相手側にある |
| 9 | `D-02.png` | 4:3 | p.11 リストの絞り込み |

`slides/images/` に置くだけで反映されます。置いていない間は、点線の枠とIDが表示されます。
拡張子は `.png` 以外でも構いません（`.jpg` `.jpeg` `.webp` も自動で読み込みます）。

---

## うまくいかないときの追記フレーズ

| 症状 | プロンプトに足す |
|---|---|
| 影やグラデーションが出る | `Strictly flat fills. No shadows, no gradients, no ambient occlusion.` |
| 線が黒くなる | `All outlines must be dark navy blue #123061, absolutely no pure black lines.` |
| 外国人になる | `All people must be East Asian / Japanese, with black hair.` |
| 文字が入る | `The image must contain zero text or letterforms of any kind.` |
| 背景に色がつく | `Background must be pure white #FFFFFF with nothing behind the subject.` |
| 情報が多すぎる | `Minimal composition. At most three objects in the frame.` |

---

## 1枚だけ作り直すとき

上の「STYLE」ブロックをそのまま貼り、その下に該当する番号のシーン文だけを貼ってください。
既に生成した他の画像を参照画像として添付すると、画風がさらに揃います。
