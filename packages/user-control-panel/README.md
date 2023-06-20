## :rocket: 使用指南

```bash
$ npm install --save @jusda-tools/user-control-panel --registry http://nexus.jusdaglobal.com/repository/npm-group
```

#### API

| 参数                 | 说明     | 类型   | 默认值 | 版本 |
| -------------------- | -------- | ------ | ------ | ---- |
| userIdentitySwitcher | 配置对象 | object | userIdentitySwitcher    | -    |
| locale | 国际化 | string | 'en-US'    | -    |
| theme | 配置对象 | string | 'light'    | -    |

##### userIdentitySwitcher 对象

| 参数                 | 说明                 | 类型    | 默认值  | 版本 |
| -------------------- | -------------------- | ------- | ------- | ---- |
| enable               | 是否启用切换身份功能 | boolean | true    | -    |
| requirePermission    | 是否校验切换身份     | boolean | true    | -    |
| subMenuWrapClassName | 子菜单展开样式名称   | string  | -       | -    |


  

```JavaScript
// API 参考antd Dropdown  
import UserControlPanel from '@jusda-tools/user-control-panel';

ReactDOM.render(
  <UserControlPanel theme='light' locale='zh-CN' />,
  mountNode,
);
```

## :bookmark_tabs: 文档
[API](https://3x.ant.design/components/dropdown-cn/)


#### 更新记录

| 版本号               | 更新内容                        
| ------------------ | --------------------------- 
| 0.1.57        | 用rollup替换了webpack打包, 并且修改了@jusda-tools/web-api-client请求的写法, 让其不影响业务系统    |
| 0.1.58        | 引用 auth-tools 0.0.86版本升级    |
