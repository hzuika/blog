---
title: "Winged Edge データ構造について"
metaTitle: "Freestyle Reading Code 03"
metaDescription: "Reading Winged Edge"
---

Winged Edge は View map の構築を行う際に用いられるメッシュのデータ構造です．

source\blender\freestyle\intern\winged_edge\WEdge.h で定義されており，次の6個のクラスが存在します．

* WVertex
* WOEdge
* WEdge
* WFace
* WShape
* WingedEdge

# WVertex
```cpp
class WVertex {
 protected:
  Vec3f _Vertex; // 3次元座標
  vector<WEdge *> _EdgeList;
  WShape *_Shape;  // この頂点を持つ WShape
}
```