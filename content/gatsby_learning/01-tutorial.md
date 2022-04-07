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

```
npm init -y
npm install gatsby react react-dom
```

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

Reactコンポーネントで `{ children }` 引数 (`props.children`)を使用すると，タグで囲まれた要素が使用できる．

参考:
[Part 2: Use and Style React Components | Gatsby](https://www.gatsbyjs.com/docs/tutorial/part-2/#create-a-reusable-layout-component)

.module.css の拡張子を持つファイルを作成して，`.名前 {}`のCSSクラスを定義します．
JSXファイルにインポートして，Reactコンポーネント内でタグの `className={名前}` に対応するCSSクラスを代入すると適用されます．
`.nav-links`のようにハイフンを持ったCSSクラスの場合はJSXファイル内で使用する場合は`navLinks`のように，ハイフンを削除して，その次の文字を大文字に変更します．

参考:
[Part 2: Use and Style React Components | Gatsby](https://www.gatsbyjs.com/docs/tutorial/part-2/#style-components-with-css-modules)

---

```
npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem
```

インストールしたプラグインを使用するために，gatsby-config.js に `module.exports` を加えます．
```js
module.exports = {
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
    ]
} 
```

"gatsby-plugin-image" から `<StaticImage>` コンポーネントをインポートして画像を表示します．

ちなみに `gatsby-plugin-sharp` がないと怒られます．
```
Gatsby-plugin-sharp wasn't setup        
correctly in gatsby-config.js. Make sure
 you add it to the plugins array.
```

参考: 
[Part 3: Add Features with Plugins | Gatsby](https://www.gatsbyjs.com/docs/tutorial/part-3/)

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