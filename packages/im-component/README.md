## :rocket: 使用指南

```bash
$ npm install --save @jusda-tools/im-component --registry http://nexus.jusdaglobal.com/repository/npm-group
```

#### 参数配置(window.jusdaBaseConfig.ImIntegrationDefault)

| 参数                 | 说明     | 类型   | 默认值 | 版本 |
| -------------------- | -------- | ------ | ------ | ---- |
| clientId | 接口(Header)参数 | String | "IM"    | -    |
| imApiUrl | IM接口调用地址 | String | "https://mpdev.jus-link.com/api/im-service/"    | -    |
| imRedirectUrl | IM项目地址(点击用户跳转到IM页面) | String | "https://mpdev.jus-link.com/im/#/"    | -    |


##### ImSuspend页面参数
| 参数                 | 说明                 | 类型    | 默认值  | 版本 |
| -------------------- | -------------------- | ------- | ------- | ---- |
| defaltPositon            | 位置 | Object<style>({{right: '15px', bottom: '150px'}}) |    | -   |
| userId            | 用户ID | String | -   | -   |
| baseUrl            | im系统url | String | -   | -   |
| crmCode            | im客户code | String | -   | -   |
| isMsgRemind            | 是否消息提醒 | Boolean | false   | -   |
| businessData               | 业务数据 | Object | -    | -    |
| content           | 显示内容 | ReactNode ｜() => ReactNode | -    | -    |


```JavaScript
import { ImSuspend } from '@jusda-tools/im-component';

const userId = 'xxxxx';

ReactDOM.render(
    <div>
        <ImSuspend
          userId={userId}
          isMsgRemind={true}
          defaltPositon={{right: '15px', bottom: '150px'}}
          businessData={getBusinessData(data)}
        /> // 默认分配一个客服的IM图标
    </div>,
  mountNode,
);
```
<font color=red size=5>注意:</font> <font size=5>业务系统中window.jusdaBaseConfig.cfgType控制发版的环境</font>
