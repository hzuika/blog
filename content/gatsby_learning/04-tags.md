---
title: "タグ機能をつける"
metaTitle: "Learning Gatsby 04"
metaDescription: ""
---

MDXファイルのfrontmatterに`tags`を設定します．
```
---
tags: ["test", "test1", "test2"]
---
```

`http://localhost:8000/__graphql`で`tags`の情報が取得できることを確認します．
```
query MyQuery {
  allMdx {
    edges {
      node {
        frontmatter {
          tags
        }
      }
    }
  }
}
```

変数を使用して，特定のタグを抽出できることを確認します．

```
query ($tag: String) {
  allMdx(filter: {frontmatter: {tags: {in: [$tag]}}}) {
    edges {
      node {
        frontmatter {
          tags
        }
      }
    }
  }
}

```

変数は例えばこのようになります．
```
{
	"tag": "test"
}
```

ページへのリンクが欲しいので，`slug`も取得します．

```js
export const tagPgaeQuery = graphql`
  query ($tag: String) {
    allMdx(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      edges {
        node {
          frontmatter {
            tags
          }
          slug
        }
      }
    }
  }
`;

```

タグの数や種類については以下のクエリで取得することができます．

```
query {
  allMdx {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
    totalCount
  }
}
```

出力はこのようになります．
```
{
  "data": {
    "allMdx": {
      "group": [
        {
          "fieldValue": "markdown",
          "totalCount": 1
        },
        {
          "fieldValue": "test",
          "totalCount": 2
        }
      ],
      "totalCount": 2
    }
  },
  "extensions": {}
}
```

JSXファイルでGraphQLの情報を取得して`console.log()`で出力すると次のようになります．

```js
const TagPage = ({
  data: {
    allMdx: { group },
  },
}) => {
  console.log(group);
  return <Layout pageTitle="Tags"></Layout>;
};

export const tagQuery = graphql`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      totalCount
    }
  }
`;

export default TagPage;
```

```
Array(2)
0: {fieldValue: 'markdown', totalCount: 1}
1: {fieldValue: 'test', totalCount: 2}
length: 2
```

タグの数を表示した後，箇条書きでタグの名前とタグの入ったmarkdownファイルの数を表示します．
```js
const TagPage = ({
  data: {
    allMdx: { group, totalCount },
  },
}) => {
  return (
    <Layout pageTitle="Tags">
      {totalCount} tags.
      <ul>
        {group.map((tag) => (
          <li key={tag.fieldValue}>
            {tag.fieldValue} ({tag.totalCount})
          </li>
        ))}
      </ul>
    </Layout>
  );
};
```

参考: 
* [Gatsbyブログにカテゴリやタグを追加する｜にしまつ@マーケティング・サイエンティスト｜note](https://note.com/daikinishimatsu/n/n20d48b27cc72)