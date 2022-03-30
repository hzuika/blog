---
title: "Indexed Face Setについて"
metaTitle: "Freestyle Reading Code 04"
metaDescription: "Reading Indexed Face Set"
---

```cpp
class IndexedFaceSet : public Rep {
 protected:
  float *_Vertices; // 一次元化された頂点座標の配列
  unsigned _VSize; // 頂点数 × 3
  unsigned _NumFaces; // 三角面の数
}
```

Visual Studio Code の デバッグ中の watch を使用して，`ポインタ, サイズ`とすることで，中身を確認できる．
```txt
ifs._VSize: 24
ifs._Vertices, 24
[0] -1.42147851
[1] -0.816790700
[2] -11.7388144
[3] -1.42147851
[4] 0.974000573
[5] -10.8482714
[6] 0.0338741206
[7] 1.58484232
[8] -12.0766125
[9] 0.0338740908
[10] -0.205948919
[11] -12.9671555
[12] 1.40571523
[13] 0.936815381
[14] -10.7734957
[15] 1.40571523
[16] -0.853975892
[17] -11.6640387
[18] -0.0496373512
[19] 0.325973660
[20] -9.54515457
[21] -0.0496373810
[22] -1.46481764
[23] -10.4356976
```

```txt
ifs._NumFaces: 12
ifs._NumVertexPerFace, 12
[0] 3
[1] 3
[2] 3
[3] 3
[4] 3
[5] 3
[6] 3
[7] 3
[8] 3
[9] 3
[10] 3
[11] 3
```