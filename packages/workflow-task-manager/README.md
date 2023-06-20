# workflow-task-manager 待办任务处理组件

![UI](./doc/ui.jpg)

## API

### workflow-task-manager

该组件为通过用户省份查询当前用户待办事务的列表组件。并通过该待办任务关联的formUrl参数获取用户处理待办事务的表单项目，在弹框中通过微应用展示。
该组件默认导出一个图标，通过点击该图标控制待办列表的展示和收起。

| 参数                 | 说明                | 类型      | 默认    | 备注 |
| -------------------- | ------------------- | --------- | ------- | ---- |
| locale     | 国际化   | string                      | 'en-US' |      |     |
| theme      | 主题     | string                      | light   | -    |
| modalProps | 弹框配置 | Omit<ModalProps, "visible"> | -       | -    |

## Example

```jsx
import React from 'react';
import BusinessIcon from '@jusda-tools/workflow-task-manager';
import Header from '@jusda-tools/jusda-header';

const App: React.FC = () => {
  return (
    <div>
      <Header
        theme="light"
        locale="en-US"
        rightReactNode={
          <>
            <div
              style={{
                width: 50,
                height: 50,
                verticalAlign: 'baseline',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BusinessIcon />
            </div>
          </>
        }
      />
    </div>
  );
};

export default App;
```

提示：微应用中可以通过action派发事件关闭当前开启的待办事务处理弹窗,且子应用暂不支持使用hash路由

```
import { useModel } from 'umi';

......
 const masterProps = useModel('@@qiankunStateFromMaster');
 const {action} = masterProps;
 actions.setGlobalState({ shouldForceCloseModal: true });
......

```

### 其他子组件

#### BusinessManager

    用于展示当前用户的待办列表，mounted后或当前展示代办数据变化时时刷新列表。

```jsx
import React, { useRef } from 'react';
import { BusinessManager } from '@jusda-tools/workflow-task-manager';
const App: React.FC = () => {
  const listRef = (useRef < HTMLSpanElement) | (null > null);

  useEffect(()=>{
      listRef.current?.updateTableData(); // 更新table数据
  },[])
  return (
    <BusinessManager 
        modalProps={modalProps} 
        locale={locale} 
        ref={listRef} 
    />
  );
};
```

| 参数       | 说明     | 类型                        | 默认    | 备注 |
| ---------- | -------- | --------------------------- | ------- | ---- | --- |
| locale     | 国际化   | string                      | 'en-US' |      |     |
| modalProps | 弹框配置 | Omit<ModalProps, "visible"> | -       | -    |
| ref | ref可获取到更新列表数据的方法updateTableData | - | -       | -    |


#### deserializeContextData

用于反序列化流程中的流程变量的方法。

示例数据：
```json
{
    "ProcessBusinessContext__businessBean__negotiateDeliveryDate__timeZone": "utc-8",
    "ProcessBusinessContext__businessBean__poDeliveryPlanItem": "[{\"id\":4991657703509909505,\"planDeliveryNum\":3,\"relateId\":4926378916479995904,\"relateItemId\":4926378916479995905}]",
    "ProcessCustomerContext__isDeliveryNotice": false,
     "ProcessCustomerContext__businessBean__userId": null,
    "ProcessBusinessContext__businessBean__userId": null,
    "ProcessBusinessContext__businessBean__negotiateDeliveryDate__utcDate": null,
}

```
数据中ProcessBusinessContext开头的及ProcessGlobalContext__userContext开头的所有数据会被过滤掉。
以上示例数据通过deserializeContextData方法处理后，结果为：

```jsx
{
    "ProcessCustomerContext": {
        "isDeliveryNotice": false,
        "businessBean": {
            "userId": null
        }
    }
}
```

```jsx
import { deserializeContextData } from '@jusda-tools/workflow-task-manager';

deserializeContextData({
    // json data...
});
```

#### 更新记录

| 版本号 | 更新内容                                         |
| ------ | ------------------------------------------------ |
| 0.0.1  | 组件初始化，提供列表和 icon 及反序列化方法的导出 |
| 0.0.2  | 跟新readme及添加组件.d.ts文件 |
| 0.0.3  | 废弃，更新组件包 |
| 0.0.4  | 废弃，更新组件包 |
| 0.0.5  | 更新列表渲染及请求逻辑，增加对子应用得传参 |
| 0.0.6  | 更新组件包 |
| 0.0.7  | 修复了向微应用传参被任务详情参数覆盖的问题 |
