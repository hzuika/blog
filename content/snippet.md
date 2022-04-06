---
title: "スニペット"
metaTitle: "Snippet"
metaDescription: "よく使用する簡単なコマンド"
---

# git

## リモートリポジトリにローカルリポジトリの特定のブランチをpushする．
また，その際，リモートリポジトリのコミットを強制的に上書きする．
```txt
git push fork frs_cleanup -f
git push リモートリポジトリ ローカルリポジトリのブランチ -f
```


## diffファイルの作成コマンド
変更箇所と周辺100行まで記載される．
```txt
git diff -U100 master > ../diffファイルパス
```

## 直前のコミットとのdiffを作成する
```txt
git diff -U100 HEAD^ > ../diffファイルパス
```

## 自分のコミットしたコードの行数を数える．
(参考: https://qiita.com/Night___/items/359ff81f358968567a45)
```sh
# macOS
git log --numstat --pretty="%H" --author='Yuki Hashimoto' --since=2021-07-01 --no-merges | awk 'NF==3 {plus+=$1; minus+=$2} END {printf("%d (+%d, -%d)\n", plus+minus, plus, minus)}'
```
blenderのリポジトリで実行すると， 2022/03/29時点で， 535 (+460, -75) だった．

## 空のコミット
参考: [Git 空コミットを行う - Qiita](https://qiita.com/miriwo/items/dbf82ca73723026d96f2)
```
git commit --allow-empty -m "first commit"
```

## コミットメッセージの修正
```
git commit --amend -m "メッセージの修正"
```

## コミットの編集(rebase)で最初のコミットに戻る
```
git rebase -i --root
```

### 該当のコミットを直前のコミットに統合する
git-rebase-todoの，該当コミットの pick -> fixup に変更

### コミットを削除する
git-rebase-todoの，該当コミットの pick -> drop に変更

### コミットの順番を変える
git-rebase-todoの，該当コミットの場所を変える．

# gist

## 新規gistを作るときのurl
ファイルエクスプローラーからファイルをドラッグアンドドロップで挿入できる．

[gist.github.com](gist.github.com)

## 自分(ユーザ名 hzuika)のgist一覧を確認するurl

[gist.github.com/hzuika](gist.github.com/hzuika)

# powershell

## gastbyブログをビルドするときのコマンド
```ps1
rmdir docs; npm run build; mv public docs
```

## CNAMEのコピーを含めたコマンド
```txt
rmdir docs; npm run build; mv public docs; cp src/CNAME docs
```

## 最後のコマンドをコピーする
```ps1
(Get-History | Select-Object -Last 1).CommandLine | clip
(Get-History | Select-Object -Last 1).CommandLine | Set-Clipboard # 改行なし
```

## 関数として$PROFILEに定義しておくとCopyLastCommandで呼び出せる
```ps1
function CopyLastCommand {(Get-History | Select-Object -Last 1).CommandLine | clip}
function CopyLastCommand {(Get-History | Select-Object -Last 1).CommandLine | Set-Clipboard} # 改行なし
```

## コマンド履歴をコピーする．
こちらのほうが使いやすいかもしれない．
```ps1
Get-History | clip
```

## ファイルサイズでソートして，サイズとファイル名を出力する (サブフォルダも対象)．
```ps1
Get-ChildItem .\source\blender\freestyle\ -Recurse -File| Sort-Object -Property Length | ForEach-Object {Write-Host $_.Length $_.Fullname}
```

# cppcheck
## ディレクトリ下のソースコード内の未使用関数を検出する．
他にもError等も出力されます(これの消し方はまだわかりません)．
```txt
cppcheck --enable=unusedFunction -q ディレクトリ 2> 出力ファイルパス
```

# make

Widnowsでblenderをビルドするときは， make コマンドではなく， make.bat のバッチファイルを実行します．
Powershellで実行する場合は， .\make.bat のようにカレントディレクトリから書く必要があります(tabで補完できます)．

## blenderの実行ファイルの出力ディレクトリを手動で設定します．
これで，bulid_msbuild_debug フォルダにVisual Studio のソリューションファイルが作成されます．
```txt
.\makebat debug builddir bulid_msbuild_debug
```

## blenderのビルド
いつもは ninja ビルドシステムとsccacheオプションを有効にしてblenderをビルドしています．
ビルド時間は計測したことはありませんが，ninjaのほうが早く感じます．
```txt
.\make.bat debug ninja sccache
```

# Network

## IP アドレスを調べる
```sh
# macOS
ifconfig
# Windows
ipconfig
```

## 同一LAN内の接続機器のIPアドレスとMACアドレスを調べる
```sh
arc -a
```

MACアドレス(OrganizationalUniqueIdentifier （OUI）)から，製造元を調べるサイト．
(参考: https://www.pcwdld.com/find-device-or-ip-address-using-mac-address)

[https://www.wireshark.org/tools/oui-lookup.html](https://www.wireshark.org/tools/oui-lookup.html)

# GitHub

## Advanced Search
* リポジトリを指定 `repo:`
* ファイルパスを指定 `path:`
例：blender/blender リポジトリの /source フォルダ内で ghost という単語を検索する．
```txt
ghost path:/source  repo:blender/blender
```