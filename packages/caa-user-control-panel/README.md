## :rocket: 使用指南

```bash
$ npm install --save @jusda-tools/caa-user-control-panel --registry http://nexus.jusdaglobal.com/repository/npm-group
```

#### API

| 参数                 | 说明     | 类型   | 默认值 | 版本 |
| -------------------- | -------- | ------ | ------ | ---- |
| userIdentitySwitcher | 配置对象 | object | { }    | -    |

##### userIdentitySwitcher 对象

| 参数                 | 说明                 | 类型    | 默认值  | 版本 |
| -------------------- | -------------------- | ------- | ------- | ---- |
| enable               | 是否启用切换身份功能 | boolean | true    | -    |
| requirePermission    | 是否校验切换身份     | boolean | true    | -    |
| locale               | 国际化               | string  | 'zh-CN' | -    |
| subMenuWrapClassName | 子菜单展开样式名称   | string  | -       | -    |


  

```JavaScript
// API 参考antd Dropdown  
import UserControlPanel from '@jusda-tools/caa-user-control-panel';
import { Menu, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item> 
      <a>
        1st menu item
      </a> 
    </Menu.Item>
  </Menu> 
);

ReactDOM.render(
  <UserControlPanel overlay={menu}>
    <a>
      Hover me <Icon type="down" />
    </a>
  </UserControlPanel>,
  mountNode,
);
```

## :bookmark_tabs: 文档
[API](https://3x.ant.design/components/dropdown-cn/)



