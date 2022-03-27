---
title: "Grid.cpp/hで使用されていない関数を削除する．"
metaTitle: "Freestyle Cleanup 08"
metaDescription: "delete unused function in Grid.cpp/h"
---

前回の後，cppcheckを使用すると，Grid.cpp/hに未使用関数があるみたいなので，削除していきます．
cppcheckを繰り返し実行すると，時間がかかるため，手動でチェックします．

* `castRay`
* `castInfiniteRay`
* `initRay`
* `initInfiniteRay`
* `initAcceleratedRay`
* `initAcceleratedInfiniteRay`
* `castRayInternal`
* `nextRayCell`
* `examineOccluder`
* `inBox`

# diff
* [masterブランチとのdiff](https://gist.github.com/hzuika/479d62f9feedbcab68df94341ccb984e)
* [直前の変更とのdiff](https://gist.github.com/hzuika/edeac218cc5f41fe454d09e35709b1bc)