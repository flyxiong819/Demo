import { Project } from "ts-morph";

async function main() {
  // step1
  const project = new Project();
  // step2
  const sourceFile = project.createSourceFile('../test-project/type-paramter.ts');
  // step3
  const classDeclaration = sourceFile.addClass({
    name: 'MyClassName',
  });
  const typeParameter = classDeclaration.insertTypeParameter(0, {
    name: 'T',
    // constraint: 'string',
  });
  typeParameter.setDefault('string');

  const typeAliasDeclaration = sourceFile.addTypeAlias({
    name: 'TypeAliasName',
    type: 'string',
  });
  // step4
  sourceFile.save();
}

main();
