---
title: "Rustの関数"
metaTitle: "Learning Rust 02"
metaDescription: ""
---

# 関数の定義

3次元ベクトルの外積を計算する関数 `cross` を定義します．
`Float3` の参照 `&Float3` を二つ引数に取って `Float3` (関数の最後に書かれた式) を返します．
外積の計算は定義どおりです．
```rust
pub fn cross(a: &Float3, b: &Float3) -> Float3 {
    Float3 {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x,
    }
}
```

# テスト
`cross` 関数を使用するために `use crate::cross;` の代わりにワイルドカード `use crate::*;` を使用して，`Float3`と`cross`がどちらもインポートされるようにします．

```rust
#[cfg(test)]
mod tests {
+   use crate::*;
-   use crate::Float3;

+   #[test]
+   fn test_cross() {
+       let a = Float3 {
+           x: 1.0,
+           y: 2.0,
+           z: 3.0,
+       };
+       let b = Float3 {
+           x: 4.0,
+           y: 5.0,
+           z: 6.0,
+       };
+       let c = cross(&a, &b);
+       assert_eq!(c.x, -3.0);
+       assert_eq!(c.y, 6.0);
+       assert_eq!(c.z, -3.0);
+   }
}
```