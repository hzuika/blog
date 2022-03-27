---
title: "SteerableViewMapを計算する部分を削除する"
metaTitle: "Freestyle Cleanup 05"
metaDescription: "delete compute"
---

`setComputeSteerableViewMapFlag`は常に`false`に設定されているため，`ComputeSteerableViewMap()`が実行されることはありません．
また，`ComputeSteerableViewMap()`の内部実装は既に`#if 0`ディレクティブにより削除しています．
実装が未完成のままなのかもしれませんが，とりあえず削除してしまいます．

関係のある変数や関数
* setComputeSteerableViewMapFlag
* _ComputeSteerableViewMap
* ComputeSteerableViewMap

diff
* [masterブランチとのdiff](https://gist.github.com/hzuika/d50c0ffe7d2dca44c00e6856dddb4238)
* [直前の変更とのdiff](https://gist.github.com/hzuika/20e9f9d73926dab7c6fcf64fb01911a3)

---

## 備考

Steerable view mapはFreestyle関連の論文に書かれていたような記憶があります．

VSCodeのC/C++拡張機能が勝手にアンインストールされている時がありました．
その時は`%HOMEPATH%\.vscode\extensions\ms-vscode.cpptools-1.9.7`を消して，再インストールしています．
クラウド同期が原因かもしれないため，Do not syncでC/C++をインストールしておきます．