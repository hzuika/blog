---
title: "Rustのジェネリクス"
metaTitle: "Learning Rust 07"
metaDescription: ""
---

`Float3` 構造体から型`T`のジェネリクスを使用した`VecBase3<T>`構造体に置き換えます．

# 定義

```rs
#[derive(Default, Debug, PartialEq)]
pub struct VecBase3<T> {
    pub x: T,
    pub y: T,
    pub z: T,
}

type Float3 = VecBase3<f32>;
```

# コンストラクタ

```rs
impl<T> VecBase3<T> {
    pub fn new(x: T, y: T, z: T) -> Self {
        Self { x, y, z }
    }
}
```

# スライスへの変換

```rs
impl<T> VecBase3<T> {
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
impl<T> Index<usize> for VecBase3<T> {
    type Output = T;
    fn index(&self, index: usize) -> &Self::Output {
        &self.as_slice()[index]
    }
}

impl<T> IndexMut<usize> for VecBase3<T> {
    fn index_mut(&mut self, index: usize) -> &mut Self::Output {
        &mut self.as_slice_mut()[index]
    }
}
```

# ジェネリック境界

## Neg 演算子 (単項演算子 - )
四則演算のオーバーロードはジェネリックをそのまま適用することはできない．
単項演算子の `Neg` (`-`)の場合， `default` が呼べない．
```rs
let mut _result = Self::Output::default();
                                ^^^^^^^ function or associated item cannot be called on `VecBase3<T>` due to unsatisfied trait bounds
```
構造体の初期化に変更する．
(これまでは，`default`で初期化した後，for文で各値を変更していたが，RustではC++のようなテンプレートの特殊化ができない．二次元，四次元ベクトルの実装も適宜同じように書いていくことにする．)
```rs
        Self::Output {
            x: -self.x,
            y: -self.y,
            z: -self.z,
        }
```

今度は， `T` 型に単項演算子 `-` を適用できない．
```rs
81 |             x: -self.x,
   |                ^^^^^^^ cannot apply unary operator `-`
error[E0600]: cannot apply unary operator `-` to type `T`
```

型にジェネリック境界を加える．これで `T` 型は `Neg` が実装されているものに限定される．
```rs
impl<T: Neg<Output = T>> Neg for &VecBase3<T> {
```

`Copy` トレイトが実装されていないため，エラーになる．

```rs
error[E0507]: cannot move out of `self.x` which is behind a shared reference
  --> src\lib.rs:81:17
   |
81 |             x: -self.x,
   |                 ^^^^^^ move occurs because `self.x` has type `T`, which does not implement the `Copy` trait
```

これで，上手くいく．
```rs
impl<T: Neg<Output = T> + Copy> Neg for &VecBase3<T> {
    type Output = VecBase3<T>;
    fn neg(self) -> Self::Output {
        Self::Output {
            x: -self.x,
            y: -self.y,
            z: -self.z,
        }
    }
}
```

## Add 演算子
`Neg` 演算子と同様に，ジェネリック境界を設定する．

```rs
impl<T: Add<Output = T> + Copy> Add for &VecBase3<T> {
    type Output = VecBase3<T>;
    fn add(self, other: Self) -> Self::Output {
        Self::Output {
            x: self.x + other.x,
            y: self.y + other.y,
            z: self.z + other.z,
        }
    }
}
```

## マクロを使う

四則演算は全て似たような処理を行うため，マクロを使いたい．