---
title: "Rustの演算子オーバーロード(インデックス)"
metaTitle: "Learning Rust 03"
metaDescription: ""
---

# Rustの演算子オーバーロード
インデックス演算子(`[]`)をオーバーロードして，配列のように構造体にアクセスできるようにします．

## スライスを返す関数の作成
その前に，構造体からスライスを返す関数を作成します．
`from_raw_parts` 関数を使用して，構造体をポインタに変換して，スライスに変換します．
ポインタへの変換があるため， `unsafe` です．

参考: [rust - Is it legal to cast a struct to an array? - Stack Overflow](https://stackoverflow.com/questions/62240126/is-it-legal-to-cast-a-struct-to-an-array)

```rust
impl Float3 {
    fn as_slice(&self) -> &[f32] {
        unsafe { std::slice::from_raw_parts(self as *const Self as *const f32, 3) }
    }

    fn as_slice_mut(&mut self) -> &mut [f32] {
        unsafe { std::slice::from_raw_parts_mut(self as *mut Self as *mut f32, 3) }
    }
}
```

## インデックス演算子のオーバーロード
先ほどのスライスを作成する関数を使用して，インデックス演算子をオーバーロードします．

```rust
impl std::ops::Index<usize> for Float3 {
    type Output = f32;
    fn index(&self, index: usize) -> &Self::Output {
        &self.as_slice()[index]
    }
}

impl std::ops::IndexMut<usize> for Float3 {
    fn index_mut(&mut self, index: usize) -> &mut Self::Output {
        &mut self.as_slice_mut()[index]
    }
}
```

# テスト

```rust
#[cfg(test)]
mod tests {
    use crate::*;

    #[test]
    fn test_as_slice() {
        let a = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        let b = a.as_slice();
        assert_eq!(b[0], 1.0);
        assert_eq!(b[1], 2.0);
        assert_eq!(b[2], 3.0);
    }

    #[test]
    fn test_as_slice_mut() {
        let mut a = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        let b = a.as_slice_mut();
        b[0] = 4.0;
        b[1] = 5.0;
        b[2] = 6.0;
        assert_eq!(a.x, 4.0);
        assert_eq!(a.y, 5.0);
        assert_eq!(a.z, 6.0);
    }

    #[test]
    fn test_index() {
        let a = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        assert_eq!(a[0], 1.0);
        assert_eq!(a[1], 2.0);
        assert_eq!(a[2], 3.0);
    }

    #[test]
    fn test_index_mut() {
        let mut a = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        a[0] = 4.0;
        a[1] = 5.0;
        a[2] = 6.0;
        assert_eq!(a.x, 4.0);
        assert_eq!(a.y, 5.0);
        assert_eq!(a.z, 6.0);
    }
}
```