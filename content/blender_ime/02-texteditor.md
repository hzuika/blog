---
title: "テキストエディタのIME入力実装"
metaTitle: "IME suport on text editor"
metaDescription: ""
---

# IMEの有効化

[Text Editor: Enable IME in text editor area. · hzuika/blender@72d5cc3](https://github.com/hzuika/blender/commit/72d5cc3ff3d070a6932a60aa1862615ca0120375)

`wm_window_IME_begin` と `wm_window_IME_end` は要改善です．

# \[WIP\] IMEの変換結果の取得

英語入力の場合は， `text_insert_invoke` で `wmEvent` から文字を受け取り， `wmOperator.ptr` に格納して， `text_insert_exec` で取り出して，挿入処理を行っています．
IMEの場合も， `text_insert_invoke` で `wmOperator.ptr` に入れてみました．

[WIP: IME result string in text editor. · hzuika/blender@c9e7fed](https://github.com/hzuika/blender/commit/c9e7fed03bbee63a3957f2b1fa54650e21b90ead)

入力中に `BLI_assert` が出ました．
`UNDO` 系の処理に不具合が発生したようです．
```txt
BLI_assert failed: C:\blender-git\blender\source\blender\blenkernel\intern\undo_system.c:448, BKE_undosys_step_push_init_with_type(), at 'ustack->step_init == ((void *)0)'
```