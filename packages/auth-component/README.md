## :open_file_folder: 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录 
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## :rocket: 使用者指南

通过npm下载安装代码

```bash
$ npm install --save auth-component
```



如果你是webpack等环境

```js
// 常见用法
import React from 'react';
import authTools from '@jusda-tools/auth-tools';
import authComponent from '@jusda-tools/auth-component'

const { initAuthentication } = authTools;
const { initPermissions, AuthorizedWrap } = authComponent;


function App() {

    const getData = async () => {
        await initAuthentication();   // 用户登录, 默认把 token 和 clientId 存储在 cookie 中
        await initPermissions(); // 获取权限列表
    }

  React.useEffect(
      () => {
      getData();
    },
    []
  );

  return (
    <div className="App">
          <AuthorizedWrap authCode={'config_center'}>   // 如此code在权限列表中，则显示children
              <div>
                  有权限
              </div>
          </AuthorizedWrap>

    < /div>
  );
}

```

```js
 window.jusdaBaseConfig = {
        cfgType: 'dev',  // dev , sit 环境, 用于约定 获取权限 api url
        clientId: 'CP_PLATFORM' // clientId
 }
```

>> 注: 1. 全局配置: 需要配置 window 环境
2. 默认从 cookie 中获取 token 和 clientId

## :bookmark_tabs: 文档
[API 用前必读](./doc/api.md)


## :gear: 更新日志
[CHANGELOG.md](./CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](./TODO.md)
