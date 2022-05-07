import * as parser from "@babel/parser";
import generate from '@babel/generator';
import traverse from "@babel/traverse";
import * as t from '@babel/types';

// 1. 解析语法树
const code = `let sum = 10 + 66;`;
const ast = parser.parse(code);
console.log(ast);


// 2.遍历抽象语法树
traverse(ast, {
  enter(path) {
    if(path.node.type === "Identifier") {
      // 3.修改满足条件的语法树节点
      path.node.name = "add";
      path.stop();
    }
  }
});
console.log(ast);

// 3.将抽象语法树转换成代码
const res = generate(ast);
console.log(res);


// 4. 创建抽象语法树，可以按照type由内而外
let code2 = ``;

let ast2 = parser.parse(code2);
console.log(ast2);

// 需求: 要求手动创建 let sum = 10 + 66;的节点, 添加到body
// 推荐从内向外创建
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

let resultCode = generate(ast);
console.log(resultCode.code);

// 5. 删除ast
let code3 = `
    console.log("lnj");
    let sum = 10 + 66;
    let minus = 66 - 33;
    console.log("it666");
`;

let ast3 = parser.parse(code3);
traverse(ast3, {
  Identifier(path){
    if(path.node.name === "sum"){
      path.parentPath.remove();
    }
  }
});

console.log(ast3);

let resultCode3 = generate(ast3);
console.log(resultCode3);