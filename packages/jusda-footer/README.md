# [jusda-footer](https://github.com/yazohu/jusda-footer)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yazohu/jusda-footer/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/yazohu/jusda-footer.svg?branch=master)](https://travis-ci.org/yazohu/jusda-footer)
[![Coveralls](https://img.shields.io/coveralls/yazohu/jusda-footer.svg)](https://coveralls.io/github/yazohu/jusda-footer)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/jusda-footer)
[![NPM downloads](http://img.shields.io/npm/dm/jusda-footer.svg?style=flat-square)](http://www.npmtrends.com/jusda-footer)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/yazohu/jusda-footer.svg)](http://isitmaintained.com/project/yazohu/jusda-footer "Percentage of issues still open")


## :open_file_folder: 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## :rocket: 使用者指南

通过npm下载安装代码

```bash
$ npm install --save jusda-footer
```



如果你是webpack等环境

```js
import Footer from '@jusda-tools/jusda-footer';

class Foo extends React.Component {
    
    render() {
        
        return (
        <div>
            <Header>...</Header>
            <Footer />
        </div>
        )
    }
}
```


## :bookmark_tabs: 文档
[API](./doc/api.md)

## :kissing_heart: 贡献者指南
首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

运行单元测试:

```bash
$ npm test
```

> 注意：浏览器环境需要手动测试，位于`test/browser`

修改 package.json 中的版本号，修改 README.md 中的版本号，修改 CHANGELOG.md，然后发布新版

```bash
$ npm run release
```

将新版本发布到npm

```bash
$ npm publish
```

## 贡献者列表

[contributors](https://github.com/yazohu/jusda-footer/graphs/contributors)

## :gear: 更新日志
[CHANGELOG.md](./CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](./TODO.md)