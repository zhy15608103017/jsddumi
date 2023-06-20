const chalk = require('chalk');
const process = require('process');
const { yarnToNpm } = require('synp');

const log = console.log;
class CheckLockFile {
  constructor() {
    this.path = process.cwd();
    this.pkg = require(`${this.path}/package.json`);
    this.lockJson = null;
  }

  onCheck() {
    log(chalk.blue('lockfile校验中...'));
    this.lockFileToJson();
    this.checkFile();
  }

  lockFileToJson() {
    try {
      const stringifiedPackageLock = yarnToNpm(`${this.path}`);
      this.lockJson = JSON.parse(stringifiedPackageLock);
    } catch (e) {
      log(chalk.red('未找到yarn.lock文件，请检查yarn.lock是否存在'));
      process.exit(10);
    }
  }

  // 校验lockfile
  checkFile() {
    const failPkgs = Object.keys(this.pkg?.dependencies)?.filter((key) => {
      // 校验版本号含‘^’
      if (this.pkg?.dependencies[key]?.includes('^')) {
        log(chalk.red('存在未锁版本的依赖，请检查后再提交'));
        process.exit(10);
      }
      // 校验版本号含‘x’
      if (this.pkg?.dependencies[key]?.includes('x')) {
        const versionDigit = this.pkg?.dependencies[key]?.split('.');
        const lockDigit = this.lockJson?.dependencies[key]?.version?.split('.');
        // 'x'默认跳过检查
        const isCheckPass = versionDigit?.every(
          (item, index) => item === 'x' || item === lockDigit[index],
        );
        return !isCheckPass;
      }
      // 返回version不一致的包名
      return (
        this.lockJson?.dependencies[key]?.version !==
        this.pkg?.dependencies[key]
      );
    });
    log(
      failPkgs?.length
        ? chalk.bgRed(
            `package依赖【${failPkgs.toString()}】与lock文件中版本不匹配,请核对`,
          )
        : chalk.green('lockfile校验通过'),
    );
  }
}

module.exports = CheckLockFile;
