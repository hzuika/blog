---
title: "Rustの比較"
metaTitle: "Learning Rust 05"
metaDescription: ""
---

# 比較できるようにする．
`PartialEq` で等しいかどうかの比較が可能になります． `f32` 型を使用しているため， `Eq` ではなく， `PartialEq` になります．
また， `assert_eq!` マクロで使用するために， `Debug` を加えます．
```rust
#[derive(Default, Debug, PartialEq)]
pub struct Float3 {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}
```

# テスト
```rust
#[cfg(test)]
mod tests {
    use crate::*;

    #[test]
    fn test_partialeq() {
        let a = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        let b = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        assert_eq!(a, b);
        assert!(a == b);
    }
}
```