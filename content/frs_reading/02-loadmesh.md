---
title: "メッシュの読み込み"
metaTitle: "Freestyle Reading Code 02"
metaDescription: "Reading LoadMesh function"
---


# まとめ

メッシュの読み込みは次のような流れになっていました．
* `BlenderFileLoader::Load` が Blenderのメッシュ幾何情報 → `IndexedFaceSet` と呼ばれるMV行列乗算後の幾何情報(カメラから見た頂点位置)
* `WingedEdgeBuilder::buildWShape` が `IndexedFaceSet` → Winged Edge データ構造

---

メッシュの読み込み機能が気になるので，読んでいきます．

メッシュの読み込みは `FRS_do_stroke_rendering` > `prepare` 関数内で呼び出される, `Controller::LoadMesh` メソッドで行われます．

このメソッド内の `WXEdgeBuilder` クラスがBlenderのメッシュの幾何情報を  Winged Edge と呼ばれるデータ構造に変換します．

具体的には， `blenderScene` が `accept` で `wx_builder` を受け入れて，中で仕事をさせます．
これはVisitorパターンと呼ばれるものです．
Visitorパターンに関しては，[こちらの記事](https://qiita.com/tanakahisateru/items/44ae10d74db504bcd013)に説明のある通り，サンタクロース(Visitor)を煙突のある家が受け入れて(accept)，中で勝手に仕事をさせる(プレゼントを置く)という説明が分かりやすかったです．

```cpp
  WXEdgeBuilder wx_builder;
  blenderScene->accept(wx_builder);
  _winged_edge = wx_builder.getWingedEdge();
```

`NodeGroup` クラスの `blenderScene` の `accept` メソッドは次のような実装をしています．
`SceneVisitor &v` が今回は `wx_builder` になります．
このように， `SceneVisitor` が `accept` の中で勝手に `visit` を実行してるだけだということがわかります．

```cpp
void NodeGroup::accept(SceneVisitor &v)
{
  v.visitNodeGroup(*this);

  v.visitNodeGroupBefore(*this);
  for (vector<Node *>::iterator node = _Children.begin(), end = _Children.end(); node != end;
       ++node) {
    (*node)->accept(v);
  }
  v.visitNodeGroupAfter(*this);
}
```

---

# ブレークポイントで挙動を追う

オーバーライドする関数は，ソースコードで追っていくと少し大変なのでブレークポイントで挙動を追ってみました．

デフォルトキューブのみの `blenderScene` の構成は次のようになっていました．
* blenderScene
    * _Children (NodeGroup)
        * _Children (NodeShape)
            * _Shapes (IndexedFaceSet)

次のvisitが確認できました．(残りはSceneVisitorで定義された何もしない関数でした．)
* `void WingedEdgeBuilder::visitNodeShape(NodeShape &ns)`
* `void WXEdgeBuilder::visitIndexedFaceSet(IndexedFaceSet &ifs)`

# visitIndexedFaceSet
`WingedEdgeBuilder::buildWShape` により `visitIndexedFaceSet` から Winged Edge が構築されているみたいです．
さらに `buildWShape` の `WXEdgeBuilder::buildWVertices` を見ていきます．
関数内部の `vsize` は `24` で，これを3個ずつループして `WXVertex` を作成していました．
頂点の数は8個です(立方体の頂点数)．
各頂点の座標は次の通りです．

|x|y|z|
|-|-|-|
|1.40571523|0.936815381|-10.7734957|
|0.0338741206|1.58484232|-12.0766125|
|-1.42147851|0.974000573|-10.8482714|
|-0.0496373512|0.325973660|-9.54515457|
|-0.0496373810|-1.46481764|-10.4356976|
|-1.42147851|-0.816790700|-11.7388144|
|0.0338740908|-0.205948919|-12.9671555|
|1.40571523|-0.853975892|-11.6640387|

この値は次のpythonコードの結果と一致します．
ただし，出力される頂点の順番は異なります．
```py
import bpy

mvert = bpy.data.objects['Cube'].data.vertices
obmat = bpy.data.objects['Camera'].matrix_world.inverted()

for v in mvert:
    print(obmat @ v.co)

'''
<Vector (1.4057, 0.9368, -10.7735)>
<Vector (1.4057, -0.8540, -11.6640)>
<Vector (-0.0496, 0.3260, -9.5452)>
<Vector (-0.0496, -1.4648, -10.4357)>
<Vector (0.0339, 1.5848, -12.0766)>
<Vector (0.0339, -0.2059, -12.9672)>
<Vector (-1.4215, 0.9740, -10.8483)>
<Vector (-1.4215, -0.8168, -11.7388)>
'''
```

`buildWShape` では `IndexedFaceSet` から幾何情報を取得して `WingedEdgeBuilder::buildTriangles` が呼ばれます．

```cpp
      case IndexedFaceSet::TRIANGLES:
        buildTriangles(new_vertices,
                       new_normals,
                       frs_materials,
                       texCoords,
                       faceEdgeMarks,
                       vindices,
                       nindices,
                       mindices,
                       tindices,
                       numVertexPerFace[index]);
```

その中で `WXShape::MakeFace` が呼ばれ， `WXVertex` からEdgeやFaceが作られます．

# IndexedFaceSet はいつ作られるのか
幾何情報が格納されていた `IndexedFaceSet` がどこで作られるのか調べます．
```cpp
  NodeGroup *blenderScene = loader.Load();
```
の後で，既に `IndexedFaceSet` が存在するため， `NodeGroup *BlenderFileLoader::Load()` の中で作られているようです．

`Load` の中の `insertShapeNode` にある, `currentMesh` と  `shape` が `blenderScene` の子になっていたようです．
```cpp
  NodeGroup *currentMesh = new NodeGroup;
  NodeShape *shape = new NodeShape;
```

また，ローカルの頂点座標(`mvert`)がMV行列(`obmat`)で乗算され，カメラから見た頂点座標に変換されるようです．

---

# 備考

Visual Studio Codeでデバッグしようとして，ブレークポイントからステップオーバーが変なところに移動するので，Visual Studioでデバッグしました．

## Visual Studio でビルドするとエラー
[ここ](/frs_cleanup/11-restore_visibility_alog_in_dna)で修正しました．

Visual Studioでビルドすると，エラーが出ました．

source/blender/makesdna/DNA_freestyle_types.h の次の変更によって，
```diff
-  FREESTYLE_ALGO_REGULAR = 1,
-  FREESTYLE_ALGO_FAST = 2,
-  FREESTYLE_ALGO_VERYFAST = 3,
-  FREESTYLE_ALGO_CULLED_ADAPTIVE_TRADITIONAL = 4,
-  FREESTYLE_ALGO_ADAPTIVE_TRADITIONAL = 5,
```

`FREESTYLE_ALGO_CULLED_ADAPTIVE_TRADITIONAL` が使用されているソースコード(source\blender\blenloader\intern\versioning_260.c)でエラーが出てビルドできませんでした．
ちなみに ninja ビルドシステムでビルドしているときはなぜかエラーになりませんでした．
