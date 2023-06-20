# [jusda-tools-http-client](https://github.com/yazohu/jusda-tools-http-client)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yazohu/jusda-tools-http-client/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/yazohu/jusda-tools-http-client.svg?branch=master)](https://travis-ci.org/yazohu/jusda-tools-http-client)
[![Coveralls](https://img.shields.io/coveralls/yazohu/jusda-tools-http-client.svg)](https://coveralls.io/github/yazohu/jusda-tools-http-client)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/jusda-tools-http-client)
[![NPM downloads](http://img.shields.io/npm/dm/jusda-tools-http-client.svg?style=flat-square)](http://www.npmtrends.com/jusda-tools-http-client)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/yazohu/jusda-tools-http-client.svg)](http://isitmaintained.com/project/yazohu/jusda-tools-http-client "Percentage of issues still open")

权限组件使用的 http 库

## :star: 特性


## :pill: 兼容性

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
$ npm install --save jusda-tools@http-client
```



如果你是webpack等环境

```js
import request, { getToken, config } from '@jusda-tools/http-client';

config.setClientCb(clientIdFn.getID)
config.setTokenCb(tokenFn.getToken)


//  获取用户信息
async function getUserInfo() {
    await clientIdFn.setID(clientId);
    const userInfoRes = await request.get(getUserInfoUrl);

    if (!userInfoRes) {
        return goAuth();
    }

    const { success, errorCode } = userInfoRes;
    if (['403', '401'].includes(errorCode) || !success) {
        return goAuth();
    }
    window.jusdaUserInfo = userInfoRes;
}


```


## :bookmark_tabs: 文档

- request 用法详见 [umi-request 文档](https://github.com/umijs/umi-request).
- config.setClientCb(string | () => string )  // 设置 clientId 或者 设置获取 clientId 的回调
- config.setTokenCb(string | () => string ) // 设置 token 或者 设置获取 token 的回调

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

[contributors](https://github.com/yazohu/jusda-tools-http-client/graphs/contributors)

## :gear: 更新日志
[CHANGELOG.md](./CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](./TODO.md)