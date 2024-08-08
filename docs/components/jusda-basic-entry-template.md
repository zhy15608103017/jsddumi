---
title: jusda-basic-entry-template 基础数据下拉组件
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# jusda-basic-entry-template

## 背景
统一中台数据下拉组件


## 代码演示

<code  iframe="800" src="../../demo/jusda-basic-entry-template/index.tsx"></code>

## 使用方法

```bash
$ npm install --save @jusda-tools/jusda-basic-entry-template --registry http://nexus.jusda.int/verdaccio/
```

```jsx | pure

const BasicDataIntl = () => {

    return (
        <BasicTemplateSelect
         style={{
            width: 200
        }} 
        type='getCountriesList'>

        </BasicTemplateSelect>


    );
};


```
<!-- 提取MD -->

#### 更新记录

| 版本号 | 更新内容                                               |
| ------ | ------------------------------------------------------ |
| 1.0.0 | 提供BasicTemplateSelect模板                                        |
| 1.2.0 | 提供obtainBasicDataThroughTypes方法,更新文档.                                        |

<!-- end提取MD -->
