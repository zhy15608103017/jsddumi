---
title: jusda-Map 高德/MapBox
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# jusda-Map

## 背景

地图组件 支持高德/MapBox

## 代码演示

<code iframe="800" src="../../demo/jusda-Map/jusda-Map.jsx"></code>

## 使用方法

```bash

$ npm install --save @jusda-tools/jusda-Map --registry http://nexus.jusda.int/verdaccio/
```

## API
```bash
  originToDestination: any;//起始地-目的地 {origin:[104,89],originName:'成都',destination:[104,89],destinationName:'成都'}
  routings: any[];// 运段(运单)列表 [{ originCityName: '成都', destinationCityName: '重庆', transportModeCode: 'TPM_ROAD' }]
  routingsCoordinate: Array<number>;// 运段(运单)坐标列表 [{originCoordinate:[132,88],destinationCoordinate:[132,88]}]
  trcks: Array<number>;//轨迹坐标列表 [[[55,44]]],
  lineColor: string;//连线颜色
  mainMapLine: boolean;//小地图是否连线
  AMapSecurityJsCode: string;//密钥-高德
  AMapKey: string;//key-高德
  defaultMap: string;//首选地图 'amap'/'mapbox',若不传，则会判断用户所在地区展示对应地图
  styles: any;//样式 {height:'200px'}
  changeMap: boolean;//是否开启切换地图功能
  modeCode: string,//运输模式
  statusCode: string,//运输节点
  isWaybill: boolean,//判断是运单还是运段 不传默认是运端
  ```
| 参数                 | 说明                | 类型      | 默认    | 备注 |
| -------------------- | ------------------- | ---------| ------- | ---- |
| originToDestination  | 起始地-目的地       | any       | -       | -   |
| routings             | 运段(运单)列表            | Array     | -       | -   |
| routingsCoordinate   | 运段(运单)坐标列表        | Array     | -       | -   |
| trcks                | 轨迹坐标列表        | Array     | -       | -   |
| mainMapLine          | 小地图是否连线      | boolean   | false   |  -  |
| styles               | 样式               | any       | -       |  -   |
| lineColor            | 连线颜色           | string    | #ffc500 | -    |
| modeCode             | 运输模式           | string    | -       | -    |
| statusCode           | 运输节点           | string    | -       | -    |
| AMapSecurityJsCode   | 密钥-高德          | string    | -       | -    |
| AMapKey              | key-高德           | string   |  -      |-     |
| defaultMap           | 首选地图           | string   | 会以用户地区来展示，国外mapbox国内高德  |-     |
| changeMap            | 是否开启切换地图功能| boolean  | false   |-     |
| isWaybill            | 判断是运单还是运段| boolean  | false(运段)   |-     |

