var watch = require('node-watch');
var shell = require('shelljs');

//通过node-watch监听src中变化的文件，一旦文件变化，执行vue-cli-service lint --fix ${file}
watch(
  './src',
  {
    recursive: true
  },
  function(evt, name) {
    console.log('%s changed.', name);
    shell.exec(
      `cd ${__dirname}
      cd ../
      NODE_ENV=develop npx vue-cli-service lint --fix ./${name}`,
      (error, stdout, stderr) => {
        if (error) {
          //console.error(`eslint-autofix exec error: ${error}`);
        }
        //console.log(stdout);
        //console.log(stderr);
      }
    );
  }
);
