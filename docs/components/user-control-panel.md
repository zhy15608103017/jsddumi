---
title: user-control-panel 用户面板
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# user-control-panel 

## 背景

个人信息面板组件，现在主要集成于jusda-header组件，也可以单独集成使用


## 代码演示

<code iframe="true" src="../../demo/user-control-panel/user-control-panel.jsx"></code>

## 使用方法

```bash
$ npm install --save @jusda-tools/user-control-panel --registry http://nexus.jusda.int/verdaccio/
```

## API

| 参数                 | 说明     | 类型   | 默认值               | 版本 | 备注 |
| -------------------- | -------- | ------ | -------------------- | ---- | -----|
| userIdentitySwitcher | 配置对象 | object | userIdentitySwitcher | -    | -     |
| locale               | 国际化   | string | 'en-US'              | -    | -     |
| theme                | 配置对象 | string | 'light'              | -    | -     |
| onIdentityChange     | 切换身份后执行的事件| Function | -         | -    | -     |
| openTargetTabConfig  | 是否是在个人中心或者消息中心| { personalCenter: boole,messagesCenter: boole } | undefined | -| 如果是个人中心或者消息中心需配置此参数为true,点击功能按钮后为当前页面跳转    |
| onLogout             | 覆盖默认退出登陆事件 | Function | - | - | - |
<!-- | overlay             | 在安全设置之前插入html节点 | ReactNode | - | - | - | -->
| onVisibleChange      | 面板显示状态改变时调用的外部事件 | Function | - | - | - |

### userIdentitySwitcher 对象

| 参数                 | 说明                 | 类型    | 默认值 | 版本 |
| -------------------- | -------------------- | ------- | ------ | ---- |
| enable               | 是否启用切换身份功能 | boolean | true   | -    |
| requirePermission    | 是否校验切换身份     | boolean | true   | -    |
| subMenuWrapClassName | 子菜单展开样式名称   | string  | -      | -    |


## 更新日志
###### 0.1.87更新内容:
```base
 1.切换身份时判断是否是IP限制的租户身份
```

###### 0.1.88更新内容:
```base
 1.修改切换身份时判断是否是IP限制的租户身份
```

###### 0.3.1更新内容:
```base
 1. onLogout 参数逻辑调整(去掉默认支持的退出方法),用户如果传了 onLogout 参数，需在方法内部手动调退出登录方法
```

###### 1.0.0更新内容:
```base
 1. 升级antd(v5.6.0)、react(v18.2.0)、react-dom(v18.2.0)、样式采用css in js 方案
 2. 移除了 overlay 参数
```