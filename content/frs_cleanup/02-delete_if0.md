---
title: "#if 0 ディレクティブの削除"
metaTitle: "Freestyle Cleanup 02"
metaDescription: "Freestyleのソースコードをきれいにする"
---

# `#if 0`ディレクティブの削除

Freestyleのソースコードの中には大量の`#if 0`ディレクティブが残されており，コードが読みにくい状態でした．
そのため，これらを削除してみました．

* [masterブランチとのdiff](https://gist.github.com/hzuika/53cce295f6aca8da63ba909e7bf6c8cc)
* [path削除からのdiff](https://gist.github.com/hzuika/649f12f9a20b4168ff73e27a99c1ae14)

---

## 備考

現在のVSCode だと`#if 0`ディレクティブのcppファイルの色が変わらなかったため，VSCode Insidersを使用しました．

```txt
code --version
1.65.2
c722ca6c7eed3d7987c0d5c3df5c45f6b15e77d1
x64
```

```txt
code --version
1.65.2
c722ca6c7eed3d7987c0d5c3df5c45f6b15e77d1
x64
```