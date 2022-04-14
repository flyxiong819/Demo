import { Project, StructureKind, VariableDeclarationKind } from "ts-morph";

async function main() {
  // step1
  const project = new Project();
  // step2
  const sourceFile = project.createSourceFile('../test-project/object-literal.ts', '', {
    overwrite: true,
  });
  // step3
  sourceFile.addExportDeclarations([{
    isTypeOnly: false,
    // namedExports: true,
    moduleSpecifier: './some-file',
  }, {
    isTypeOnly: false,
    namedExports: ['MyClass'],
    moduleSpecifier: './other-file',
  }, {
    isTypeOnly: false,
    namedExports: ['OtherClass'],
  }]);
  const variableStatement = sourceFile.addExportAssignment({
    isExportEquals: false,
    expression: (writer) => {
      writer.write(`{
        abc: 1, 
        cdf: 2,
        // TODO:
      }`);
    },
    kind: StructureKind.ExportAssignment,
  });
  sourceFile.addExportDeclaration({
    isTypeOnly: false,
    // namespaceExport: 'test',
    namedExports: ['test222'],
    moduleSpecifier: 'test333',
    // assertElements?: OptionalKind<AssertEntryStructure>[] | undefined;
  });
  
  // sourceFile.addVariableStatement({
  //   declarationKind: VariableDeclarationKind.Const,
  //   declarations: [{
  //     name: 'obj',
  //     initializer: (writer) => {
  //       writer.write(`{
  //         abc: 1, 
  //         cdf: 2,
  //       }`);
  //     },
  //   }],
  // });
  // variableStatement.setIsDefaultExport(true);
  
  sourceFile.formatText();
  // step4
  sourceFile.save();
}

main();
