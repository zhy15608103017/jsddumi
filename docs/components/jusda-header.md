---
title: jusda-header 项目头部
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# jusda-header

## 背景

统一的前端Header展示组件

## 代码演示

<code iframe="true" src="../../demo/jusda-header/jusda-header.jsx"></code>

## 使用方法

```bash
$ npm install --save @jusda-tools/jusda-header --registry http://nexus.jusda.int/verdaccio/
```

## API

| 参数                 | 说明                | 类型      | 默认    | 备注 |
| -------------------- | ------------------- | --------- | ------- | ---- |
| locale               | 国际化              | string    | 'en-US' |      |
| theme                | 主题                | string    | light   | -    |
| showNavigation       | 是否展示导航菜单    | boolean   | true    | -    |
| showWorkbench        | 是否展示工作台跳转按钮   | boolean   | true    | -    |
| showTaskCenter       | 是否展示任务中心按钮   | boolean   | false    | -    |
| onLogout             | 覆盖默认退出登陆事件 | Function | - | 传递给user-control-panel组件的 |
| onIdentityChange     | 切换身份后执行的事件| Function | -  | 传递给user-control-panel组件的 |
| openTargetTabConfig  | 根据变量值来判断当前站点，确认点击功能后是否新开页面| { helpCenter: boolean, announcementCenter: boolean, personalCenter: boole,messagesCenter: boole } | undefined | -| 如果变量为true,点击功能按钮后为当前页面跳转    |
| logoReplaceReactNode | Logo 图位置替换元素 | ReactNode | null    | -    |
| leftReactNode        | Header 左边元素     | ReactNode |         |      |
| rightReactNode       | Header 右边元素     | ReactNode |         |      |
| userIdentitySwitcher | 用户信息面板配置    | Object    |         |      |

## 更新日志
###### 0.0.66更新内容:
```base
 1.user-control-panel升级到v0.1.87(切换身份时判断是否是IP限制的租户身份)
```

###### 0.0.67更新内容:
```base
 1.user-control-panel升级到v0.1.88(切换身份时判断是否是IP限制的租户身份)
```

###### 0.0.68更新内容:
```base
 1.svg源代码中class改为className
```

###### 0.0.69更新内容:
```base
 1.工作台英文修改为 Work Space
```

###### 0.2.1更新内容:
```base
 1. @jusda-tools/user-control-panel 组件中的 onLogout 参数逻辑调整(去掉默认支持的退出方法)
```

###### 1.0.0更新内容:
```base
 1. @jusda-tools/user-control-panel 升级版本为 v1.0.0 套娃升级
```