---
title: "Rustのコンストラクタ(new スタティックメソッド)"
metaTitle: "Learning Rust 06"
metaDescription: ""
---

コンストラクタはないので，代わりにスタティックメソッド `new` を定義します．
フィールド名と変数名が一致する場合，構造体のインスタンス生成時にフィールド名は省略できます．
```rust
impl Float3 {
    pub fn new(x: f32, y: f32, z: f32) -> Self {
        Self { x, y, z } // x:x ではなく， xで構わない
    }
}
```

# テスト

```rust
#[cfg(test)]
mod tests {
    use crate::*;

    #[test]
    fn test_new() {
        let a = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        let b = Float3::new(1.0, 2.0, 3.0);
        assert_eq!(a.x, b.x);
        assert_eq!(a.y, b.y);
        assert_eq!(a.z, b.z);
    }
}
```

# その他のコンストラクタ

```rust
macro_rules! new_scalar_internal {
    ($T:ty, $val:expr) => {
        {
            let mut _result = <$T>::default();
            for i in 0..3 {
                _result[i] = $val as f32;
            }
            _result
        }
    };
}
impl Float3 {
    pub fn new_scalar_u32(value: u32) -> Self {
        new_scalar_internal!(Float3, value)
    }

    pub fn new_scalar_i32(value: i32) -> Self {
        new_scalar_internal!(Float3, value)
    }

    pub fn new_scalar_f32(value: f32) -> Self {
        new_scalar_internal!(Float3, value)
    }

    pub fn new_scalar_f64(value: f64) -> Self {
        new_scalar_internal!(Float3, value)
    }
}
```