---
title: pollingDownload 轮询下载
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---
# pollingDownload

## 背景

这是一个下载报表文件的方法组件

## 代码演示

```jsx
import React from 'react';
import exportFn from '@jusda-tools/pollingdownload';
import { Button } from 'antd';

const Demo = () => {
    return (
         <Button onClick={()=>{
             // 根据业务代码请求接口获得下载任务taskId
             // 调用方法并传入taskId
             exportFn('taskId',{duration:1000}).then(res=>{
                 //请求返回正常且结束轮询请求时可在此处理导出服务接口请求返回的数据，可使用该数据进行业务逻辑的处理。
             }).catch(error => {
                 //taskId未传入或类型有误、请求失败可在此处理报错信息
             })
         }}>
            
          导出
        </Button>
    )
}
export default Demo;
```

## 使用方法

```bash
$ npm install --save @jusda-tools/pollingdownload --registry http://nexus.jusda.int/verdaccio/
```


## API及参数说明
exportFn(taskId,[options],[downloadBaseUrl])

+ taskId，即下载任务id，未传或传非string或非number类型的数据，会返回一个rejected状态的Pomise对象。

+ options，控制本地化或请求发送频率的参数

|名称|描述|类型|可选值|默认值|
|:-:|:-:|:-:|:-:|:-:|
|localeKey|国际化自定义key|string|-|'umi_locale'|
|locale|国际化标志，可直接指定国际化标志|string|'zh-CN','en-US'|undefined|
|duration|轮询查询下载文件准备情况接口的时间间隙|number|-|2000|
|fileName|文件名|string|-|undefined|
|shouldManualDownload|自定义处理标志，可设置该标志为true，则可在轮询接口返回文件就绪时获取返回的内容。此时并不会自动下载，需在业务代码中自行处理下载逻辑|boolean|-|false|


+ downloadBaseUrl ，非必传，download 接口的基础地址，兼容 CAA 下载。