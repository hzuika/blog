---
title: "cppcheckの全オプションを有効にして確認する"
metaTitle: "Freestyle Cleanup 04"
metaDescription: "cppcheck --enable=all"
---

cppcheckの全てのオプションを有効にして実行するには`--enable=all`を加えます．
`-q`は進行状況を出力しません．

```txt
cppcheck --enable=all -q .\source\blender\freestyle\ 2> ..\frs_check_20220327.txt
```

[出力結果](https://gist.github.com/hzuika/b9f2f33b11eed6fcb289e02e5a764f9e)

出力される結果は次の通りです．

* uninitMemberVar (コンストラクタで初期化されないメンバ変数があります)
    * warning: Member variable is not initialized in the constructor. 
* operatorEqToSelf (=演算子で動的メモリの自己割り当て問題を回避するためのチェックを入れてください)
    * warning: 'operator=' should check for assignment to self to avoid problems with dynamic memory.

例: source\blender\freestyle\intern\view_map\Interface0D.h:194
```cpp
  Interface0DIterator &operator=(const Interface0DIterator &it)
  {
    if (_iterator) {
      delete _iterator;
    }
    _iterator = it._iterator->copy();
    return *this;
  }
```

* useInitializationList (変数がコンストラクタ内で割り当てられています．初期化リストで初期化することを考慮してください．)
    * performance: Variable '_strokes' is assigned in constructor body. Consider performing initialization in initialization list. 

例: source\blender\freestyle\intern\stroke\StrokeLayer.h:34
```cpp
  StrokeLayer(const stroke_container &iStrokes)
  {
    _strokes = iStrokes;
  }
```

* noCopyConstructor (動的割り当てがあるためコピーコンストラクタの実装を推奨します)
    * warning: Class does not have a copy constructor which is recommended since it has dynamic memory/resource allocation(s). 

* virtualCallInConstructor (仮想関数がデストラクタから呼ばれます．動的束縛は使われません．)
    * style: Virtual function is called from destructor at line. Dynamic binding is not used. 
    * [こちらの記事](https://qiita.com/eierapfel/items/ad607679a9c80e9516e0)を参考にすると，デストラクタで仮想関数を呼び出してしまうと，このクラスを継承したクラスのデストラクタからも呼び出されてしまうことになるそうです．

* noExplicitConstructor (明示的ではない1引数を持つコンストラクタがあります)
    * style: Class has a constructor with 1 argument that is not explicit. 
    * [こちらの記事](http://www.bohyoh.com/CandCPP/FAQ/FAQ00136.html)を参考にすると，引数が1個のコンストラクタが，型の暗黙的な変換を行わないようにするには`explicit`のプレフィックスをつける必要があります．

* missingOverride (`override`指定子がマークされていない基底クラスの関数をオーバーライドしています．)
    * style: The function overrides a function in a base class but is not marked with a 'override' specifier. 
    * [こちらのリファレンス](https://cpprefjp.github.io/lang/cpp11/override_final.html)を参考にすると，基底クラスの仮想関数をオーバーライドするときに`override`しておくと，間違えていたら文法エラーにしてくれるそうです．

* cstyleCast (C言語形式のポインタキャストを使用しています．)
    * style: C-style pointer casting 

例: source\blender\freestyle\intern\view_map\Silhouette.h:1352
```cpp
        newfedgelist.push_back((FEdge *)current->userdata);
```

* variableScope (変数のスコープを狭めることができます．)
    * style: The scope of the variable can be reduced. 

* shadowVariable (ローカル変数が外の変数を隠しています(同じ名前で再定義されています))
    * style: Local variable shadows outer variable 

* passedByValue (関数引数は`const`参照で渡されるべきです．)
    * performance: Function parameter should be passed by const reference. 

例: source\blender\freestyle\intern\system\RenderMonitor.h:29
```cpp
  inline void setInfo(string info)
  {
    if (_re && !info.empty()) {
      _re->i.infostr = info.c_str();
      _re->stats_draw(_re->sdh, &_re->i);
      _re->i.infostr = NULL;
    }
  }
```

* constParameter (パラメータを`const`で宣言できます．)
    * style: Parameter can be declared with const 

* postfixOperator (非プリミティブ型ではprefix ++/-- (前置きのインクリメント，デクリメント)を優先します)
    * performance: Prefer prefix ++/-- operators for non-primitive types. 
    * [こちらの記事](https://qiita.com/tommy6073/items/bc5bb97e27c6ee7d633f)によると，後置きの演算子だと，変更前のコピーによる処理の追加が発生するらしいです．

例: source\blender\freestyle\intern\geometry\Grid.h:352
```cpp
        for (OccludersSet::iterator it = occluders.begin(); it != occluders.end(); it++) {
```

```txt

```