# [mapbox-config](https://github.com/yazohu/mapbox-config)

mapbox-config
mapbox 通用配置，默认设置了语言


## :star: 特性


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
$ npm install --save @jusda-tools/mapbox-config
```

如果你是node环境

```js
var base = require('@jusda-tools/mapbox-config');
```

如果你是webpack等环境

```js
import base from '@jusda-tools/mapbox-config';
let config = {
    ...
};
let lang = 'zh';
let map = base.mapboxGlMap(config, lang);
```


## :bookmark_tabs: 文档


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

## :gear: 更新日志
[CHANGELOG.md](./CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](./TODO.md).
