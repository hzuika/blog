---
title: "viewマップの構築"
metaTitle: "Freestyle Reading Code 03"
metaDescription: "Reading ComputeViewMap function"
---

View Map の構築(`Controller::ComputeViewMap`)は次のような流れになっていました．
`FEdgeXDetector::processShapes` によって， Winged Edge の中で描画するエッジを検出します．
`ViewMapBuilder::BuildViewMap` によって View Map を構築します．

`BuildViewMap` には4つの工程があります．
1. `ViewMapBuilder::computeInitialViewEdges` View Edge の構築
    * `ViewEdgeXBuilder::BuildViewEdges`
        * `ViewEdgeXBuilder::BuildSmoothViewEdge`
1. `ViewMapBuilder::computeCusps` Cusp の検出
1. `ViewMapBuilder::ComputeIntersections` 交差の計算
    * `ViewMapBuilder::ComputeSweepLineIntersections`
1. `ViewMapBuilder::ComputeEdgesVisibility` 可視性の計算
    * `ViewMapBuilder::ComputeCumulativeVisibility`
