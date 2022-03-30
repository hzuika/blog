---
title: "ブログ設定"
metaTitle: "Blog settings"
metaDescription: ""
---

# 参考
* [https://github.com/hasura/gatsby-gitbook-starter](https://github.com/hasura/gatsby-gitbook-starter)
* [https://joolfe.github.io/gatsby-for-docs/](https://joolfe.github.io/gatsby-for-docs/01-introduction)

# ビルド手順
1. `rmdir docs`
1. `npm run build`
1. `mv public docs`

ワンライナー
```txt
rmdir docs; npm run build; mv public docs
```

publicフォルダが残ったままだとビルドに失敗します．

# 色

<div style="background-color:#30475E; color:white">ベースカラー</div>
<div style="background-color:#30475E; color:white">#30475E</div>
<div style="background-color:#30475E; color:white">rgb(48, 71, 94)</div>

<br/>

<div style="background-color:#F05454; color:white">アクセントカラー</div>
<div style="background-color:#F05454; color:white">#F05454</div>
<div style="background-color:#F05454; color:white">rgb(240, 84, 84)</div>

# ロゴ

ロゴはInkscapeでテキストを組み合わせて作成しました．
テキストのままだと，フォントが置き換わるため，パスに変換して出力しました．

# TODO

* [X] ~~相対リンクを修正する~~
    * pathPrefixが二重になる．(/blog/blog/)
    * localhostでは正常
    * サブドメイン (blog.hzuika.com) に変更すると直った．
* [X] ~~右側のサイドバーを表示させる．~~
    * localhostでは正常．
    * サブドメイン (blog.hzuika.com) に変更すると直った．