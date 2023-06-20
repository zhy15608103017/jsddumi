# pre-commit-hook使用手册

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

# 版本
## V0.0.24
新增对比package.json中的组件版本，解决了recheck命令失效，优化了找不到log文件报错问题