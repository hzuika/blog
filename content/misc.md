---
title: "その他のメモ"
metaTitle: "Misc"
metaDescription: ""
---

# GitHub のコミットの URL
GitHubに`push -f`したことで，過去のコミットが現在のブランチからなくなっても，URLは残っていて，確認はできるようです．
これなら，わざわざDiffを作ってGistに保存していく必要がないですね．
(例: [IME: insert result string · hzuika/blender@f904fd8](https://github.com/hzuika/blender/commit/f904fd8d5ec1661ce9a9b66af346d45575a511ee))

# Gatsby
ヘッダーの文字列に取り消し線を使用するとビルドに失敗する
```md
## ~~ビルド失敗~~
## ビルド成功
```