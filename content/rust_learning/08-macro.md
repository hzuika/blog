---
title: "Rustのマクロ"
metaTitle: "Learning Rust 08"
metaDescription: ""
---

全てにマッチするマクロ．
```rs
macro_rules! match_all_macro {
    ($($t:tt)*) => {};
}
```