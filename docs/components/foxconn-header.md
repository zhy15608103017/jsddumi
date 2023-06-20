---
title: foxconn-header 项目头部
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# foxconn-header

## 背景

统一的前端Header展示组件

## 代码演示

<code iframe="true" src="../../demo/foxconn-header/foxconn-header.jsx"></code>

## 使用方法

```bash
$ npm install --save @jusda-tools/foxconn-header --registry http://nexus.jusda.int/verdaccio/
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
###### 0.0.1更新内容:
```base
 1.背景色强制设为蓝色，图标更换为foxconn图标，其他与jusda-header无差别
```
