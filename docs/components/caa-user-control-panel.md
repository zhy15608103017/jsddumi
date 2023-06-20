---
title: caa-user-control-panel CAA用户面板
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# caa-user-control-panel 

## 背景

CAA 个人信息面板组件，用于 caa 管理端

## 代码演示

<code iframe="true" src="../../demo/caa-user-control-panel/caa-user-control-panel.jsx"></code>

## 使用方法

```bash
$ npm install --save @jusda-tools/caa-user-control-panel --registry http://nexus.jusda.int/verdaccio/
```

## API

| 参数                 | 说明     | 类型   | 默认值               | 版本 | 备注 |
| -------------------- | -------- | ------ | -------------------- | ---- | -----|
| userIdentitySwitcher | 配置对象 | object | userIdentitySwitcher | -    | -     |
| theme                | 配置对象 | string | 'light'              | -    | -     |
| overlay             | 在安全设置之前插入html节点 | ReactNode | - | - | - |
| onVisibleChange      | 面板显示状态改变时调用的外部事件 | Function | - | - | - |

#### userIdentitySwitcher 对象

| 参数                 | 说明                 | 类型    | 默认值 | 版本 |
| -------------------- | -------------------- | ------- | ------ | ---- |
| enable               | 是否启用切换身份功能 | boolean | true   | -    |
| requirePermission    | 是否校验切换身份     | boolean | true   | -    |
| subMenuWrapClassName | 子菜单展开样式名称   | string  | -      | -    |
| locale | 国际化   | string  | - | -    |

- - -
