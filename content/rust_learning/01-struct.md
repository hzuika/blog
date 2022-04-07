---
title: "Rustの構造体とテストコード"
metaTitle: "Learning Rust 01"
metaDescription: ""
---

# 構造体の定義

lib.rs に`f32` 型の3次元ベクトル構造体 `Float3` を作ります．
```rust
pub struct Float3 {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}
```

構造体に `pub` をつけない場合，未使用だと警告が出ます．
```txt
warning: struct is never constructed: `Float3`
```
構造体のメンバに `pub` をつけない場合，未使用だと警告が出ます．
```txt
warning: field is never read: `x`
```

# テスト
デフォルトのテストコードを書き換えます．
ソースコードのフォーマットのために rustfmt を使用して， `cargo fmt` を実行しておきます．
```rust
#[cfg(test)]
mod tests {
    use crate::Float3;

    #[test]
    fn test_float3() {
        let result = Float3 {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        assert_eq!(result.x, 1.0);
        assert_eq!(result.y, 2.0);
        assert_eq!(result.z, 3.0);
    }
}

```

`use crate::Float3` で先ほど定義した構造体をインポートしないと，コンパイラは `Float3` を認識できません．
```txt
error[E0422]: cannot find struct, variant or union type `Float3` in this scope
```

構造体のメンバの定義は `名前: 型` でしたが，構造体のインスタンスを作成するためには， `名前: 値` と書きます．

`assert_eq!` マクロを使用して，第一引数と第二引数が等しいかテストします．

`cargo test` を実行して，テストが通過することを確認します．