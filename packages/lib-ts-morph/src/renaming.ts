import { Project } from "ts-morph";

async function  main() {
  // singleFile();
  multiFile();
}

async function singleFile() {
  // step1. 创建project对象
  const project = new Project();
  // step2. 添加source file 并 获取source file对象
  const sourceFile = project.addSourceFileAtPathIfExists('../test-project/renaming.ts');
  project.resolveSourceFileDependencies();
  // step3. 做一些操作，诸如：增删查改
  const myEnum = sourceFile?.getEnum("AgainEnum");
  myEnum?.rename("WithSettingEnum", {
    renameInComments: true,
    renameInStrings: true,
  });
  // step4. 将增删查改保存到file sytem
  sourceFile?.save();
}

async function multiFile() {
  // step1. 创建project对象
  const project = new Project({
    manipulationSettings: {
      usePrefixAndSuffixTextForRename: true,
    },
  });
  // step2. 添加source file
  // project.addSourceFilesAtPaths(['../test-project/renaming.ts', '../test-project/renaming2.ts']);
  project.addSourceFilesAtPaths("../test-project/*.ts");
  // step3. 获取source file对象
  const sourceFile1 = project.getSourceFile('../test-project/renaming.ts');
  const sourceFile2 = project.getSourceFile('../test-project/renaming2.ts');
  // step4. 增删查改
  // 删
  const memborOfMyEnum = sourceFile1?.getEnum('WithSettingEnum')?.getMember('myMember');
  memborOfMyEnum?.remove();
  // 改
  const varA = sourceFile2?.getVariableDeclaration('a');
  varA?.rename('b');
  // step5. 保存到file system
  sourceFile1?.save();
  sourceFile2?.save();
}

main();

// 查看test-project/renaming.ts文件，已经被修改
