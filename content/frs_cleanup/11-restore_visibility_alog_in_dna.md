---
title: "削除したDNA内のVisibilityAlgoのEnumを元に戻す(コミット修正)"
metaTitle: "Freestyle Cleanup 11"
metaDescription: "Restore deleted visibility algo in DNA"
---

[6回目](/frs_cleanup/06-visibility_algo)で可視性アルゴリズムを選ぶための列挙型の一つである `FREESTYLE_ALGO_CULLED_ADAPTIVE_TRADITIONAL` を source\blender\makesdna\DNA_freestyle_types.h から削除しました．
しかし，古いバージョンのBlenderを読み込むためのソースコード(source\blender\blenloader\intern\versioning_260.c)で使用されていたため，定義だけ残しておきます．
Visual Studio ではエラーでしたが， ninja ビルドシステムでビルドしているときはなぜかエラーになりませんでした．

昔のコミットを修正したいと思います．

コミット履歴を確認します．
```txt
git log --oneline
```
HEADから数えて，9個目のコミットを編集したかったので，
```txt
git rebase -i HEAD~9
```
対象のコミットの `pick` を `edit` に変更して保存します．(vimだと`:wq`)

そのあと，コミット前に戻します．
```txt
git reset --soft HEAD^
```
DNA_freestyle_types.h への変更をやめます．
```txt
git restore --staged .\source\blender\makesdna\DNA_freestyle_types.h
git restore .\source\blender\makesdna\DNA_freestyle_types.h
```
再度コミットします．
```txt
git commit -m "Cleanup: unused visibility algorithm in freestyle."
```
rebaseを元に戻します．
```txt
git rebase --continue
```