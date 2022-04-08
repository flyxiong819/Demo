const fs = require('fs-extra');
const path = require('path');
const { readFileContent } = require('../util/index');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const types = require('@babel/types');
const generator = require('@babel/generator');

function compile(code) {
  // 1. parser 将代码解析为抽象语法树
  const ast = parser.parse(code);
  // 2. traverse 转换代码
  const visitor = {
    CallExpression(path) {
      const { callee } = path.node;
      const isConsoleLog = types.isMemberExpression(callee) && callee.object.name === 'console' && callee.property.name === 'log';
      if (isConsoleLog) {
        const funcPath = path.findParent((p) => {
          return p.isFunctionDeclaration();
        });
        const funcName = funcPath.node.id.name;
        fs.writeFileSync(`${__dirname}/ast-tree.json`, JSON.stringify(funcPath.node), (err) => {
          if (err) throw err;
          console.log('写入成功');
        });
        path.node.arguments.unshift(types.stringLiteral(funcName));
      }
    },
  };
  traverse.default(ast, visitor);
  // 3. generator 将AST转成代码
  return generator.default(ast, {}, code);
}

function main() {
  // 读文件
  const filePath = path.resolve(__dirname, './raw-file.js');
  const rawFile = readFileContent(filePath);

  // compile
  const newCode = compile(rawFile);
  console.log(newCode.code);
}

main();
