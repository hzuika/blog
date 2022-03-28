---
title: "何も書かれていないファイルを削除する．"
metaTitle: "Freestyle Cleanup 12"
metaDescription: "Delete empty files in Freestyle"
---
Powershellで以下のコマンドを実行して，ファイルサイズでソートしてファイル名を出力します．
```ps1
Get-ChildItem .\source\blender\freestyle\ -Recurse -File| Sort-Object -Property Length | ForEach-Object {Write-Host $_.Length $_.Fullname}
```

200バイトくらいのファイルは何も書かれていない空のファイルだったため，削除しました．

# 削除対象
* Rep.cpp
* SceneVisitor.cpp
* BaseObject.cpp
* Iterator.cpp
* PythonInterpreter.cpp

# diff
* [masterブランチとのdiff](https://gist.github.com/hzuika/2d8cfae80651d458722aed42c31d6985)
* [直前の変更とのdiff](https://gist.github.com/hzuika/bf8d594c7a48d12f8ce88d109c173da7)
