---
title: "Rustの演算子オーバーロード(四則演算)"
metaTitle: "Learning Rust 04"
metaDescription: ""
---

# Rustの演算子オーバーロード
四則演算(`+-/*`)のオーバーロードを行います．
プリミティブ型のデフォルト値(`0`)で初期化された変数を用意する必要があったため，構造体の定義の前に`#[derive(Default)]`を加えます．

```rs
+#[derive(Default)]
pub struct Float3 {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}
```

`std::ops::Add` トレイトの `add` メソッドを実装します．
ここでは， `Self` 型が `&Float3` になり， `Self::Output` 型が `Float3` になります．
`std::ops::Sub` トレイトの `sub` メソッド， `std::ops::Mul` トレイトの `mul` メソッドも同様に実装します．
```rs
impl std::ops::Add for &Float3 {
    type Output = Float3;
    fn add(self, other: Self) -> Self::Output {
        let mut _result = Self::Output::default();
        for i in 0..3 {
            _result[i] = self[i] + other[i];
        }
        _result
    }
}
```

`std::ops::Div` トレイトの `div` メソッドは ゼロ除算が起きないように事前にチェックします．
```rs
impl std::ops::Div for &Float3 {
    type Output = Float3;
    fn div(self, other: Self) -> Self::Output {
        for i in 0..3 {
            assert_ne!(other[i], 0.0);
        }
        let mut _result = Self::Output::default();
        for i in 0..3 {
            _result[i] = self[i] / other[i];
        }
        _result
    }
}
```

# 必ず失敗するテスト

```rs
#[cfg(test)]
mod tests {
    use crate::*;

    #[test]
    #[should_panic] // 必ず失敗するかどうかテストします．
    fn test_div_zero() {
        let a = Float3 {
            x: 8.0,
            y: 15.0,
            z: 24.0,
        };
        let b = Float3 {
            x: 4.0,
            y: 0.0, // ゼロ除算が起こるようにします．
            z: 6.0,
        };
        let _ = &a / &b;
    }
}
```

# マクロ
似た部分の記述をマクロにします．

```rs
macro_rules! vec_op_impl {
    ($T:ty, $a:expr, $op:tt, $b:expr) => {
        {
            let mut _result = <$T>::default();
            for i in 0..3 {
                _result[i] = $a[i] $op $b[i];
            }
            _result
        }
    }
}

impl std::ops::Add for &Float3 {
    type Output = Float3;
    fn add(self, other: Self) -> Self::Output {
        vec_op_impl!(Self::Output, self, +, other)
    }
}
```

# 複合代入演算子

`+=, -=, *=, /=` については，それぞれ`add_assign`, `sub_assign`, `mul_assign`, `div_assign`が対応します．
マクロを使用して実装します．

```rs
macro_rules! vec_op_impl_self {
    ($a:expr, $op:tt, $b:expr) => {
        for i in 0..3 {
            $a[i] $op $b[i];
        }
    }
}
impl std::ops::AddAssign<&Float3> for Float3 {
    fn add_assign(&mut self, other: &Float3) {
        vec_op_impl_self!(self, +=, other)
    }
}
// SubAssign, MulAssignも同様
impl std::ops::DivAssign<&Float3> for Float3 {
    fn div_assign(&mut self, other: &Float3) {
        for i in 0..3 {
            assert_ne!(other[i], 0.0);
        }
        vec_op_impl_self!(self, /=, other)
    }
}
```

# 単項演算子

`-a` の演算子を定義します．

```rs
impl std::ops::Neg for &Float3 {
    type Output = Float3;
    fn neg(self) -> Self::Output {
        let mut _result = Self::Output::default();
        for i in 0..3 {
            _result[i] = -self[i];
        }
        _result
    }
}
```

# スカラーとの二項演算子

## 右辺がスカラー

```rs
macro_rules! vec_op_impl_scalar {
    ($T:ty, $a:expr, $op:tt, $b:expr) => {
        {
            let mut _result = <$T>::default();
            for i in 0..3 {
                _result[i] = $a[i] $op $b;
            }
            _result
        }
    }
}

impl Add<f32> for &Float3 {
    type Output = Float3;
    fn add(self, other: f32) -> Self::Output {
        vec_op_impl_scalar!(Self::Output, self, +, other)
    }
}
```

## 左辺がスカラー

```rs
macro_rules! vec_op_impl_scalar_lhs {
    ($T:ty, $a:expr, $op:tt, $b:expr) => {
        {
            let mut _result = <$T>::default();
            for i in 0..3 {
                _result[i] = $a $op $b[i];
            }
            _result
        }
    }
}

impl Add<&Float3> for f32 {
    type Output = Float3;
    fn add(self, other: &Float3) -> Self::Output {
        vec_op_impl_scalar_lhs!(Self::Output, self, +, other)
    }
}
```

# マクロでさらにまとめる

## 二項演算子

`ベクトル+ベクトル`と`ベクトル+スカラー`，`スカラー+ベクトル`のマクロを一か所にまとめます．

```rs
macro_rules! vec_op_impl {
    ($T:ty, $a:ident[i] $op:tt $b:ident[i]) => {
        {
            let mut _result = <$T>::default();
            for i in 0..3 {
                _result[i] = $a[i] $op $b[i];
            }
            _result
        }
    };
    ($T:ty, $a:ident[i] $op:tt $b:ident) => {
        {
            let mut _result = <$T>::default();
            for i in 0..3 {
                _result[i] = $a[i] $op $b;
            }
            _result
        }
    };
    ($T:ty, $a:ident $op:tt $b:ident[i]) => {
        {
            let mut _result = <$T>::default();
            for i in 0..3 {
                _result[i] = $a $op $b[i];
            }
            _result
        }
    };
}

impl Add for &Float3 {
    type Output = Float3;
    fn add(self, other: Self) -> Self::Output {
        vec_op_impl!(Self::Output, self[i] + other[i])
    }
}
impl Add<f32> for &Float3 {
    type Output = Float3;
    fn add(self, other: f32) -> Self::Output {
        vec_op_impl!(Self::Output, self[i] + other)
    }
}
impl Add<&Float3> for f32 {
    type Output = Float3;
    fn add(self, other: &Float3) -> Self::Output {
        vec_op_impl!(Self::Output, self + other[i])
    }
}
```

## 複合代入演算子
`ベクトル+=ベクトル`と`ベクトル+=スカラー`のマクロをまとめます．

```rs
macro_rules! vec_op_impl_self {
    ($a:ident[i] $op:tt $b:ident[i]) => {
        for i in 0..3 {
            $a[i] $op $b[i];
        }
    };
    ($a:ident[i] $op:tt $b:ident) => {
        for i in 0..3 {
            $a[i] $op $b;
        }
    };
}
impl AddAssign<&Float3> for Float3 {
    fn add_assign(&mut self, other: &Float3) {
        vec_op_impl_self!(self[i] += other[i])
    }
}
impl AddAssign<f32> for Float3 {
    fn add_assign(&mut self, other: f32) {
        vec_op_impl_self!(self[i] += other)
    }
}
```