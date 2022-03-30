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
  WShape *_Shape;  // 所属している WShape
}
```

# WOEdge
```cpp
  WVertex *_paVertex;  // 始点
  WVertex *_pbVertex;  // 終点
  WFace *_paFace;      // 右面
  WFace *_pbFace;      // 左面
  WEdge *_pOwner;      // 所属しているエッジ

  // WOEdge::setVecAndAngle を参照
  Vec3f _vec; // 始点から終点への方向ベクトル
  float _angle; // 左面と右面の外積ベクトルと単位方向ベクトルの角度 (要図)
```

# WEdge
```cpp
class WEdge {
 protected:
  WOEdge *_paOEdge;  // 1番目の有向エッジ
  WOEdge *_pbOEdge;  // 2番目の有向エッジ
}
```

# WFace
```cpp
class WFace {
 protected:
  vector<WOEdge *> _OEdgeList;  // 境界の有向エッジのリスト
}
```

# WShape
```cpp
class WShape {
 protected:
  vector<WVertex *> _VertexList;
  vector<WEdge *> _EdgeList;
  vector<WFace *> _FaceList;
}
```

# WingedEdge
```cpp
class WingedEdge {
 private:
  vector<WShape *> _wshapes;
};
```

# 例: デフォルトキューブ

`Controller::LoadMesh` 時の `_winged_edge` の中身を確認してみます．
```cpp
int Controller::LoadMesh(Render *re, ViewLayer *view_layer, Depsgraph *depsgraph)
{
  _winged_edge = wx_builder.getWingedEdge();
+ for (const auto& wshape : _winged_edge->getWShapes()) {
+   for (const auto& wvertex: wshape->getVertexList()) {
+     Vec3f &co = wvertex->GetVertex();
+     std::cout << "|" << wvertex->GetId() << "|" << co[0] << "|" << co[1] << "|" << co[2] << "|";
+     for (const auto& wedge: wvertex->GetEdges()) {
+       std::cout << wedge->GetId() << ", ";
+     }
+     std::cout << "|" << std::endl;
+   }
+ }
}
```

## _VertexList

|\_Id|x|y|z|\_EdgeListの\_Id|
|-|-|-|-|-|
|0|1.40572|0.936815|-10.7735|0, 2, 4, 15, 17, |
|1|0.0338741|1.58484|-12.0766|0, 1, 9, 10, |
|2|-1.42148|0.974001|-10.8483|1, 2, 3, 6, 7, |
|3|-0.0496374|0.325974|-9.54515|3, 4, 5, 16, |
|4|-0.0496374|-1.46482|-10.4357|5, 6, 8, 13, 14, |
|5|-1.42148|-0.816791|-11.7388|7, 8, 9, 11, |
|6|0.0338741|-0.205949|-12.9672|10, 11, 12, 14, 17, |
|7|1.40572|-0.853976|-11.664|12, 13, 15, 16, |