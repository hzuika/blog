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
-q で進行状況を無視します．
他にもError等も出力されます(これの消し方はまだわかりません)．
unusedFunctionは最後にまとめて出力されます．

```txt
cppcheck --enable=unusedFunction -q .\source\blender\freestyle\ 2> 出力ファイルパス
```

[出力結果](https://gist.github.com/hzuika/48cbc266a1befddd33e90876bec44540)

出力結果からunusedFunctionだけ抜粋します．また，接頭辞が`BPy_`と`FRS_`の関数はfreestyleディレクトリ以外で使用される可能性がある(外部公開関数)ため，除いています．
また，結果から余分な改行を除き，昇順で並び替えました(VSCodeのソート)．

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

source\blender\freestyle\intern\blender_interface\BlenderFileLoader.cpp:318:0: style: The function 'testDegenerateTriangle' is never used. [unusedFunction]

source\blender\freestyle\intern\geometry\GeomCleaner.cpp:124:0: style: The function 'SortAndCompressIndexedVertexArray' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:45:0: style: The function 'intersect2dSeg2dSeg' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:573:0: style: The function 'includePointTriangle' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:700:0: style: The function 'fromRetinaToCamera' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\GeomUtils.cpp:714:0: style: The function 'fromCameraToWorld' is never used. [unusedFunction]
source\blender\freestyle\intern\geometry\Grid.cpp:301:0: style: The function 'castRayToFindFirstIntersection' is never used. [unusedFunction]

source\blender\freestyle\intern\image\ImagePyramid.cpp:39:0: style: The function 'getLevel' is never used. [unusedFunction]

source\blender\freestyle\intern\scene_graph\NodeCamera.cpp:43:0: style: The function 'setModelViewMatrix' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeGroup.cpp:92:0: style: The function 'RetrieveChildren' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:15:0: style: The function 'Translate' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:22:0: style: The function 'Rotate' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:72:0: style: The function 'Scale' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:81:0: style: The function 'MultiplyMatrix' is never used. [unusedFunction]
source\blender\freestyle\intern\scene_graph\NodeTransform.cpp:87:0: style: The function 'setMatrix' is never used. [unusedFunction]

source\blender\freestyle\intern\stroke\Canvas.cpp:162:0: style: The function 'PushBackStyleModule' is never used. [unusedFunction]

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
source\blender\freestyle\intern\view_map\ViewMap.cpp:411:0: style: The function 'edges_begin' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewMap.cpp:423:0: style: The function 'edges_end' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewMap.cpp:437:0: style: The function 'edges_iterator' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewMap.cpp:468:0: style: The function 'edgesEnd' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewMap.cpp:620:0: style: The function 'ViewEdge_iterator' is never used. [unusedFunction]
source\blender\freestyle\intern\view_map\ViewMapBuilder.cpp:887:0: style: The function 'CullViewEdges' is never used. [unusedFunction]

source\blender\freestyle\intern\winged_edge\Curvature.cpp:132:0: style: The function 'gts_vertex_gaussian_curvature' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:206:0: style: The function 'gts_vertex_principal_directions' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\Curvature.cpp:86:0: style: The function 'gts_vertex_mean_curvature_normal' is never used. [unusedFunction]
source\blender\freestyle\intern\winged_edge\WXEdge.cpp:175:0: style: The function 'ComputeCenter' is never used. [unusedFunction]
```