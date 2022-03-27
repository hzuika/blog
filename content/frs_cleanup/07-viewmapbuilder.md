---
title: "ViewMapBulder.cpp/hで使用されていない関数を削除する．"
metaTitle: "Freestyle Cleanup 07"
metaDescription: "delete unused function in ViewMapBulder.cpp/h"
---

前回，可視性アルゴリズムについて削除しましたが，ViewMapBuilder.cppには，他にも未使用の関数が残っているようなので，手動で調べていきます．

* 未使用の関数
    * `computeFastVisibility`
    * `computeVeryFastVisibility`
    * `DetectCusps`
    * `setProgressBar`
    * `FindOccludee`
    * `BuildGrid`

# diff
* [masterブランチとのdiff](https://gist.github.com/hzuika/d70ec61c6731d2dfd6c627e52e65c281)
* [直前の変更とのdiff](https://gist.github.com/hzuika/aec378bb7d461671239da286d0b701b0)