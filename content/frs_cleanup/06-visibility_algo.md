---
title: "VisibilityAlgoのうち使用されていない部分を削除する"
metaTitle: "Freestyle Cleanup 06"
metaDescription: "delete VisibilityAlgo"
---

可視性を計算するアルゴリズムは二種類のみ使用され，残りは使用されないようなので，削除してしまいます．

## `ray_casting_culled_adaptive_cumulative`と`ray_casting_adaptive_cumulative`のみが使用されます．

`prepare`関数内の`setVisibilityAlgo`によって，`_VisibilityAlgo`は`FREESTYLE_ALGO_CULLED_ADAPTIVE_CUMULATIVE`(`ray_casting_culled_adaptive_cumulative`)か`FREESTYLE_ALGO_ADAPTIVE_CUMULATIVE`(`ray_casting_adaptive_cumulative`)に設定されます．
そのあと，`_VisibilityAlgo`を使用する唯一の関数`ComputeViewMap`が実行されます．
\source\blender\freestyle\intern\blender_interface\FRS_freestyle.cpp
```cpp
static void prepare(Render *re, ViewLayer *view_layer, Depsgraph *depsgraph)
{
  /* ... */
  controller->setVisibilityAlgo((config->flags & FREESTYLE_CULLING) ?
                                    FREESTYLE_ALGO_CULLED_ADAPTIVE_CUMULATIVE :
                                    FREESTYLE_ALGO_ADAPTIVE_CUMULATIVE);

  /* ... */
  controller->ComputeViewMap();
}
```

```cpp
void Controller::ComputeViewMap()
{
  /* ... */
  _ViewMap = vmBuilder.BuildViewMap(
      *_winged_edge, _VisibilityAlgo, _EPSILON, _Scene3dBBox, _SceneNumFaces);
  /* ... */
}

ViewMap *ViewMapBuilder::BuildViewMap(WingedEdge &we,
                                      visibility_algo iAlgo,
                                      real epsilon,
                                      const BBox<Vec3r> &bbox,
                                      unsigned int sceneNumFaces)
{
  /* ... */
  // Compute visibility
  ComputeEdgesVisibility(_ViewMap, we, bbox, sceneNumFaces, iAlgo, epsilon);
  /* ... */
}
```

## `ray_casting`は使われません．

`ComputeEdgesVisibility()`の`iAlgo`のデフォルト引数が`ray_casting`ですが，関数使用時に引数が渡されるため，`ray_casting`は使用されません．

C:\blender-git\blender\source\blender\freestyle\intern\view_map\ViewMapBuilder.h
```cpp
  void ComputeEdgesVisibility(ViewMap *ioViewMap,
                              WingedEdge &we,
                              const BBox<Vec3r> &bbox,
                              unsigned int sceneNumFaces,
                              visibility_algo iAlgo = ray_casting,
                              real epsilon = 1.0e-6);
```

## `ray_casting_adaptive_traditional`は使われません．

`Controller`のコンストラクタでは`_VisibilityAlgo`は`ray_casting_adaptive_traditional`に設定されますが，コンストラクタは`FRS_init`で呼ばれ，そのあと，`prepare`で`_VisibilityAlgo`が変更されるため，`ray_casting_adaptive_traditional`は使用されません．

\source\blender\freestyle\intern\blender_interface\FRS_freestyle.cpp
```cpp
Controller::Controller()
{
  /* ... */
  _VisibilityAlgo = ViewMapBuilder::ray_casting_adaptive_traditional;
```

`Controller`のコンストラクタは`FRS_init`でのみ呼ばれます．

\source\blender\freestyle\intern\blender_interface\FRS_freestyle.cpp
```cpp
void FRS_init()
{
  /* ... */
  controller = new Controller();
```

---

# 関係のある変数や関数

* 未使用
    * `FREESTYLE_ALGO_REGULAR`
        * `ray_casting`
        * `ComputeRayCastingVisibility`
            * `ComputeRayCastingVisibility`
        * デフォルト引数
    * `FREESTYLE_ALGO_FAST`
        * `ray_casting_fast`
        * `ComputeFastRayCastingVisibility`
            * `ComputeRayCastingVisibility`
    * `FREESTYLE_ALGO_VERYFAST`
        * `ray_casting_very_fast`
        * `ComputeVeryFastRayCastingVisibility`
            * `ComputeRayCastingVisibility`
    * `FREESTYLE_ALGO_CULLED_ADAPTIVE_TRADITIONAL`
        * `ray_casting_culled_adaptive_traditional`
        * `ComputeDetailedVisibility`
            * `computeDetailedVisibility<BoxGrid, BoxGrid::Iterator>`
                * `computeVisibility<G, I>`
    * `FREESTYLE_ALGO_ADAPTIVE_TRADITIONAL`
        * `ray_casting_adaptive_traditional`
        * `ComputeDetailedVisibility`
        * コンストラクタで設定
* 使用
    * `FREESTYLE_ALGO_CULLED_ADAPTIVE_CUMULATIVE`
        * `ray_casting_culled_adaptive_cumulative`
        * `ComputeCumulativeVisibility`
        * カリングあり
    * `FREESTYLE_ALGO_ADAPTIVE_CUMULATIVE`
        * `ray_casting_adaptive_cumulative`
        * `ComputeCumulativeVisibility`
        * カリングなし
    * `_VisibilityAlgo`
    * `ComputeEdgesVisibility`
    * `setVisibilityAlgo`

# diff

* [masterブランチとのdiff](https://gist.github.com/hzuika/129959edf92219a04197f702aa0c8300)
* [直前の変更とのdiff](https://gist.github.com/hzuika/5612b12ff3990ad510c2567486443da8)