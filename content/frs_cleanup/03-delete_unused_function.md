---
title: "cppcheckを使用した未使用関数の削除"
metaTitle: "Freestyle Cleanup 03"
metaDescription: "Freestyle内の未使用の関数をcppcheckを使用して削除する"
---

# 未使用の関数を調べる．

cppcheckを使用してソースコード内のどこからも使われていない関数を調べます．

## cppcheck のインストール
cppcheckはscoopを使用してインストールしました．
```txt
scoop install cppcheck
```

```txt
cppcheck --version
Cppcheck 2.7
```

## cppcheckで未使用関数を調べる．
unusedFunctionはディレクトリ下で使われていない関数を出力するため，サブディレクトリ下では注意が必要です．
(他のディレクトリで使われるかもしれません．)
-q で進行状況を無視します．
他にもError等も出力されます(これの消し方はまだわかりません)．
unusedFunctionは最後にまとめて出力されます．

```txt
cppcheck --enable=unusedFunction -q .\source\blender\freestyle\ 2> 出力ファイルパス
```

[出力結果](https://gist.github.com/hzuika/48cbc266a1befddd33e90876bec44540)

出力結果からunusedFunctionだけ抜粋します．尚，
* 接頭辞が`BPy_`と`FRS_`の関数はfreestyleディレクトリ以外で使用される可能性がある(外部公開関数)ため，除いています．
* `test`接頭辞の関数も除いています．
* `iterator`系もreleaseディレクトリで使われる場合があるみたいなので除いています．

また，結果から余分な改行を除き，昇順で並び替えました(VSCodeのソート)．

### applicationディレクトリ内の未使用関数の削除

* [masterブランチとのdiff](https://gist.github.com/hzuika/0e5b3acdd48b3320cb41873571720f29)
* [直前の変更とのdiff](https://gist.github.com/hzuika/32eca4d9de32afa08e5bc20119413bac)

```txt
source\blender\freestyle\intern\application\AppCanvas.cpp:164:0: style: The function 'RenderStroke' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:464:0: style: The function 'saveSteerableViewMapImages' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:474:0: style: The function 'toggleVisibilityAlgo' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:514:0: style: The function 'getVisibilityAlgo' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:543:0: style: The function 'getViewMapCache' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:553:0: style: The function 'getQuantitativeInvisibility' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:603:0: style: The function 'getComputeSteerableViewMapFlag' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:690:0: style: The function 'AddStyleModule' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:705:0: style: The function 'ReloadStyleModule' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:744:0: style: The function 'BuildRep' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:755:0: style: The function 'toggleEdgeTesselationNature' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:761:0: style: The function 'setModelsDir' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:766:0: style: The function 'getModelsDir' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:773:0: style: The function 'setModulesDir' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:778:0: style: The function 'getModulesDir' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:785:0: style: The function 'resetInterpreter' is never used. [unusedFunction]
source\blender\freestyle\intern\application\Controller.cpp:792:0: style: The function 'displayDensityCurves' is never used. [unusedFunction]
```

### geometryディレクトリ内の未使用関数の削除

* [masterブランチとのdiff](https://gist.github.com/hzuika/7e64207f60ced45c386b4452d524f442)
* [直前の変更とのdiff](https://gist.github.com/hzuika/7c53743e70a6f066d3b9d1a06e2139f8)

```txt
source\blender\freestyle\intern\geometry\GeomCleaner.cpp:124:0: style: The function 'SortAndCompressIndexedVertexArray' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:45:0: style: The function 'intersect2dSeg2dSeg' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:573:0: style: The function 'includePointTriangle' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:700:0: style: The function 'fromRetinaToCamera' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:714:0: style: The function 'fromCameraToWorld' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\Grid.cpp:301:0: style: The function 'castRayToFindFirstIntersection' is never used. [unusedFunction]
```

### imageディレクトリ内の未使用関数の削除

* [masterブランチとのdiff](https://gist.github.com/hzuika/c29bdcdcd7fc534e495ce5c9016d6f0b)
* [直前の変更とのdiff](https://gist.github.com/hzuika/c6331ad07826577301fb46f0d5d297e8)

```txt
source\blender\freestyle\intern\image\ImagePyramid.cpp:39:0: style: The function 'getLevel' is never used. [unusedFunction]
```

### scene_graphディレクトリ内の未使用関数の削除

* [masterブランチとのdiff](https://gist.github.com/hzuika/46ac2f077b91b865d056f763d91cb430)
* [直前の変更とのdiff]()

```txt
source\blender\freestyle\intern\scene_graph\NodeCamera.cpp:43:0: style: The function 'setModelViewMatrix' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeGroup.cpp:92:0: style: The function 'RetrieveChildren' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:15:0: style: The function 'Translate' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:22:0: style: The function 'Rotate' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:72:0: style: The function 'Scale' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:81:0: style: The function 'MultiplyMatrix' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:87:0: style: The function 'setMatrix' is never used. [unusedFunction]
```

### strokeディレクトリ内の未使用関数の削除

* [masterブランチとのdiff](https://gist.github.com/hzuika/60a2ed29a31674f24833cd9c3a21ab71)
* [直前の変更とのdiff](https://gist.github.com/hzuika/d2c954ed205441e64a30fa00573816ab)

```txt
source\blender\freestyle\intern\stroke\Canvas.cpp:162:0: style: The function 'PushBackStyleModule' is never used. [unusedFunction]
```

### view_mapディレクトリ内の未使用関数の削除

* [masterブランチとのdiff](https://gist.github.com/hzuika/1a2aa84809e96e54070d1a7b3b6683e2)
* [直前の変更とのdiff](https://gist.github.com/hzuika/a0bf2a2c2a42869ba6f477906c601c94)

```txt
source\blender\freestyle\intern\view_map\CulledOccluderSource.cpp:57:0: style: The function 'getOccluderProscenium' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\Functions1D.cpp:220:0: style: The function 'getOccludersF1D' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\Silhouette.cpp:206:0: style: The function 'viewedge_nature' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\Silhouette.cpp:55:0: style: The function 'shape_id' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\SilhouetteGeomEngine.cpp:111:0: style: The function 'retrieveViewport' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\SilhouetteGeomEngine.cpp:260:0: style: The function 'WorldToImage' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\SilhouetteGeomEngine.cpp:267:0: style: The function 'CameraToImage' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\SteerableViewMap.cpp:174:0: style: The function 'buildImagesPyramids' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewEdgeXBuilder.cpp:555:0: style: The function 'FindNextWEdge' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewEdgeXBuilder.cpp:604:0: style: The function 'FindPreviousWEdge' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewMapBuilder.cpp:887:0: style: The function 'CullViewEdges' is never used. [unusedFunction]
```

### winged_edgeディレクトリ内の未使用関数の削除

* [masterブランチとのdiff](https://gist.github.com/hzuika/1c69e4e4b494ced090bd46ffdc8f9fe4)
* [直前の変更とのdiff](https://gist.github.com/hzuika/122f8e4b411e60e728e8dc0348dc8df1)

```txt
source\blender\freestyle\intern\winged_edge\Curvature.cpp:132:0: style: The function 'gts_vertex_gaussian_curvature' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:206:0: style: The function 'gts_vertex_principal_directions' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:86:0: style: The function 'gts_vertex_mean_curvature_normal' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\WXEdge.cpp:175:0: style: The function 'ComputeCenter' is never used. [unusedFunction]
```

## cppcheckで未使用関数を調べる(2回目)．

cppcheckで未使用関数を削除すると，その関数の中で使われていた関数が未使用になることがあります．
そこでもう一度cppcheckを実行します．

[出力結果](https://gist.github.com/hzuika/a62eec641aafd34186918b430d1e0e71)

* [masterブランチとのdiff](https://gist.github.com/hzuika/3421de11fdef73d17ffc6697f7b0ac53)
* [直前の変更とのdiff](https://gist.github.com/hzuika/b830b9430644554a68ad04b75d1ccca4)

```txt
source\blender\freestyle\intern\geometry\GeomCleaner.cpp:65:0: style: The function 'CompressIndexedVertexArray' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:68:0: style: The function 'isScaled' is never used. [unusedFunction]
source\blender\freestyle\intern\stroke\Canvas.cpp:222:0: style: The function 'ReplaceStyleModule' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\SteerableViewMap.cpp:200:0: style: The function 'getNumberOfPyramidLevels' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\SteerableViewMap.cpp:208:0: style: The function 'saveSteerableViewMap' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewEdgeXBuilder.cpp:541:0: style: The function 'retrieveFaceMarks' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:103:0: style: The function 'linsolve' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:113:0: style: The function 'eigenvector' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:41:0: style: The function 'triangle_obtuse' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\WEdge.cpp:381:0: style: The function 'getArea' is never used. [unusedFunction]
```

## cppcheck(3回目)
3回目です．

```txt
source\blender\freestyle\intern\geometry\GeomCleaner.cpp:22:0: style: The function 'SortIndexedVertexArray' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:58:0: style: The function 'angle_from_cotan' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:29:0: style: The function 'angle_obtuse' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:39:0: style: The function 'cotan' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:75:0: style: The function 'gts_vertex_principal_curvatures' is never used. [unusedFunction]
```

[出力結果](https://gist.github.com/hzuika/dfd8c6e40bf4670e21b3148d917ee27d)

* [masterブランチとのdiff](https://gist.github.com/hzuika/5e4a756bb3e35424fc40c33e97fffc15)
* [直前の変更とのdiff](https://gist.github.com/hzuika/db8e240c6f40eadd0eb05a62c6cd7e4c)

---

次は cppcheck で全オプションを有効にします．