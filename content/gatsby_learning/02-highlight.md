---
title: "シンタックスハイライト"
metaTitle: "Learning Gatsby 02"
metaDescription: ""
---

コードブロックのシンタックスハイライト機能を加えるためには，[gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/)と呼ばれるプラグインが存在するらしいですが，mdxではあまり使用されないみたいです．

[prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) が使われるようです．

参考:
* [gatsby-plugin-mdx with prismjs and MDXRenderer, how? · Issue #17361 · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/issues/17361)
* [Gatsby製のマークダウンブログをmdxに置き換えた | きむそん.dev](https://kimuson.dev/blog/gatsby/replace_gatsby_blog_mdx/#%E3%82%B3%E3%83%BC%E3%83%89%E3%83%8F%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88)
* [Language Tabs for Markdown & MDX Code Blocks | Lennart Jörgens](https://www.lekoarts.de/garden/language-tabs-for-markdown-and-mdx-code-blocks)
* [language-tabs-mdx - CodeSandbox](https://codesandbox.io/s/language-tabs-mdx-g03g6?file=/src/components/Code.js)
* [Migrating from gatsby-remark-prismjs to prism-react-renderer](https://prince.dev/prism-react-renderer)
* [gatsby.jsのMDXProviderでMDXRendererのカスタマイズする方法｜ITベンチャーの世界｜エンジニア × プログラミング × ビジネス × キャリア = クリエイター](https://aventureworld.com/posts/53)

---

Pythonの関数の色が微妙に違う気がします．
Pythonの関数がkeywordとして設定されます．

参考:
[1.1.0 -> 1.1.1 breaks Python highlighting in Docusaurus · Issue #87 · FormidableLabs/prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer/issues/87)

---

VSCode Dark+ のテーマが使いたかったのですが，以下のツールを使用してもうまくカラーリングが生成されませんでした．

[prism-react-renderer/tools/themeFromVsCode at master · FormidableLabs/prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer/tree/master/tools/themeFromVsCode)

参考:
[prismjs-vscode-dark/dark-plus-theme.scss at master · mika-f/prismjs-vscode-dark](https://github.com/mika-f/prismjs-vscode-dark/blob/master/src/dark-plus-theme.scss)

---

スタイルを整えます．

参考:
* [prism-react-renderer example - CodeSandbox](https://codesandbox.io/s/prism-react-renderer-example-u6vhk?file=/src/WithLineNumbers.js)
* [vscode styled componentsの補完が効かない](https://zenn.dev/muzin00/articles/ace4d0d4b3da4d)

---

prism.jsでrustのシンタックスハイライト用のキーワードは`rs`ではなく，`rust`でした．

参考:
* [Prism](https://prismjs.com/)