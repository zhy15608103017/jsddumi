# [address](https://github.com/xx/address)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/xx/address/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/xx/address.svg?branch=master)](https://travis-ci.org/xx/address)
[![Coveralls](https://img.shields.io/coveralls/xx/address.svg)](https://coveralls.io/github/xx/address)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/address)
[![NPM downloads](http://img.shields.io/npm/dm/address.svg?style=flat-square)](http://www.npmtrends.com/address)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/xx/address.svg)](http://isitmaintained.com/project/xx/address "Percentage of issues still open")


## :star: 特性

- 支持ES6+或TypeScript编写源码，编译生成生产代码
- 多环境支持（支持浏览器原生，支持AMD，CMD，支持Webpack，Rollup，fis等，支持Node）

> 注意: 如果不同时使用 `export` 与 `export default` 可打开 `legacy模式`，`legacy模式` 下的模块系统可以兼容 `ie6-8`，见rollup配置文件

## :pill: 兼容性
单元测试保证支持如下环境：

| IE  | CH  | FF  | SF  | OP  | IOS | Android | Node |
| --- | --- | --- | --- | --- | --- | ------- | ---- |
| 6+  | 29+ | 55+ | 9+  | 50+ | 9+  | 4+      | 4+   |

**注意：编译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](./demo/demo-global.html)中的例子**

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
$ npm install --save @jusda-tools/address
```

如果你是node环境

```js
var base = require(@jusda-tools/address');
```

如果你是webpack等环境

```js
import base from '@jusda-tools/address';
```

如果你是requirejs环境

```js
requirejs(['node_modules/address/dist/index.aio.js'], function (base) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/address/dist/index.aio.js"></script>
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

将新版本发布到npm

```bash
$ npm publish
```

https://github.com/xx/address/graphs/contributors)

## :gear: 更新日志

```https://wiki.jusda.int/pages/viewpage.action?pageId=36736834```

###### 1.1.42更新内容:
```base
 1.将发货人，收货人，必填的星号改为红色.

 2.删除了部分冗余注释代码(特别是请求部分无用的容易引起误会的参数代码).

 3.更新了addressType相关的注释.

 4.现在五字码部分不会展示相关的行政区域了.
```

###### 1.1.43更新内容:
+ 收发货人及收发货组件新增参数 disableToEdit (不允许编辑,默认false允许编辑. boolean)

###### 1.1.45更新内容:
+ 1.1.44更新组件库
+ 1.1.45更新地址简称不再为必填
+ 
###### 1.1.46更新内容:
+ 修复了中英文数据传参BUG的问题
  
###### 1.1.47更新内容:
+ 收发货方地址增加时，地址简称改为非必填
+ 保存时如果地址简称为空，则自动将收/发货方名称填充到地址简称字段
+ 
###### 1.1.48更新内容:
+ 修复了多点提送货场景下，先选择地址，点击新增地址，返回时地址ID会被清空的问题

###### 1.1.49-1.1.54更新内容:
+ 在新增/编辑地址信息里,新增地址查询功能,选择对应地址后可带出详细信息与行政区域
+ 新增切换手动输入模式.
+ 当前模式为自动搜索模式时,会保存相应坐标信息.
+ 新增门牌号字段.

###### 1.1.55更新内容:
+ 修复了在内网环境高德接口调用错误的问题

###### 1.1.56更新内容:
+ 修复了自动模式下location没有保存的问题

###### 1.1.57更新内容:
+ 修复了经纬度传参错误的问题


|     名称      |                     描述                     |  类型   | 可选值 | 默认值 |
| :-----------: | :------------------------------------------: | :-----: | :----: | :----: |
|      ...      |                     ...                      |   ...   |   -    |  ...   |
| disableToEdit | 控制 收发货人 及 收发货 组件是否禁止编辑地址 | boolean |   -    | false  |
|      ...      |                     ...                      |   ...   |   -    |  ...   |
