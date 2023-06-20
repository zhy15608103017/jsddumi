const process = require('process')
const fs = require('fs');
const os = require('os');
const inquirer = require('inquirer');
const {
    execSync,
} = require('child_process');

class Prompt {
    constructor() {
        // 操作系统
        this.system = os.platform();
        // 路径连接符
        this.pathSymbol = os.platform() === 'win32' ? '\\' : '/';
    }
    prompt() {
        const path = process.cwd();
        const isFile = fs.existsSync(`${path}${this.pathSymbol}dep.version.log`);
        if (!isFile) {
            console.log('暂无需要确认的包。若是版本没有升级至最新，请运行 npm run check 命令。');
            process.exit(0)
        }
        const logFile = fs.readFileSync(`${process.cwd()}/dep.version.log`, {
            encoding: 'utf-8'
        })
        if (!logFile.includes('不是最新版')) {
            console.log('请查看dep.version.log文件内容，确认package.json版本和node_modules版本是否一致');
            process.exit(0)
        }
        const pkgList = logFile.split('\n').filter(i => i.includes("请及时升级")).map(i => i.split('不是最新版')[0]).join(' \n')
        inquirer.prompt([{
            type: 'confirm',
            message: `确定不更新以下包版本吗\n ${pkgList}  \n `,
            name: 'isUpdate'
        },])
            .then((answers) => {
                if (answers.isUpdate) {
                    // 创建一个本地的log文件，记录当前提交
                    this.createLog()
                }
            })
            .catch((error) => {
                console.log('');
            })
    }
    // 拿所在执行路径，和判断commit.log文件是否存在
    getPath() {
        const arr = __dirname.split(this.pathSymbol)
        const path = arr.slice(0, arr.length - 1).join(this.pathSymbol);
        return {
            path,
            logIsFile: fs.existsSync(`${path}${this.pathSymbol}log${this.pathSymbol}commit.log`)
        }
    }
    createLog() {
        const commitHash = execSync(`git rev-parse HEAD`);
        const { path, logIsFile } = this.getPath()
        if (logIsFile) {
            // 覆盖写入 writeFileSync
            fs.writeFileSync(`${path}${this.pathSymbol}log${this.pathSymbol}commit.log`, commitHash)
        } else {
            // 创建log文件夹
            fs.mkdirSync(`${path}/log/`);
            // 新建commit.log，并添加内容
            fs.appendFileSync(`${path}${this.pathSymbol}log${this.pathSymbol}commit.log`, commitHash)
        }
    }
}
module.exports = Prompt;
