---
title: foreendexport 导出sdk
nav: 组件
toc: content
group:
  title: JS-SDK
  order: 1
---

# [fore-end-export](https://github.com/zhy15608103017/zhy-dumi.git)

该 sdk 借助了 worker 技术将数据处理部分放入子线程中

<code transform="true" src="./../../demo/fore-end-export"></code>

```jsx | pure
使用方法
import foreendexport,{exportProtable} from '@jusda-tools/fore-end-export';
```
<!-- 提取MD -->
###  文件导出

exportProtable(Protabble使用)

| 参数            | 说明               | 类型   | 默认        | 备注                                                            |
| --------------- | ------------------ | ------ | ----------- | --------------------------------------------------------------- |
| data            | 数据               | Array  | --          |     不需要轮询就可以使用此参数直接灌数据                                                            |
| searchFn | 获取数据函数      | (pages?: any) => Promise<{data: any[];page: number;total: number;}> |   |  返回一个Promise函数,里面包含data,page,total,权重小于data   |    
| columns         | 表头设置,包括宽度, | Array  | --          | 不传会导出 data 中的全部数据，表头以 data 对象中的 key 作为表头 |
| flieName            | 导出文件名字       | string | 时间戳.xlsx | 默认导出 xlsx                                                   |
| widthAuto            | 是否开启宽度自适应       | boolean | true | 不开启，默认是columns中宽度(partable是其配置存储的宽度)                                               |
| LifeFunction    | 钩子函数           | object |             |                                                                 |
| headerColor    | 导出表头颜色           | string |  fffbea           |    16进制的argb                                                             |
| animationConfig | 钩子函数           | object |             |                                                                 |

foreendexport(sdk参数同上，无searchFn)

#### searchFn
searchFn  接受参数,
| 参数           | 说明               | 类型    | 默认         | 备注                                                 |
| -------------- | ------------------ | ------- | ------------ | ---------------------------------------------------- |
| pages | 页码      | number |     会将返回中的pages加一传递给下次调用 |   

返回参数,
| 参数           | 说明               | 类型    | 默认         | 备注                                                 |
| -------------- | ------------------ | ------- | ------------ | ---------------------------------------------------- |
| data | 每次获取到的数据     | any[] |    通过轮询获取到接口的数组进行组装 |   
| page | 当前页码    | number |    通过page是否小于total判断是否继续请求,值为null和undefined则不会继续请求, |   
| total | 总页数    | number |    判断是否继续请求 |  

<!-- end提取MD -->

列子
```jsx | pure
使用方法
const searchFn=async (page=1)=>{
 let res = await getMaterialList({
    page,
    size:10,
    materialNameLike: "100G",
    sort: `${UnderScoreCase('onHandQuantity')},desc`,

 });
 
    return {
        data:res?.data?.content,
        page:res.data.number,
        total:res.data.totalPages
    }
}
getMaterialList为你项目中获取数据的接口 如果你们项目页面从页面从0开始,page改为0即可,getMaterialList换成项目中自己获取的数据的接口,返回数据根据自身项目中接口返回结构做调整.
```
<!-- 提取MD -->

#### columns

| 参数  | 说明      | 类型                       | 默认   | 备注                            |
| ----- | --------- | -------------------------- | ------ | ------------------------------- |
| width | 宽度      | number                     | 100    |                                 |
| exportColumnName | 表头名字  | string                     | --     |  | 不传会以title 作为值
| key   | dataIndex||key | data 对象中对于 key 的名字 | string |              不传导出时不会导出对于列 |             

#### LifeFunction

可关闭自带的动画，借助这里的钩子函数使用自己的动画
| 参数 | 说明 | 类型 | 默认 | 备注 |
| --------------------- | ----------------- | --------- | ----- | ---- |
| create | 创建导出线程的函数 | Function | | |
| dataHandle | 开始处理数据时的函数 | Function | | 可在这里处理数据 loading 效果， |
| fileHandle | 文件开始生成的函数 | Function | | 这里会占用 ul 线程,|
| end | 文件生成完毕的函数 | Function | |文件生成成功,ul 线程释放 |

#### animationConfig

| 参数           | 说明               | 类型    | 默认         | 备注                                                 |
| -------------- | ------------------ | ------- | ------------ | ---------------------------------------------------- |
| dataProcessing | 数据处理动画       | boolean | true         |                                                      |
| filing         | 文件生成动画       | boolean | true         | 建议使用全局动画，且动画中不要使用影响页面回流的属性 |
| filiPromptText | 文件生成动画中文字 | string  | '文件生成中' |                                                      |

<!-- end提取MD -->






## 注意
该sdk 导出 foreendexport和exportProtable方法 foreendexport为纯sdk无searchFn参数,
exportProtable为protable专用，会去拿protable配置

## 更新日志
### 1.0.0更新内容:

```base
新增导出组件，增加文档
```
### 1.0.3更新内容:

```base
增加protable接口，导出功能可使用protable配置，新增参数导出表头颜色headerColor 宽度自适应widthAuto 数据获取接口，参数接口调整，调整后结构参考使用dome 
```
### 1.0.8-alpha.0更新内容:

```base
兼容data和searchFn两种方式，增加国际化，worker中地址调整
```
