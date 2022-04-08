---
title: "GitHub GraphQL APIを使う"
metaTitle: "Learning Gatsby 03"
metaDescription: ""
---

GitHub GraphQL APIを使って自分のコミット履歴を取得します．

# GitHub の Explorer を使って GraphQL のクエリを確認する

Graph QLのクエリは[Explorer - GitHub Docs](https://docs.github.com/ja/graphql/overview/explorer)で試すことができます．
blender/blender リポジトリで自分(hzuika)のコミットは以下のqueryで検索できました．
自分の場合は，`author.emails`が[developer.blender.org](developer.blender.org)のユーザーネームになっていました．
```js
{
  repository(owner: "blender", name: "blender") {
    object(expression: "master") {
      ... on Commit {
        history(author: {emails: "hzuika"}) {
          edges {
            node {
              messageHeadline
              committedDate
              commitUrl
            }
          }
        }
      }
    }
  }
}
```

# GitHubのアクセストークンを取得して，GraphQL APIを使う

gatsbyでgithub apiを使用するために[`gatsby-source-github-api`](https://github.com/ldd/gatsby-source-github-api)をインストールします．

自分のアカウントのSettings/Developer settingsからPersonal access tokensを取得します．
パブリックの情報の読み取りのみであれば，権限を割り当てる必要はないので，チェックはしません．

試しに，取得したトークン(GITHUB_ACCESS_TOKEN)で，blender/blender リポジトリの名前をcurlで取得してみます．
Powershellのcurlだとエラーが出たので，MINGWのcurlを使用しました．
入れ子のダブルクォーテーション`"`を使う場合はエスケープ用のバックスラッシュもエスケープする必要がありました．
```sh
# curl -i -H "Authorization: bearer GITHUB_ACCESS_TOKEN" -X POST -d "{ \"query\": \"query { repository(owner: \"blender\", name: \"blender\") { name } }\"}" https://api.github.com/graphql
curl -i -H "Authorization: bearer GITHUB_ACCESS_TOKEN" -X POST -d "{ \"query\": \"query { repository(owner: \\\"blender\\\", name: \\\"blender\\\") { name } }\"}" https://api.github.com/graphql
```

データが返ってくることを確認します．
```js
{"data":{"repository":{"name":"blender"}}}
```

参考: 
* [curl - valid GitHub api v4 query keeps returning error "Problems parsing JSON" - Stack Overflow](https://stackoverflow.com/questions/45390076/valid-github-api-v4-query-keeps-returning-error-problems-parsing-json)
* [GitHub GraphQLにcurlでqueryを投げる - Qiita](https://qiita.com/ikemura23/items/4b0dd5a82abc9364638e)

# Gatsbyで GitHub GraphQL API を使う

GitHub GraphQL APIをしようするために，次のプラグインをインストールします．
`dotenv`はアクセストークンをコミットに含めないようにするためにインストールします．
```
npm install gatsby-source-github-api dotenv
```

`.env`ファイルを作成して，トークンを代入します．
```sh
GITHUB_PERSONAL_ACCESS_TOKEN="取得したトークン"
```

gatsby-config.jsを書き換えて，`gatsby develop`します．
```js
// gatsby-config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports ={
    {
      resolve: "gatsby-source-github-api",
      options: {
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        graphQLQuery: `
          query {
            repository(owner: "blender", name: "blender") {
              object(expression: "master") {
                ... on Commit {
                  history(author: {emails: "hzuika"}) {
                    edges {
                      node {
                        messageHeadline
                        committedDate
                        commitUrl
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      },
    },
}
```

`http://localhost:8000/___graphql`にアクセスして，次のクエリでデータが取得できることを確認します．
```js
query MyQuery {
  githubData {
    rawResult {
      data {
        repository {
          object {
            history {
              edges {
                node {
                  messageHeadline
                  committedDate
                  commitUrl
                }
              }
            }
          }
        }
      }
    }
  }
}

```


参考:
* [Show off Github repos in your Gatsby site using Github GraphQL API - DEV Community](https://dev.to/lennythedev/show-off-your-github-repos-in-your-gatsby-site-using-graphql-421l)

# GraphQL API で変数を使用する．

[Explorer](https://docs.github.com/ja/graphql/overview/explorer)で先ほどのクエリにt 変数を使用すると，次のようになります．
`String!` , `String`, `[String!]` などが少しややこしいです．

```js
query ($repo_owner: String!, $repo_name: String!, $branch: String, $emails: [String!]) {
  repository(owner: $repo_owner, name: $repo_name) {
    object(expression: $branch) {
      ... on Commit {
        history(author: {emails: $emails}) {
          edges {
            node {
              messageHeadline
              committedDate
              commitUrl
            }
          }
        }
      }
    }
  }
}
```

変数は例えば次のようになります．

```js
{
  "repo_owner": "blender",
  "repo_name": "blender",
  "branch": "master",
  "author_emails": ["hzuika"]
}
```