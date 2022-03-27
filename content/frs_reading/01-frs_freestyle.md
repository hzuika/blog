---
title: "FRS_freestyle.hを読む"
metaTitle: "Freestyle Reading Code 01"
metaDescription: "Reading FRS_freestyle.h"
---

[FRS_freestyle.h](https://github.com/hzuika/blender/blob/frs_cleanup/source/blender/freestyle/FRS_freestyle.h) は source\blender\freestyle\ ディレクトリに存在しているヘッダーファイルです．
ファイル名の先頭が 「大文字3文字\_ (今回は FRS\_ )」のファイル内の「大文字3文字\_ (今回は `FRS_` )」の関数が他のディレクトリで使用されます．
FRS_freestyle.hで定義されている関数は次の通りです．

# 初期化 
source\creator\creator.c で呼び出されます．

* `FRS_init` 
    * グローバル変数の `Controller` クラスと `AppView` クラスのインスタンスを生成します．
    * このインスタンスのメソッドを使って，Freestyleの線の描画をしていきます．
* `FRS_set_context` 
    * `Controller` クラスに `bContext` 構造体のポインタを格納します．
    * (`bContext` はBlenderの現在の状態を格納している構造体です．)

# レンダリング関係 
source\blender\render\intern\pipeline.c で呼び出されます．

* `FRS_init_stroke_renderer`
    * Freestyleのレンダリング開始時に実行されます．
    * 内部で呼び出す `init_view` 関数は `Render` 構造体からレンダリング設定の情報を取得して，グローバル変数の `g_freeestyle` や `view` に格納します．
* `FRS_begin_stroke_rendering`
    * この関数は何もしません．
* `FRS_is_freestyle_enabled`
    * freestyleが有効になっているかどうかを返します．
* `FRS_do_stroke_rendering`
    1. `RenderMonitor` クラスのインスタンスを生成して，グローバル変数の `controller` に格納します．
    1. カメラの情報を取得します．
    1. `prepare` 関数を実行します．
        1. メッシュを読み込みます．
        1. スタイルモジュールを追加します．
        1. パラメータを設定します．
        1. ビューマップを計算します．
    1. 線を描画します．
    1. 描画結果を格納します．
* `FRS_end_stroke_rendering` 
    * レンダリングするために一時的に作成したデータを削除します．
* `FRS_exit`
    * `FRS_init`で生成したインスタンスを削除します．

# 描画オプション 
source\blender\makesrna\intern\rna_scene.c で呼び出されます．

* `FRS_free_view_map_cache`

# ラインセット(線の設定) 
source\blender\editors\render\render_shading.cc で呼び出されます．

* `FRS_copy_active_lineset`
* `FRS_paste_active_lineset`
* `FRS_delete_active_lineset`
* `FRS_move_active_lineset`
* `FRS_create_stroke_material`

また，このヘッダーファイルでは，freestyleディレクトリ内部で使用される構造体 `FreestyleGlobals` のグローバル変数 `g_freestyle` の宣言も行われています．