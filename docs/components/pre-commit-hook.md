---
title: pre-commit-hook 私有包版本检查工具
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---
# pre-commit-hook

## 背景
在我们开发中，会因为项目进度，暂时搁置并且忘记jusda私有库的组件包升级，而后项目里的组件包跟不上迭代，导致已知bug无法及时修复，性能问题无法及时优化，甚至导致多系统间的样式不统一。以及因为package.json中有未指定版本的依赖包，导致本地包版本和线上包版本不一致，出现报错、bug、样式不一致。在此背景下，我们开发并推出（pre-commit-hook）工具，帮助我们避免相关版本问题。

## 快速入门

## 1. 安装husky和pre-commit-hook

```
$ npm i husky @jusda-tools/pre-commit-hook -S
```

## 2. 启用husky

```
$ npx husky install // 会在项目的根目录下生成.husky文件夹
```
```
└── .husky  // 文件夹下是git hook钩子函数
    └── _ // 启用husky生成的临时文件，不需要提交。
        ├── .gitignore
        └── husky.sh // husky的shell脚本，会读取.husky下的脚本，然后执行
```
## 3.在package.json文件的添加
```
{
    "scripts": {
        "prepare": "husky install" // 在预安装的时候自动启用husky
        "check": "pre-commit-hook check", // pre-commit的时候执行pre-commit-hook包的命令
        "recheck": "pre-commit-hook check recheck" // 配置再次确认命令，跳过本次commit
    }
}

```
## 4. 使用husky添加pre-commit钩子
```
$ npx husky add .husky/pre-commit "npm run check"  // 会在.husky文件夹下生成一个名为pre-commit的shell脚本
```

### 更多疑问请移至：https://wiki.jusda.int/pages/viewpage.action?pageId=51894096
