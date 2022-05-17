import ora from 'ora';
import chalk from 'chalk';

async function main() {
  const spinner = ora().start();

  await sleep(2000);

  spinner.info('ora info');
  spinner.warn('ora warn');
  spinner.succeed('ora succeed');
  spinner.fail('ora fail');
  
await sleep(1000);
  const arr = [{
    a: 1, 
    b: 2,
  }, {
    a: 3, 
    b: 4,
  }];
  spinner.info('');
  console.table(arr);
await sleep(1000);

  console.log(chalk.red('chalk red'));
  console.log(chalk.green('chalk green'));
  console.log(chalk.yellow('chalk yellow'));

  const obj = {
    a: 1, 
    b: 2,
  };
  console.log(chalk.red(obj));
}

main();


async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
} 