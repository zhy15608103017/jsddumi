const process = require('process');
const os = require('os');
const fs = require('fs');
const {
  exec,
  execSync,
  // spawnSync
} = require('child_process');

class CheckPackage {
  constructor() {
    // 项目地址
    this.path = process.cwd();
    // 操作系统
    this.system = os.platform();
    // 路径连接符
    this.pathSymbol = os.platform() === 'win32' ? '\\' : '/';
    // package.json
    this.pkg = require(`${this.path}/package.json`);
    // 运行依赖
    this.dependenciesList = Object.keys(this.pkg.dependencies || {});
    // 开发依赖
    this.devDependenciesList = Object.keys(this.pkg.devDependencies || {});
    // 警告信息
    this.warning = [];
  }
  // 开始
  async start() {
    if (!this.skipCheck()) {
      await this.checkLockVersion();
      this.checkPackage();
    } else {
      console.log('本次commit跳过包版本检查');
      this.deleteLog(`${this.path}\\dep.version.log`);
    }
  }
  // 跳过检查
  skipCheck() {
    console.log('本次commit是否跳过jusda包版本检查');
    const arr = __dirname.split('\\');
    const path = arr.slice(0, arr.length - 1).join('\\');
    const isFile = fs.existsSync(`${path}\\log\\commit.log`);
    if (isFile) {
      const commitHash = execSync(`git rev-parse HEAD`, {
        encoding: 'utf-8',
      });
      const file = fs.readFileSync(`${path}\\log\\commit.log`, {
        encoding: 'utf-8',
      });
      return commitHash === file;
    }
  }
  // 检查是否锁版本
  async checkLockVersion() {
    console.log('开始检查依赖中是否有包未指定版本');
    this.warning.push(
      ...this.lockVersion('dependencies'),
      ...this.lockVersion('devDependencies'),
    );
  }
  // 检查jusda组件包版本
  async checkPackage() {
    console.log('开始准备检查jusda组件包版本');
    const pkgVersionList = this.toGetPackageList();
    // 找到node_module里的包版本号
    console.log('拿取node_modules里的包版本');
    // 遍历检查包的最新版本
    console.log('检查包版本...');
    const list = this.pkgVersionCheck(pkgVersionList);
    if (list.length > 0 || this.warning.length > 0) {
      this.formatWarning(list);
    } else {
      // 如果已经是最新版本，删除log文件
      console.log('当前所有jusda组件包版本已升级至最新，跳过检查');
      this.deleteLog(`${this.path}\\dep.version.log`);
      process.exit(0);
    }
    this.showWarning();
    process.exit(10);
  }
  // 依赖包
  toGetPackageList() {
    const pkgList = [
      ...this.devDependenciesList,
      ...this.dependenciesList,
    ].filter((i) => i.includes('@jusda-tools/'));
    const obj = {
      ...this.pkg.dependencies,
      ...this.pkg.devDependencies,
    };
    const pkgVersionList = [];
    for (const pkgName of pkgList) {
      const isFile = fs.existsSync(
        `${this.path}${this.pathSymbol}node_modules${this.pathSymbol}${pkgName}`,
      );
      // 文件不存在，需要提示
      if (!isFile) {
        this.warning.push(
          `${pkgName}的package.json版本和node_modules版本不一致，请重新拉包`,
        );
      } else {
        // 取运行依赖和开发依赖
        const pkgVersion_node =
          require(`${this.path}/node_modules/${pkgName}/package.json`)?.version;
        if (obj[pkgName] !== pkgVersion_node) {
          this.warning.push(
            `${pkgName}的package.json版本和node_modules版本不一致，请重新拉包`,
          );
        } else {
          pkgVersionList.push({
            name: pkgName,
            version: pkgVersion_node,
          });
        }
      }
    }
    return pkgVersionList;
  }
  /**
   * 检查包版本是否是最新
   * @param {*} versionList 包版本数组
   * @return {Array} 返回检查后需要更新的包list
   */
  pkgVersionCheck(versionList) {
    const arr = [];
    versionList.forEach((i) => {
      // 更换源后，组件包有些版本被重新发布了，导致包的版本顺序变化，而 npm view pkg version 根据包的发布时间取最新的，而不是包的最高版本
      // 用npm命令拿所有的版本信息
      const data = execSync(`npm view ${i.name} versions`, {
        encoding: 'utf-8',
      });
      // 整理返回的数据 --- 去换行符、根据,分割成数组 、每个值去‘[]字符，并且去空
      // 包的所有版本
      const newPkgVersions = data
        ?.replace(/\n/g, '')
        ?.split(',')
        ?.map((i) => i?.replace(/'|\[|]/g, '')?.replace(/\s*/g, ''));
      // 最新版本
      const newPkgVersion = newPkgVersions[newPkgVersions.length - 1];
      if (newPkgVersion.includes('alpha') || newPkgVersion.includes('beta')) {
        const newVersion = newPkgVersions
          .reverse()
          .find((i) => !i.includes('alpha') && !i.includes('beta'));
        console.log(`除测试版本外，${i.name}的最新版本`, newVersion);
        // 如果除测试的版本外，最高的版本和当前版本不一致，还是需要更新
        if (i.version !== newVersion) {
          arr.push({
            ...i,
            newVersion: newVersion,
          });
        }
      } else if (i.version !== newPkgVersion) {
        arr.push({
          ...i,
          newVersion: newPkgVersion,
        });
      }
    });
    return arr;
  }
  // 检测版本是否指定的方法
  lockVersion(dependencies) {
    console.log(`正在检查${dependencies}中是否有包未指定版本`);
    const arr = this[`${dependencies}List`].filter((i) =>
      this.pkg[dependencies][i].includes('^'),
    );
    return arr.map((i) => `${i}未指定版本，请结合当前版本及时修改`);
  }
  // 整理格式 包版本不一致
  formatWarning(arr) {
    arr.forEach((element) => {
      this.warning.push(
        `${element.name}不是最新版，你的版本为${element.version}，最新为${element.newVersion}，请及时升级。`,
      );
    });
    const lf = this.system === 'win32' ? '\r\n' : '\n';
    arr.push(`当前package.json中有包版本未更新至最新，需要检查${lf}`);
    arr.push(
      '如若本次commit跳过检查，请运行 npm run recheck 命令进行确认后，再尝试commit。',
    );
  }
  // 创建log文件
  createLog() {
    // 换行符 --- 解决warning：LF will be replaced by CRLF in dep.version.log
    const lf = this.system === 'win32' ? '\r\n' : '\n';
    let data = this.warning.join(` ${lf}`);
    var warning = Buffer.from(data);
    const isFile = fs.existsSync(
      `${this.path}${this.pathSymbol}dep.version.log`,
    );
    if (isFile) {
      // 覆盖写入 writeFileSync
      fs.writeFileSync(
        `${this.path}${this.pathSymbol}dep.version.log`,
        warning,
      );
    } else {
      // 新建dep.version.log，并添加内容
      fs.appendFileSync(
        `${this.path}${this.pathSymbol}dep.version.log`,
        warning,
      );
    }
  }
  // 展示的log信息
  showWarning() {
    this.createLog();
    execSync('git add dep.version.log ');
    if (this.system === 'win32') {
      execSync(`start dep.version.log`);
    } else {
      execSync(`open dep.version.log`);
    }
  }
  // 删除日志文件
  async deleteLog(path) {
    const isFile = fs.existsSync(
      `${this.path}${this.pathSymbol}dep.version.log`,
    );
    if (isFile) {
      // 删除log文件
      fs.unlinkSync(path);
      execSync('git add dep.version.log ');
    }
  }
}
module.exports = CheckPackage;
