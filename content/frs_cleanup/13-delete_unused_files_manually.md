---
title: "未使用のファイルを調べて削除する．"
metaTitle: "Freestyle Cleanup 13"
metaDescription: "delete unused files manually"
---

source\blender\freestyle\intern\application\Controller.cpp で include されているヘッダーファイルを確認して，未使用のファイルを削除しました．

```bash
git diff --name-status fork/frs_cleanup
M       source/blender/freestyle/CMakeLists.txt
M       source/blender/freestyle/intern/application/Controller.cpp
D       source/blender/freestyle/intern/scene_graph/ScenePrettyPrinter.cpp    
D       source/blender/freestyle/intern/scene_graph/ScenePrettyPrinter.h      
D       source/blender/freestyle/intern/stroke/PSStrokeRenderer.cpp
D       source/blender/freestyle/intern/stroke/PSStrokeRenderer.h
D       source/blender/freestyle/intern/stroke/StrokeTesselator.cpp
D       source/blender/freestyle/intern/stroke/StrokeTesselator.h
D       source/blender/freestyle/intern/stroke/TextStrokeRenderer.cpp
D       source/blender/freestyle/intern/stroke/TextStrokeRenderer.h
D       source/blender/freestyle/intern/view_map/ViewMapTesselator.cpp        
D       source/blender/freestyle/intern/view_map/ViewMapTesselator.h
```

# diff
* [masterブランチとのdiff](https://gist.github.com/hzuika/5d81205eaffdec0006c4da8a15e118b0)
* [直前の変更とのdiff](https://gist.github.com/hzuika/be2760002a19dad31c319f0a15fbe4b2)