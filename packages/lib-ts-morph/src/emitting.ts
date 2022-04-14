import { Project } from "ts-morph";

async function main() {
  // step1. 
  const project = new Project({
    compilerOptions: {
      outDir: '../test-project/dist',
    },
  });
  // step2. 
  project.createSourceFile("../test-project/my-file.ts", 'const num = 1; console.log(num);');
  // step3. 
  const result = project.emitToMemory();

  // step4.
  // output the emitted files to the console
  for(const file of result.getFiles()) {
    console.log('----');
    console.log(file.filePath);
    const newProject = new Project();
    const sourceFile = newProject.createSourceFile(file.filePath, file.text, { overwrite: true});
    


    console.log('----');
    console.log(file.text);
    console.log('\n');
    await newProject.save();
  }


}

main();
