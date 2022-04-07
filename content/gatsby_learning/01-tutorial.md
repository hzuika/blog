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

nodejsのLTSバージョンは16だったので，インストールします．
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

[Commits · hzuika/blog_gatsby](https://github.com/hzuika/blog_gatsby/commits/tutorial)

```
npm init -y
npm install gatsby react react-dom
```

チュートリアルに従って進めます．
src/pages/ 内の JSX ファイルが表示されるようです．

参考:
* [Setting up a Gatsby Site Without the `gatsby new` Command | Gatsby](https://www.gatsbyjs.com/docs/using-gatsby-professionally/setting-up-gatsby-without-gatsby-new/)
* [Part 2: Use and Style React Components | Gatsby](https://www.gatsbyjs.com/docs/tutorial/part-2/)

Reactコンポーネントで `props` 引数を使用すると，`<タグ 引数名=値>`の引数が使用できるようです．

`<Link>` コンポーネントを使用すると，相対パスを使用して別のページへのリンクを作成することができます．

Reactコンポーネントで `{ children }` 引数 (`props.children`) を使用すると，タグで囲まれた要素が使用できます．

.module.css の拡張子を持つファイルを作成して，`.名前 {}`のCSSクラスを定義します．
JSXファイルにインポートして，Reactコンポーネント内でタグの `className={名前}` に対応するCSSクラスを代入すると適用されます．
`.nav-links`のようにハイフンを持ったCSSクラスの場合はJSXファイル内で使用する場合は`navLinks`のように，ハイフンを削除して，その次の文字を大文字に変更します．

---

様々なプラグインを `npm install プラグイン名` でインストールできます．
```
npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem
```

インストールしたプラグインを使用するために，gatsby-config.js の `module.exports` にプラグインを加えます．
```js
module.exports = {
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
    ]
} 
```

JSXファイルで `gatsby-plugin-image` から `<StaticImage>` コンポーネントをインポートして画像を表示します．

ちなみに `gatsby-plugin-sharp` がないと怒られます．
`gatsby-plugin-sharp`は画像処理用ライブラリらしいです．
```
Gatsby-plugin-sharp wasn't setup        
correctly in gatsby-config.js. Make sure
 you add it to the plugins array.
```

参考: 
[Part 3: Add Features with Plugins | Gatsby](https://www.gatsbyjs.com/docs/tutorial/part-3/)

---

MDX ファイルを使用するためにプラグインをインストールしようとしてエラーが起きました．

```
npm install gatsby-plugin-mdx @mdx-js/mdx@v1 @mdx-js/react@v1

npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: blog_gatsby@1.0.0
npm ERR! Found: react@18.0.0
npm ERR! node_modules/react
npm ERR!   react@"^18.0.0" from the root project
npm ERR!   peer react@"^16.9.0 || ^17.0.0 || ^18.0.0" from gatsby-plugin-mdx@3.11.1
npm ERR!   node_modules/gatsby-plugin-mdx
npm ERR!     gatsby-plugin-mdx@"*" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.13.1 || ^17.0.0" from @mdx-js/react@1.6.22
npm ERR! node_modules/@mdx-js/react
npm ERR!   @mdx-js/react@"v1" from the root project
npm ERR!   peer @mdx-js/react@"^1.0.0" from gatsby-plugin-mdx@3.11.1
npm ERR!   node_modules/gatsby-plugin-mdx
npm ERR!     gatsby-plugin-mdx@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\hashi\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\hashi\AppData\Local\npm-cache\_logs\2022-04-07T12_08_20_005Z-debug-0.log
```

react と react-dom を 18から17へ変更して解決しました．
```
npm uninstall react react-dom
npm install react@17 react-dom@17
```

---

`useStaticQuery` を使用すると GraphQL のクエリを使用して様々なデータを取得できます．

定義した`export const query = graphqlクエリ`が同一ファイル内で定義したReactコンポーネントの引数`{data}`に渡されるようです(?)

VSCodeで Prettier を使うとjsファイルやcssファイルのフォーマットができます．
Format on Saveにしておくと，保存時に自動で整形されます．

`{mdx.slug}.js` を使用すると，mdxファイルのファイル名をslugとしたページが生成されます．

mdxファイルのfrontmatterでパスを記述した同じディレクトリにある各画像ファイルを表示するためには，動的画像`<GatsbyImage>`コンポーネントを使用するようです．