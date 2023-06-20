// 命令行美化工具
import chalk from "chalk";
// 用于递归复制文件
import path from "path";
// 终端任务列表
import Listr from "listr";
// 依赖安装工具
import { projectInstall } from "pkg-install";

import get from "lodash/get";
// 删除工具
import rimraf from "rimraf";
// 子进程
import { spawn } from "child_process";

// 模版地址
const codeWarehouse = {
  '普通项目': 'http://gitlab.jusda.int/jusda-framework/jusda-fe-starter',
  'widget': 'http://gitlab.jusda.int/chinasoft.lj.zhao/widget-template',
  '组件模版': 'http://gitlab.jusda.int/chinasoft.lj.zhao/rollup-template'
}

// 执行命令行
const executeCommandLine = async (...args) => {
  return new Promise(resolve => {
    const proc = spawn(...args) // 在node.js中执行shell一般用spawn，实现从主进程的输出流连通到子进程的输出流
    proc.stdout.pipe(process.stdout) // 子进程正常流搭到主进程的正常流
    proc.stderr.pipe(process.stderr) // 子进程错误流插到主进程的错误流
    proc.on('close', () => {
      resolve()
    })
  })
}


export async function createProject(options) {
  // 获取当前路径以及目的路径
  options = {
    ...options,
    targetDirectory: get(
      options,
      "targetDirectory",
      path.resolve(process.cwd(), get(options, "packageName"))
    )
  };
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname.replace(/^\//, "/"),
    `../.././templates`,
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  // console.log(codeWarehouse[options.template]);
  const tasks = new Listr([
    {
      title: "拷贝中",
      task: () => executeCommandLine('git', ['clone', codeWarehouse[options.template], options.packageName], { cwd: `./` })
    },
    {
      title: '初始化项目',
      task: () => rimraf.sync(`./${options.packageName}/.git/`)
    },
    {
      title: "安装依赖",
      task: () =>
        projectInstall({
          cwd: options.targetDirectory
        }),
      skip: () =>   // 判断是否使用install命令，跳过install
        !options.runInstall
          ? "Pass --install to automatically install dependencies"
          : undefined
    }
  ]);

  await tasks.run();
  // console.log("%s Project ready", chalk.green.bold("DONE"));
  return true;
}