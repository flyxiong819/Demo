import { Project, ts } from "ts-morph";

async function main() {
  // step1. 创建project
  const project = new Project();
  // step2. 添加source file
  const sourceFile = project.createSourceFile('../test-project/code-writer.ts');
  // step3. 增删改查

  // let functionDeclaration = sourceFile?.getFunction('testF');
  const functionDeclaration = sourceFile.addFunction({
    name: 'myfun',
  });
  functionDeclaration?.setBodyText(writer => {
    writer.writeLine('let myNumber = 5;')
      .write('if (myNumber === 5)')
      .block(() => {
        writer.writeLine('console.log("yes");');
      });
  });
  const importDeclaration = sourceFile.addImportDeclaration({
    // defaultImport: 'MyClass',
    moduleSpecifier: './file',
  });
  importDeclaration.addNamedImport({
    name: 'MyName',
  });
  
  // step4. 保存到file system
  sourceFile?.save();
}

main();
