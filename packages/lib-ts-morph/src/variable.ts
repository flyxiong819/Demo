import { Project, VariableDeclarationKind } from "ts-morph";

async function main() {
  // step1
  const project = new Project();
  // step2
  const sourceFile = project.createSourceFile('../test-project/variable.ts', '', {
    overwrite: true,
  });
  // step3
  const variableStatement = sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{
      name: 'myNumber',
      initializer: '5',
      type: 'number',
    }],
  });
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{
      name: 'myString',
      type: 'string',
      initializer: `'my string'`,
    }],
  });
  const variableDeclarations = variableStatement.getDeclarations();
  
  
  variableStatement.addDeclaration({
    name: 'myNumber',
    type: 'number',
    initializer: '6',
  });
  sourceFile.formatText();
  // step4
  sourceFile.save();
}

main();
