# 这是一个地址管理的组件
 该文件使用window.jusdaBaseConfig中的配置统一了各环境下各项目访问地址、统一登陆访问地址及原baseUrl访问地址，处理逻辑。

```jsx
// 内网环境编排文件修改示例
window.jusdaBaseConfig = {
    cfgType: '...',
    // ...otherParams,
    isExtranet?: boolean, // 标志项目是否是内网环境，true为内网
    loginUrl?: string, // 用于复写项目部署后访问统一登陆的网址。
    mpApiUrl?: string, // 用于复写项目部署后api请求地址，默认值为https://mp${cfgType}.juslink.com/api。
}
```

## 包使用示例

```jsx
import { extend } from '@jusda-tools/web-api-client';
import { mpApiUrl } from '@jusda-tools/url-config'

export const request =()=>{
    const request = extend({
        prefix: `${mpApiUrl}`,
        timeout: 100000,
        headers: {
            clientId: 'feedback',
        },
    });
    return request;
}
```

