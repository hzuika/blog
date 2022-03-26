---
title: "Pathに関連するファイルの削除"
metaTitle: "Freestyle Cleanup 01"
metaDescription: "Freestyleのソースコードをきれいにする"
---

# Pathに関連するファイルの削除

Blender 2.7 より前のバージョンでは，ブラシやラインパターンのプリセットフォルダが存在していたようです．
これらのフォルダはBlender 2.7 から削除されましたが，フォルダパスを保存する実装は残ったままだったため削除しました．

## 削除対象
* StringUtils.cpp
* FreestyleConfig.h
* AppConfig.cpp
* AppConfig.h
* これらに関連する関数やクラスメンバなど．

[diff](https://gist.github.com/hzuika/533701bf2e2bac57222644ac503acaf9)

---

## 備考

これらのコミット中にサブモジュールへの変更が混ざってしまったため，コミットを編集しました．

4個前のコミットを編集したかったため，
```
git rebase -i HEAD~4
```
を実行して，対象のコミットを`pick`から`edit`に変更して保存しました．
そのあと，
```
git reset --soft HEAD^
```
で，コミット前に戻り，不必要な変更を減らして再度コミットしました．
そのあと，
```
git commit --amend
```
を実行した後，
```
git rebase --continue
```
で戻しました．

