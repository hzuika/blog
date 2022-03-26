---
title: "スニペット"
metaTitle: "Snippet"
metaDescription: "よく使用する簡単なコマンド"
---

# よく使用するコマンド

## git

リモートリポジトリにローカルリポジトリの特定のブランチをpushする．
また，その際，リモートリポジトリのコミットを強制的に上書きする．
```txt
git push fork frs_cleanup -f
git push リモートリポジトリ ローカルリポジトリのブランチ -f
```


diffファイルの作成コマンド．変更箇所と周辺100行まで記載される．
```txt
git diff -U100 master > ../diffファイルパス
```

## gist

新規gistを作るときのurl．
ファイルエクスプローラーからファイルをドラッグアンドドロップで挿入できる．

[gist.github.com](gist.github.com)

自分(ユーザ名 hzuika)のgist一覧を確認するurl．

[gist.github.com/hzuika](gist.github.com/hzuika)

## powershell

gastbyブログをビルドするときのコマンド．
```ps1
rmdir docs; npm run build; mv public docs
```

最後のコマンドをコピーする．
```ps1
(Get-History | Select-Object -Last 1).CommandLine | clip
```

関数として$PROFILEに定義しておくとCopyLastCommandで呼び出せる．
```ps1
function CopyLastCommand {(Get-History | Select-Object -Last 1).CommandLine | clip}
```

コマンド履歴をコピーする．
こちらのほうが使いやすいかもしれない．
```ps1
Get-History | clip
```

## cppcheck
ディレクトリ下のソースコード内の未使用関数を検出する．
他にもError等も出力されます(これの消し方はまだわかりません)．
```txt
cppcheck --enable=unusedFunction -q ディレクトリ 2> 出力ファイルパス
```