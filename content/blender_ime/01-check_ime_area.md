---
title: "エリアごとのIMEの有効/無効"
metaTitle: "Enable and Disable IME in each area"
metaDescription: ""
---

# IME有効エリアの検出

IMEは文字入力できるエリアでのみ有効にする必要があります．
未実装で，IMEを有効にするべきEditor Typeは，次の三つです．
* 3D Viewport のうち，テキストオブジェクトの編集モード
* Text Editor
* Python Console

IMEの有効と無効の切り替えタイミングは次の通りです．
* マウスカーソルの移動によるエリア変更
  * 下記の `printf` デバッグによって，ここだけでカバーできることがわかりました．
  * `MOUSEMOVE` のはずなのに，マウスを接続せずに Tab キーや Shift + F5 で編集モードやエリアを変えても動きました (?)
* エリアのEditor Typeの変更
* 編集モードへの切り替え(テキストオブジェクトのみ)

または，キー入力時にエリアのEditor Typeを取得して，IMEで処理するかどうかを決める方法も考えられます．

## マウスカーソルの移動によるエリア変更

マウスカーソルが移動するイベントは `wm_event_do_handlers` (source\blender\windowmanager\intern\wm_event_system.c)で処理されます．

```cpp
+// この辺にグローバル変数を置いておきます．
+int check_count = 0;
void wm_event_do_handlers(bContext *C)
{
  LISTBASE_FOREACH (wmWindow *, win, &wm->windows) {
    // 各ウィンドウの処理

    wmEvent *event;
    // queue にある event を一つずつ処理
    while ((event = win->event_queue.first)) {

      /* We let modal handlers get active area/region, also wm_paintcursor_test needs it. */
      // event のマウス位置にある area と region を bContext に設定
      CTX_wm_area_set(C, area_event_inside(C, event->xy));
      CTX_wm_region_set(C, region_event_inside(C, event->xy));

      // region から見たマウスの相対座標を event の中に格納
      wm_region_mouse_co(C, event);

      if ((action & WM_HANDLER_BREAK) == 0) {
        if (event->type == MOUSEMOVE) {
+         // このようにするとエリアがチェックできます．
+         ScrArea *check_area = area_event_inside(C, event->xy);
+         if (check_area != NULL) {
+           switch (check_area->spacetype) {
+             case SPACE_VIEW3D: {
+               ViewLayer *check_view_layer = WM_window_get_active_view_layer(win);
+               Object *check_object = OBEDIT_FROM_VIEW_LAYER(check_view_layer);
+               if (check_object == NULL || check_object->type != OB_FONT) {
+                 break;
+               }
+             }
+             case SPACE_TEXT:
+             case SPACE_CONSOLE:
+               // check_count は変化が分かりやすいようにグローバル変数を宣言しておいて，インクリメントさせています．
+               printf("IME Enabled Area, %d\n", check_count++);
+             default:
+               break;
+           }
+         }
          /* State variables in screen, cursors.
           * Also used in `wm_draw.c`, fails for modal handlers though. */
          // Active screen の `ARegion *active_region` をマウス座標から設定
          ED_screen_set_active_region(C, win, event->xy);
        }

        // screen の各 `ScrArea *area` について処理
        ED_screen_areas_iter (win, screen, area) {
          // event のマウス座標が含まれる area で処理
          if (wm_event_inside_rect(event, &area->totrct)) {
            // bContext に area を設定
            CTX_wm_area_set(C, area);

            // ScrArea の各 ARegion に関して処理
            // bContext の region が毎回更新される
            action |= wm_event_do_handlers_area_regions(C, event, area);

            // bContext の region を NULL に設定
            CTX_wm_region_set(C, NULL);

            if ((action & WM_HANDLER_BREAK) == 0) {
              // region から見たマウスの相対座標を event->mval の中に格納
              // ただし，先ほど region は NULL に設定されたため， -1 になる．
              wm_region_mouse_co(C, event); /* Only invalidates `event->mval` in this case. */
              action |= wm_handlers_do(C, event, &area->handlers);
            }
            // bContext を area を NULL に設定
            CTX_wm_area_set(C, NULL);
          }
        }

        if ((action & WM_HANDLER_BREAK) == 0) {
          /* Also some non-modal handlers need active area/region. */
          CTX_wm_area_set(C, area_event_inside(C, event->xy));
          CTX_wm_region_set(C, region_event_inside(C, event->xy));

          wm_region_mouse_co(C, event);

          action |= wm_handlers_do(C, event, &win->handlers);
        }
      }

      /* Update previous mouse position for following events to use. */
      // 次のイベントで使用するためにマウスの座標を保存する
      copy_v2_v2_int(win->eventstate->prev_xy, event->xy);

      // queue から現在の event を取り除く
      BLI_remlink(&win->event_queue, event);
    }
  }
}
```

## 編集モードかどうかチェックする．

編集モードとオブジェクトモードでカーソルを変更する関数から，編集モードかどうかチェックする部分の実装がわかります．
`ViewLayer` を取得して `OBEDIT_FROM_VIEW_LAYER` マクロを実行するとよいみたいです．
```cpp
// source\blender\editors\space_view3d\space_view3d.c
static void view3d_main_region_cursor(wmWindow *win, ScrArea *area, ARegion *region)
{
  if (WM_cursor_set_from_tool(win, area, region)) {
    return;
  }

  ViewLayer *view_layer = WM_window_get_active_view_layer(win);
  Object *obedit = OBEDIT_FROM_VIEW_LAYER(view_layer);
  if (obedit) {
    WM_cursor_set(win, WM_CURSOR_EDIT);
  }
  else {
    WM_cursor_set(win, WM_CURSOR_DEFAULT);
  }
}
```

# UIのテキストボタンで編集中かどうか調べる．

テキストボタン編集中は次が `false` になるため，チェックする必要がない．
```cpp
      if ((action & WM_HANDLER_BREAK) == 0) {
        // ここでテキストボタンの編集に関係なくエリアのチェックができる．
      }
```

---

失敗記録: `ARegion*` から `uiBut*` を求める関数 `ui_region_find_active_but` が interface_intern.h 内で定義されているため，window manager 内で使用できない．
```cpp
// source\blender\windowmanager\intern\wm_event_system.c
          ARegion *check_region = region_event_inside(C, event->xy);
          uiBut *but = ui_region_find_active_but(region);
          if (but != NULL) {
            if (but->active && but->active == BUTTON_STATE_HIGHLIGHT) {
              if (but->type) {
                switch (but->type) {
                  case UI_BTYPE_TEXT:
                  case UI_BTYPE_SEARCH_MENU:
                  printf("IME Enabled area, %d\n", check_count++);
                  break;
                }
              }
            }
          }
```

---

ボタンの種類
* テキストボタン: UI_BTYPE_TEXT
* 検索メニュー: UI_BTYPE_SEARCH_MENU

```cpp
// source\blender\editors\interface\interface_handlers.c
static int ui_do_button(bContext *C, uiBlock *block, uiBut *but, const wmEvent *event)
{
  switch (but->type) {
    case UI_BTYPE_TEXT:
    case UI_BTYPE_SEARCH_MENU:
      if ((but->type == UI_BTYPE_SEARCH_MENU) && (but->flag & UI_BUT_VALUE_CLEAR)) {
        retval = ui_do_but_SEARCH_UNLINK(C, block, but, data, event);
        if (retval & WM_UI_HANDLER_BREAK) {
          break;
        }
      }
      retval = ui_do_but_TEX(C, block, but, data, event);
      break;
  }
}

static int ui_handle_button_event(bContext *C, const wmEvent *event, uiBut *but)
{
  uiHandleButtonData *data = but->active;
  if (data->state == BUTTON_STATE_HIGHLIGHT) {
    retval = ui_do_button(C, block, but, event);
  }
}

static int ui_region_handler(bContext *C, const wmEvent *event, void *UNUSED(userdata))
{
  ARegion *region = CTX_wm_region(C);
  uiBut *but = ui_region_find_active_but(region);
  if (retval == WM_UI_HANDLER_CONTINUE) {
    if (but) {
      retval = ui_handle_button_event(C, event, but);
    }
  }
}
```

# エリアごとにIMEを有効/無効にする
エリアをチェックしてIMEを有効にしたり無効にしたりします．
ただし，IME有効/無効にする関数 `wm_window_IME_begin` / `wm_window_IME_end` は今後修正する必要があります．
(特に，`ime_data` を持っていなくてもとりあえず無効にできる必要があります．)

[IME: Enable/Disable IME by area. · hzuika/blender@908b08d](https://github.com/hzuika/blender/commit/908b08de35ad731b9bffdce6f90cd02e3fc5a5dc)

---

# 備考

## Editor Type (`eSpace_Type`)

`ScrArea.spacetype` (source\blender\makesdna\DNA_space_types.h)

|Editor Type| `eSpace_Type` |
|-|-|
|3D Viewport| `SPACE_VIEW3D` |
|Text Editor| `SPACE_TEXT` |
|Python Console| `SPACE_CONSOLE` |