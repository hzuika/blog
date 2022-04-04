---
title: "Rustのジェネリクス"
metaTitle: "Learning Rust 07"
metaDescription: ""
---

`Float3` 構造体から型`T`のジェネリクスを使用した`VecBase<T>`構造体に置き換えます．

# 定義

```rs
#[derive(Default, Debug, PartialEq)]
pub struct VecBase<T> {
    pub x: T,
    pub y: T,
    pub z: T,
}

type Float3 = VecBase<f32>;
```

# コンストラクタ

```rs
impl<T> VecBase<T> {
    pub fn new(x: T, y: T, z: T) -> Self {
        Self { x, y, z }
    }
}
```

# スライスへの変換

```rs
impl<T> VecBase<T> {
    fn as_slice(&self) -> &[T] {
        unsafe { std::slice::from_raw_parts(self as *const Self as *const T, 3) }
    }

    fn as_slice_mut(&mut self) -> &mut [T] {
        unsafe { std::slice::from_raw_parts_mut(self as *mut Self as *mut T, 3) }
    }
}
```

# インデックス演算子

```rs
impl<T> Index<usize> for VecBase<T> {
    type Output = T;
    fn index(&self, index: usize) -> &Self::Output {
        &self.as_slice()[index]
    }
}

impl<T> IndexMut<usize> for VecBase<T> {
    fn index_mut(&mut self, index: usize) -> &mut Self::Output {
        &mut self.as_slice_mut()[index]
    }
}
```