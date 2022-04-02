---
title: "Rustの学習"
metaTitle: "Learning Rust"
metaDescription: ""
---

Rustの学習記録です．

久しぶりに使用するので， `rustup` を更新しました．
```txt
rustup update
```

`cargo` を使用して，数学のベクトルライブラリ(名前は rust_vec )みたいなものを作りたいと思います．
```txt
cargo new rust_vec --lib
```

とりあえず，デフォルトで生成されるテスト用コードが実行されるか確認します．
```txt
cd rust_vec
cargo test
```