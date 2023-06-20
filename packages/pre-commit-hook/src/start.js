const CheckPackage = require('./check.package');
const Prompt = require('./recheck.command');
const CheckLockFile = require('./checkLockFile.package');

const process = require('process');

// 拿到参数
const parma = process.argv[3];
if (parma === 'recheck') {
  new Prompt().prompt();
} else {
  new CheckLockFile().onCheck();
  new CheckPackage().start();
}
