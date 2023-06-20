---
nav: 组件
toc: content
title: jusda-userGuide 用户引导
group:
  title: 业务组件
  order: 1
---
# jusda-userGuide 用户引导

## 背景

使用Joyride库封装的一套用户引导信息展示逻辑，包含了和后端数据的交互，和页面展示样式的处理。用户可根据文档指引自定义提示内容。

## 代码演示
```
// ... app.[ts|js]引入引导config文件tourData,并初始化
import tourData from './tourConfig';
import JusdaUserGuide from 

JusdaUserGuide.inItData(tourData);

```
Joyride配置项可参考https://docs.react-joyride.com/

```
// tourConfig文件
[
    {
    tourId:'A',
    version:1,
    steps:[ // 该组引导的每一步step提示设置
        {
        content: <h2>提示内容1</h2>,
        floaterProps: {
                    disableAnimation: true,
                },
        spotlightPadding: 20,
        target: '.guide-test1', //传入css选择器
        disableBeacon: true, //请默认设置为true，否则会影响定位
        }
        ...
    ]},
    {tourId:'B',
    version:2,
    steps:[ // 该组引导的每一步step提示设置
        {
        content: <h2>内容2</h2>,
        floaterProps: {
        disableAnimation: true,
        },
        spotlightPadding: 20,
        target: '.guide-test2',
        disableBeacon: true, //请默认设置为true，否则会影响定位
        },
        ...
    ]}
]
```
更多step配置项可参考https://docs.react-joyride.com/step

```
// 业务代码1
() =>{

  useEffect(()=>{
    JusdaUserGuide.show(
        ['A']
    );
  },[])

  return <div className='guide-test1'>提示区域1</div>
}

// 业务代码2
() =>{

  useEffect(()=>{
    JusdaUserGuide.show(
        ['B']
    );
  },[])

  return <div className='guide-test2'>提示区域2</div>
}
```

## 使用方法

通过npm下载安装代码

```bash
$ npm install --save @jusda-tools/jusda-userguide
```

如果你是node环境

```js
var base = require('@jusda-tools/jusda-userguide');
```

如果你是webpack等环境

```js
import base from '@jusda-tools/jusda-userguide';
```

如果你是requirejs环境

```js
requirejs(['node_modules/@jusda-tools/jusda-userguide/dist/index.aio.js'], function (base) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/@jusda-tools/jusda-userguide/dist/index.aio.js"></script>
```

## 实例方法

| 方法名                 | 说明                | 参数      | 默认    | 备注 |
| -------------------- | ------------------- | --------- | ------- | ---- |
| inItData               | 项目入口引入文件，使用inItData方法，传入本地config文件进行初始化。              | [config：StepConfig[], callback：Function]   | - |   -   |
| show                | 在页面渲染完成后调用show方法，传入要展示的tourId集合。                | [toursForShow: string[]]    | -   | -    |
| replay       | 调用replay方法，发送请求重置相关引导的数据。    | [tourIds: string[], callback：Function]   | -    | -    |
| overrideApi        | 使用该方法覆盖Joyride组件props，由于callback中会处理引导记录接口的调用，所以不可覆盖callback。   | [apiProps: object]   | -    | -    |

## :kissing_heart: 贡献者指南
首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

修改 package.json 中的版本号，修改 README.md 中的版本号，修改 CHANGELOG.md，然后发布新版

```bash
$ npm run release
```

将新版本发布到npm

```bash
$ npm publish
```

## :gear: 更新日志
[CHANGELOG.md](./CHANGELOG.md)
---


## :open_file_folder: 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── CHANGELOG.md 变更日志
```