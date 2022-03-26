---
title: "#if 0 ディレクティブの削除"
metaTitle: "Freestyle Cleanup 02"
metaDescription: "Freestyleのソースコードをきれいにする"
---

# `#if 0`ディレクティブの削除

Freestyleのソースコードの中には大量の`#if 0`ディレクティブが残されており，コードが読みにくい状態でした．
そのため，これらを削除してみました．

* [masterブランチとのdiff](https://gist.github.com/hzuika/53cce295f6aca8da63ba909e7bf6c8cc)
* [直前の変更とのdiff](https://gist.github.com/hzuika/649f12f9a20b4168ff73e27a99c1ae14)

## `#if BOX_GRID_LOGGING`ディレクティブの削除
`#define BOX_GRID_LOGGING 0`であるため，これも`#if 0`となります．
これはデバッグ出力用のコードのようです．

* [masterブランチとのdiff](https://gist.github.com/hzuika/2c7985c340470bc4928cd64c111fabac)
* [直前の変更とのdiff](https://gist.github.com/hzuika/db512a67f4780d740730978990c91f92)

## `#if SPHERICAL_GRID_LOGGING`ディレクティブの削除
`BOX_GRID_LOGGING`と同様です．

* [masterブランチとのdiff](https://gist.github.com/hzuika/494c9021a124a261d5b329983cddb74b)
* [直前の変更とのdiff](https://gist.github.com/hzuika/7415f15b9a4d6a4113175bcf15e3ffb1)

---

## 備考

現在のVSCode だとcppファイルの`#if 0`ディレクティブの色が変わらなかったため，VSCode Insidersを使用しました．

```txt
code --version
1.65.2
c722ca6c7eed3d7987c0d5c3df5c45f6b15e77d1
x64
```

```txt
code-insiders --version
1.66.0-insider
c63ed49b4b164210301f4f8a09079aa4de53b870
x64
```