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