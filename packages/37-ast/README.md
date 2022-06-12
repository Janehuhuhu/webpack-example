## 1. 什么是AST?
`AST` 是 `Abstract Syntax Tree` 的缩写既"抽象语法树", 它以树状的形式表现编程语言的语法结构
<div style="margin-bottom: 50px"></div>

## 2. 生成过程
源码 --> 词法分析 --> 语法分析 --> 抽象语法树, 例如:<br>
1） 源码: let sum = 10 + 66;<br>
2) 词法分析:<br>
 从左到右一个字符一个字符地读入源程序，从中识别出一个个“单词”"符号"等 <br>
    单词      单词   符号     数字        符号      数字      符号
 |  let  |    sum   |  =  |    10     |     +    |   66   |     ;   |
```js
 [
 {"type": "word", value: "let"}
 {"type": "word", value: "sum"}
 {"type": "Punctuator", value: "="}
 {"type": "Numeric", value: "10"}
 {"type": "Punctuator", value: "+"}
 {"type": "Numeric", value: "66""}
 {"type": "Punctuator", value: ";"}
 ]
```

3） 语法分析 <br>
在词法分析的基础上根据当前编程语言的语法,将单词序列组合成各类语法短语<br>
   关键字    标识符    赋值运算符      字面量     二元运算符   字面量   结束符号
 |  let  |    sum   |       =      |     10     |      +     |   66   |     ;   |
```js
 [{
    "type": "VariableDeclaration",
    "content": {
        {"type": "kind", value: "let"} // kind 表示是什么类型的声明
        {"type": "Identifier", value: "sum"} // Identifier 表示是标识符
        {"type": "init", value: "="} // init 表示初始值的表达式
        {"type": "Literal", value: "10"} // Literal 表示是一个字面量
        {"type": "operator", value: "+"} // operator 表示是一个二元运算符
        {"type": "Literal", value: "66""}
        {"type": "Punctuator", value: ";"}
     }
 }]
```

4）生成抽象语法树
<div style="margin-bottom: 50px"></div>


## 3. AST有什么用
在大多数情况下我们是用不到 `AST` 的, 但是如果你需要做一些大型框架或者第三方工具的时候,那么 `AST` 将是你的不二选择. 例如家喻户晓的 `babel`、`webpack`、`JD Taro`、`uni-app` 等第三方工具和框架都把 `AST` 用的淋漓尽致,如在利用 `webpack` 打包 `js` 代码的时候, `webpack` 会在我们原有代码的基础新增一些代码,在利用 `babel` 打包 `js` 代码的时候, 我们可以将高级代码转换为低级代码,那么`webpack`、`babel` 是如何新增代码, 如何修改的呢, 答案就是通过 `AST` 来新增和修改的,所以如果你不甘于做一只菜鸟, 你想进一步深入学习各种工具、框架的底层实现原理, 那么AST都是必修之课
<div style="margin-bottom: 50px"></div>

## 4. 如何将我们的代码转换成AST
将 `JS` 代码转换成 `AST`, 其实就是将源代码的每一个组成部分拆解出来放到树中,拆解的过程非常复杂, 所以我们可以借助第三方模块来帮我们实现拆解, 利用 [`@babel/parser`](https://babeljs.io/docs/en/babel-parser) 解析器,
```js
// 安装依赖，注意点: 最新版本babylon已经更名为@babel/parser
npm install --save @babel/parser
```
```js
import * as parser from "@babel/parser";
const code = `let sum = 10 + 66;`;
const ast = parser.parse(code);
console.log(ast);
```
<div style="margin-bottom: 50px"></div>

## 5. 如何修改AST中的内容
要想修改 `AST` 中的内容必须先遍历拿到需要修改的节点才能修改,可以通过 `babel` 的 [`traverse`](https://babeljs.io/docs/en/babel-traverse#docsNav) 模块来遍历
```js
npm install --save @babel/traverse
```
```js
import traverse from "@babel/traverse";
// 2.遍历抽象语法树
traverse(ast, {
  enter(path) {
    if(path.node.type === "Identifier"){
      // 3.修改满足条件的语法树节点
      path.node.name = "add";
      path.stop();
    }
  }
});
console.log(ast);
```
<div style="margin-bottom: 50px"></div>


## 6. 如何将修改之后的语法树转换成代码
可以通过 `@babel` 的 `generator` 模块来转换
```js
npm install --save @babel/generator
```
```js
import generate from '@babel/generator';
// 4.将抽象语法树转换成代码
const res = generate(ast);
console.log(res);
```
注意：
如果报错 *Can't import the named export 'put' from non EcmaScript module (only default export is available)*
```js
{
// webpack 4之前，js 是 webpack 中的唯一模块类型，因而不能有效地打包其它类型的文件。
// 而 webpack 4 则提供了 5 种模块类型,其中一种即为 javascript/auto。
  test: /.mjs$/,
  include: /node_modules/,
  type: "javascript/auto" // 支持所有的JS模块系统：CommonJS、AMD、ESM
},
```
<div style="margin-bottom: 50px"></div>

## 7. 如何手动创建AST抽象语法树
可以通过 `babel` 的 [`types`](https://babeljs.io/docs/en/babel-types) 模块来创建语法树节点, 然后 `push` 到 `body` 中。在 `@babel/types` 模块中, 所有语法树的节点类型都有对应的方法, 直接调用对应方法即可创建,在创建的时候建议从内向外创建(按照type), 最后再添加到 `body` 中
```js
npm install --save @babel/types
```
```js
// 需求: 要求手动创建 let sum = 10 + 66;的节点, 添加到body
let code2 = ``;
// 1.创建二元运算符左右参与运算的 字面量节点
let left = t.numericLiteral(10);
let right = t.numericLiteral(66);
// 2.创建二元运算符节点
let init = t.binaryExpression("+", left, right);
// 3.创建表达式标识符节点
let id = t.identifier("sum2");
// 4.创建内部变量表达式节点
let variable = t.variableDeclarator(id, init);
// 5.创建外部变量表达式节点
let declaration = t.variableDeclaration("let", [variable]);
// 6.将组合好的节点添加到body中
ast.program.body.push(declaration);
```
<div style="margin-bottom: 50px"></div>


## 8. 删除 ast
`NodePath` 常用属性和方法
- 属性
  - node   当前节点
  - parent  父节点
  - parentPath 父path
  - scope   作用域
  - context  上下文
  - ...
- 方法
  - get   当前节点
  - findParent  向父节点搜寻节点
  - getSibling 获取兄弟节点
  - replaceWith  用AST节点替换该节点
  - replaceWithMultiple 用多个AST节点替换该节点
  - insertBefore  在节点前插入节点
  - insertAfter 在节点后插入节点
  - remove   删除节点
  - ...


```js
traverse(ast3, {
  Identifier(path){
    if(path.node.name === "sum"){
      path.parentPath.remove();
    }
  }
});
```
注意：
`enter` 方法只要遍历到一个节点就会调用, 并且还会传递一个 `NodePath` 对象给我们,传递的这个对象中就保存了当前遍历到的节点。那么如果写的不是 `enter`, 而是抽象语法树节点对应类型的方法(如上面的 `Identifier`),那么只有遍历到对应的类型才会调用

<div style="margin-bottom: 50px"></div>


- [常见节点类型](https://github.com/babel/babylon/blob/master/ast/spec.md)
- [在线生成](https://astexplorer.net/)
- [推荐阅读](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)