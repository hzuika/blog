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