import { Project } from "ts-morph";

async function main() {
  // step1. 创建project对象
  const project = new Project();
  // step2. 添加source file并获取source file对象
  const sourceFile = project.addSourceFileAtPath('../test-project/formatting.ts');
  // step3. 增删改查
  sourceFile.formatText();
  // step4. 保存到file system
  sourceFile.save();
}

main();
