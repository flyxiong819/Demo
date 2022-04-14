import { Project } from "ts-morph";

async function main() {
  // step1. 
  const project = new Project();
  // step2.
  const sourceFile = project.createSourceFile('../test-project/interface.ts');
  // step3.
  const interfaceDeclaration = sourceFile.addInterface({
    name: 'IInterfaceName',
  });
  interfaceDeclaration.addExtends(['Named', 'Aged']);
  interfaceDeclaration.insertExtends(1, ['Persion']);
  interfaceDeclaration.addCallSignature({
    returnType: 'SomeClass',
  });
  // step4.
  sourceFile.save();

}

main();
