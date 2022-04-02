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

[WIP: IME result string in text editor. · hzuika/blender@28010c4](https://github.com/hzuika/blender/commit/28010c40951e93b041ac09dc7af26db3ae717da1)

入力中に `BLI_assert` が出ました．
`UNDO` 系の処理に不具合が発生したようです．
```txt
BLI_assert failed: C:\blender-git\blender\source\blender\blenkernel\intern\undo_system.c:448, BKE_undosys_step_push_init_with_type(), at 'ustack->step_init == ((void *)0)'
```

おそらく `ED_text_undo_push_init` (source\blender\editors\space_text\text_undo.c)で呼び出されたようです．

このエラーの原因は， `WM_IME_COMPOSITE_EVENT` 以外の場合に `OPERATOR_PATH_THROUGH` を返していなかったため，起こりました．
このコミット([Fix: IME result string in text editor. · hzuika/blender@6e9cbc7](https://github.com/hzuika/blender/commit/6e9cbc7da91b61574fb35a0cf0d27eb54d2d0e70))で直りました．
ただし，`text_insert_invoke` 関数内で入力確定のためのEnterキーを押すと， `text_line_break_exec` 関数が実行されて，余分な改行が入ってしまうため，新しく `text_insert_modal` 関数を作って，その中に処理を移す必要があると思いました．

`text_insert_modal` 関数を作成しました．
[IME: modal function in text editor. · hzuika/blender@c82774c](https://github.com/hzuika/blender/commit/c82774cb870e9a24bfd8ba7bca6ed97a81db7b3e)