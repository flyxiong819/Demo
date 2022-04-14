import { Project } from "ts-morph";

async function main() {
  const project = new Project();

  project.addSourceFileAtPath('../test-project/main.ts');

  const directory = project.getDirectory('../');

  await directory?.copyImmediately('copy-dir');
  await directory?.save();
}
