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

## Error

* missingReturn (voidではない戻り値の関数に，return文がありません．)
    * error: Found a exit path from function with non-void return type that has missing return statement 
    * `Py_RETURN_NONE;`を使用しているため，エラーが出ますが，これで正しいようです．

    例: source\blender\freestyle\intern\python\BPy_ContextFunctions.cpp:227
    ```cpp
    static PyObject *ContextFunctions_get_selected_fedge(PyObject * /*self*/)
    {
    FEdge *fe = ContextFunctions::GetSelectedFEdgeCF();
    if (fe) {
        return Any_BPy_FEdge_from_FEdge(*fe);
    }
    Py_RETURN_NONE;
    }
    ```

* unknownMacro (知らないマクロがあります．(サブディテクトリ下でcppcheckを使用したためこのエラーが出る．)
    * error: There is an unknown macro here somewhere. Configuration is required. If Py_LOCAL_INLINE is a macro then please configure it. 

## Warning

* assertWithSideEffect (Assert文が副作用を持つかもしれない関数を呼びます．)
    * warning: Assert statement calls a function which may have desired side effects: 'GetOwner'. 

    例: source\blender\freestyle\intern\winged_edge\Curvature.cpp:89:19: 
    ```cpp
            assert(h->GetOwner()->GetNumberOfOEdges() ==
                2);  // Because otherwise v->isBoundary() would be true
    ```

* identicalConditionAfterEarlyExit (同じ条件があり，二つ目の条件は常にfalseです．)
    * warning: Identical condition 'pred_ts.result', second condition is always false 
    * 二番目の`pred_ts.result`に行くためには，一番目の`pred_ts.result`は`false`でなければならないということです．

    例: source\blender\freestyle\intern\stroke\Operators.cpp:186
    ```cpp
        if (pred(**it_edge) < 0) {
        goto error;
        }
        if (pred.result) {
        continue;
        }
        if (pred_ts(**it_edge) < 0) {
        goto error;
        }
        if (pred_ts.result) {
        continue;
        }

        edge = dynamic_cast<ViewEdge *>(*it_edge);
        it.setBegin(edge);
        it.setCurrentEdge(edge);

        Chain *new_chain = new Chain(id);
        ++id;
        while (true) {
        new_chain->push_viewedge_back(*it, it.getOrientation());
        ts(**it);
        ++it;
        if (it.isEnd()) {
            break;
        }
        if (pred(**it) < 0) {
            delete new_chain;
            goto error;
        }
        if (pred.result) {
            break;
        }
        if (pred_ts(**it) < 0) {
            delete new_chain;
            goto error;
        }
        if (pred_ts.result) {
            break;
        }
        }
    ```

* noCopyConstructor (動的割り当てがあるためコピーコンストラクタの実装を推奨します)
    * warning: Class does not have a copy constructor which is recommended since it has dynamic memory/resource allocation(s). 

* nullPointerRedundantCheck (条件が冗長か，nullポインタのデリファレンスの可能性があります．)
    * warning: Either the condition '!ss' is redundant or there is possible null pointer dereference: ss. 
    * `Py_RETURN_NONE`がやはり無視されているらしい．
    * `__A`の`nullptr`チェックを`BLI_assert`で行っているが，cppcheckには引っかかっていない

    例: source\blender\freestyle\intern\python\BPy_ViewShape.cpp:172
    ```cpp
    static PyObject *ViewShape_sshape_get(BPy_ViewShape *self, void *UNUSED(closure))
    {
    SShape *ss = self->vs->sshape();
    if (!ss) {
        Py_RETURN_NONE;
    }
    return BPy_SShape_from_SShape(*ss);
    }
    ```

    例: source\blender\freestyle\intern\stroke\Curve.cpp:154
    ```cpp
    BLI_assert(__A != nullptr && __B != nullptr);

    _Point2d = iA->point2d() + t3 * (iB->point2d() - iA->point2d());
    _Point3d = __A->point3d() + _t2d * (__B->point3d() - __A->point3d());
    ```

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

* operatorEqVarError (代入演算子内でメンバ変数に値が割り当てられていない)
    * warning: Member variable 'Stroke::_textureStep' is not assigned a value in 'Stroke::operator='. 

* uninitMemberVar (コンストラクタで初期化されないメンバ変数があります)
    * warning: Member variable is not initialized in the constructor. 

## Style

* constParameter (パラメータを`const`で宣言できます．)
    * style: Parameter can be declared with const 

* cstyleCast (C言語形式のポインタキャストを使用しています．)
    * style: C-style pointer casting 

    例: source\blender\freestyle\intern\view_map\Silhouette.h:1352
    ```cpp
            newfedgelist.push_back((FEdge *)current->userdata);
    ```

* knownConditionTrueFalse (常にfalseの条件があります．)
    * style: Condition '1==i' is always false 

* missingOverride (`override`指定子がマークされていない基底クラスの関数をオーバーライドしています．)
    * style: The function overrides a function in a base class but is not marked with a 'override' specifier. 
    * [こちらのリファレンス](https://cpprefjp.github.io/lang/cpp11/override_final.html)を参考にすると，基底クラスの仮想関数をオーバーライドするときに`override`しておくと，間違えていたら文法エラーにしてくれるそうです．

* noConstructor (初期化が必要なプライベートメンバ変数がありますが，コンストラクタを宣言していません．)
    * style: The class does not declare a constructor although it has private member variables which likely require initialization. 

* noExplicitConstructor (明示的ではない1引数を持つコンストラクタがあります)
    * style: Class has a constructor with 1 argument that is not explicit. 
    * [こちらの記事](http://www.bohyoh.com/CandCPP/FAQ/FAQ00136.html)を参考にすると，引数が1個のコンストラクタが，型の暗黙的な変換を行わないようにするには`explicit`のプレフィックスをつける必要があります．

* redundantAssignment (古いものが使用されないまま変数が再代入されます．)
    * style: Variable is reassigned a value before the old one has been used. 

* shadowVariable (ローカル変数が外の変数を隠しています(同じ名前で再定義されています))
    * style: Local variable shadows outer variable 

* shadowArgument (ローカル変数が外の引数を隠します)
    * style: Local variable shadows outer argument 

* unreadVariable (使用されない値が変数に割り当てられています．)
    * style: Variable is assigned a value that is never used. 

* unsignedLessThanZero (`unsigned`の変数に対して`0`以下の条件をチェックしています．)
    * style: Checking if unsigned expression 'counter' is less than zero. 

* unusedVariable (未使用の変数です)
    * style: Unused variable: 

    こちらを適用していきます．
    ```txt
    source\blender\freestyle\intern\view_map\ViewMapBuilder.cpp:932:24: style: Unused variable: newVVertices [unusedVariable]
    source\blender\freestyle\intern\view_map\ViewMapBuilder.cpp:1588:16: style: Unused variable: occluders [unusedVariable]
    ```

* variableScope (変数のスコープを狭めることができます．)
    * style: The scope of the variable can be reduced. 

* virtualCallInConstructor (仮想関数がデストラクタから呼ばれます．動的束縛は使われません．)
    * style: Virtual function is called from destructor at line. Dynamic binding is not used. 
    * [こちらの記事](https://qiita.com/eierapfel/items/ad607679a9c80e9516e0)を参考にすると，デストラクタで仮想関数を呼び出してしまうと，このクラスを継承したクラスのデストラクタからも呼び出されてしまうことになるそうです．

## Performance

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

* postfixOperator (非プリミティブ型ではprefix ++/-- (前置きのインクリメント，デクリメント)を優先します)
    * performance: Prefer prefix ++/-- operators for non-primitive types. 
    * [こちらの記事](https://qiita.com/tommy6073/items/bc5bb97e27c6ee7d633f)によると，後置きの演算子だと，変更前のコピーによる処理の追加が発生するらしいです．

    例: source\blender\freestyle\intern\geometry\Grid.h:352
    ```cpp
            for (OccludersSet::iterator it = occluders.begin(); it != occluders.end(); it++) {
    ```

* stlFindInsert (挿入前の検索は必要ありません．)
    * performance: Searching before insertion is not necessary. 

    例: source\blender\freestyle\intern\winged_edge\Curvature.cpp:96
    ```cpp
            if (vertices.find(w) == vertices.end()) {
                vertices.insert(w);
                S.push(w);
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

## その他

* missingInclude (サブディレクトリであるため，出力される)
    * nofile:0:0: information: Cppcheck cannot find all the include files (use --check-config for details) 