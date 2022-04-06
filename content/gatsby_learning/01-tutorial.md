---
title: "Gatsbyのチュートリアルで学ぶ"
metaTitle: "Learning Gatsby 01"
metaDescription: ""
---

とりあえず，nodejsが必要なので，voltaを使ってnodejsをインストールします．
まず，voltaをインストールします．
```
scoop install volta
```

nodejsの16がLTSだったので，インストールします．
```
volta install node@16
```
どうやらLTSは次のコマンドでもインストールできたようです．(参考: [Node.jsのバージョン管理にVoltaを推したい](https://zenn.dev/taichifukumoto/articles/how-to-use-volta))
```
volta install node
```
バージョンを確認します．
```
node -v
v16.14.2

npm -v
8.5.0
```

スターターなしで作ります．

[Commits · hzuika/blog_gatsby](https://github.com/hzuika/blog_gatsby/commits/test)

src/pages/index.js を作成してページを作ります．

参考:
[Setting up a Gatsby Site Without the `gatsby new` Command | Gatsby](https://www.gatsbyjs.com/docs/using-gatsby-professionally/setting-up-gatsby-without-gatsby-new/)

src/pages/ に入れた .js ファイルのファイル名でURLにアクセスできるようです．

参考:
[Part 2: Use and Style React Components | Gatsby](https://www.gatsbyjs.com/docs/tutorial/part-2/#task-create-a-new-page-component-for-an-about-page)

Reactコンポーネントで `props` 引数を使用すると，タグの引数が使用できるようです．

`<Link>` コンポーネントを使用すると，相対パスを使用して別のページへのリンクを作成することができます．

参考:
[Part 2: Use and Style React Components | Gatsby](https://www.gatsbyjs.com/docs/tutorial/part-2/#use-the-link-component)
