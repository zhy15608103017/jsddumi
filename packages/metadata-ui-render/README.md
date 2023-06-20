# metadata-ui-render 元数据渲染组件

## API

### metadata-ui-render

该组件通过 tenantCode 及 UI 元数据 code 自动查询元数据配置。注入上下文中，并提供了 FormRender 组件进行渲染。
该组件提供了：

#### MetadataRender

自动初始化上下文及 FormRender 渲染。仅获取模型根路径下的 ui 配置及全量属性配置。

| 参数       | 说明           | 类型         | 默认                           | 备注 |
| ---------- | -------------- | ------------ | ------------------------------ | ---- | --- |
| code       | UI 元数据 code | string       | -                              |      |     |
| form       | 主题           | FormInstance | -                              | -    |
| tenantCode | 租户 code      | string       | 从 window.jusdaUserInfo 中获取 | -    |

```jsx
import React from 'react';
import MetadataRender from '@jusda-tools/metadata-ui-render';
import { useForm } from 'form-render';

const App: React.FC = () => {
  const form = useForm();
  return (
    <div>
      <MetadataRender
        code={
          'juslink-4pl-oms-demo_com.jusdaglobal.oms.domain.model.shipment.ShipmentOrder'
        }
        form={form}
      />
    </div>
  );
};

export default App;
```

### 其他子组件

#### MetadataContextProvider

自动初始化上下文的组件。

| 参数                   | 说明                                                                     | 类型                            | 默认                           | 备注 |
| ---------------------- | ------------------------------------------------------------------------ | ------------------------------- | ------------------------------ | ---- | --- |
| code                   | UI 元数据 code                                                           | string                          | -                              |      |     |
| tenantCode             | 租户 code                                                                | string                          | 从 window.jusdaUserInfo 中获取 | -    |
| pathList               | ui 配置所属路径，在 propertyLoadStrategyEq 为 'PREFIX'时也会过滤属性配置 | string[]                        | []                             | -    |
| includeRootPath        | pathList 中是否注入模型根路径用于请求 ui 配置                            | boolean                         | true                           | -    |
| propertyLoadStrategyEq | 用于请求模型配置传参，决定了属性配置是否需要根据 pathList 参数过滤       | ‘ALL’/‘PREFIX’                  | ‘ALL’                          | -    |
| 其他参数               | 继承 Context.Provider 的参数                                             | {children：any, value: any,...} | -                              | -    |

```jsx
import React from 'react';
import {
  MetadataContextProvider,
  MetadataFormRender,
} from '@jusda-tools/metadata-ui-render';
import { useForm } from 'form-render';

const App: React.FC = () => {
  const form = useForm();
  return (
    <div>
      <MetadataContextProvider
        code={
          'juslink-4pl-oms-demo_com.jusdaglobal.oms.domain.model.shipment.ShipmentOrder'
        }
        value={{
          // ...业务自定义数据
          test: 'test1',
        }}
      >
        <Button
          onClick={() => {
            console.log('Save', form.getValues());
            //
          }}
        >
          Save
        </Button>
        <MetadataFormRender form={form}></MetadataFormRender>
      </MetadataContextProvider>
    </div>
  );
};

export default App;
```

#### MetadataContext

元数据上下文，可从中获取到传入的参数及从接口获取到的 UI 元数据配置。

```jsx
import { useContext } from 'react';
import { MetadataContext } from '@jusda-tools/metadata-ui-render';

export default function ComponentTest() {
  const value = useContext(MetadataContext);
  return <div>{JSON.stringify(value)}</div>;
}
```

#### MetadataRender

自动注入元数据上下文，并通过上下文中的 schema 参数进行渲染。该组件参数继承了除 schema 外其他的 FormRender 参数。请在 MetadataContextProvider 中使该组件。
请参考 https://xrender.fun/form-render/api/props
自动初始化上下文的组件。

| 参数 | 说明              | 类型   | 默认 | 备注 |
| ---- | ----------------- | ------ | ---- | ---- | --- |
| path | ui 配置的所属路径 | string | ''   |      |     |

```ts
interface MetadataRenderProps extends Omit<FRProps, 'schema'>
```

```jsx
import React from 'react';
import {
  MetadataContextProvider,
  MetadataFormRender,
} from '@jusda-tools/metadata-ui-render';
import { useForm } from 'form-render';

const App: React.FC = () => {
  const form = useForm();
  return (
    <div>
      <MetadataContextProvider
        code={
          'juslink-4pl-oms-demo_com.jusdaglobal.oms.domain.model.shipment.ShipmentOrder'
        }
      >
        <MetadataFormRender form={form} path=""></MetadataFormRender>
      </MetadataContextProvider>
    </div>
  );
};

export default App;
```

#### getTenantModalUIMetadata

通过此方法可以获得租户对应模型的 UI 元数据配置。
| 参数 | 说明 | 类型 | 默认 | 备注 |
| ---------- | ---------------------------- | ------------------------------- | ------------------------------ | ---- | --- |
| tenantCode | 租户 code | string | - | - |
| standardModelCodeEq | 模型 code |string| - | - |

```jsx
import {
    getTenantModalUIMetadata,
    getTenantModelConfiguration
} from '@jusda-tools/metadata-ui-render';

const result = async getTenantModalUIMetadata(
  'tenantCode',
  'juslink-4pl-oms-demo_com.jusdaglobal.oms.domain.model.shipment.ShipmentOrder'
  )

```

#### getTenantModelConfiguration

通过此方法可以获得租户对应模型的 UI 元数据配置。
| 参数 | 说明 | 类型 | 默认 | 备注 |
| ---------- | ---------------------------- | ------------------------------- | ------------------------------ | ---- | --- |
| tenantCode | 租户 code | string | - | - |
| data | {standardModelCodeEq: string;
propertyPathIn: string[];
propertyLoadStrategyEq: "ALL"|"PREFIX";} | object| - | - |

```jsx
import {
    getTenantModelConfiguration
} from '@jusda-tools/metadata-ui-render';

const result = async getTenantModelConfiguration(
  'tenantCode',
  {
    standardModelCodeEq:'juslink-4pl-oms-demo_com.jusdaglobal.oms.domain.model.shipment.ShipmentOrder',
    propertyPathIn: [''],
    propertyLoadStrategyEq: "ALL"
    }
  )

```

#### MetadataFunctionContext

功能元数据上下文，可从中获取到传入的参数及从接口获取到的元数据配置。

```jsx
import { useContext } from 'react';
import { MetadataFunctionContext } from '@jusda-tools/metadata-ui-render';

export default function ComponentTest() {
  const {
    getUIConfOfCustomAreas: (areaCodes: string[]) => CustomAreaUiConf[];
    getConfOfStandardProperties: ( propertyPaths: string[]) => PropertyConfigWithUI[],
    ...value} = useContext(MetadataFunctionContext);
  return <div>{JSON.stringify(value)}</div>;
}
```

###### interface CustomAreaUiConf

```jsx
{
  areaCode: string;
  standardModelCode: string;
  language: any;
  name: string;
  schema: any;
  extensionalPropertyUiList?: {
      propertyName: string;
      label: string;
  }[];
}
```


###### interface PropertyConfigWithUI
```jsx
{
    defaultValue: string;
    defaultValueEnabled: boolean;
    propertyPath: string;
    required: boolean;
    rootStandardModelCode: string;
    visible: boolean;
}
```

#### MetadataFunctionContextProvider

自动初始化功能元数据上下文的组件。

| 参数         | 说明                         | 类型                            | 默认                           | 备注 |
| ------------ | ---------------------------- | ------------------------------- | ------------------------------ | ---- | --- |
| functionCode | UI 元数据功能 code           | string                          | -                              |      |     |
| tenantCode   | 租户 code                    | string                          | 从 window.jusdaUserInfo 中获取 | -    |
| 其他参数     | 继承 Context.Provider 的参数 | {children：any, value: any,...} | -                              | -    |

#### CustomAreaFormRender

自动注入元数据上下文，并通过上下文中的 schema 参数对某一自定义区域进行渲染。该组件参数继承了除 schema 外其他的 FormRender 参数。请在 MetadataFunctionContextProvider 中使该组件。
请参考 https://xrender.fun/form-render/api/props
自动初始化上下文的组件。

| 参数     | 说明            | 类型   | 默认 | 备注 |
| -------- | --------------- | ------ | ---- | ---- | --- |
| areaCode | 自定义区域 Code | string | ''   |      |     |

```jsx
import React from 'react';
import {
  MetadataFunctionContextProvider,
  CustomAreaFormRender,
} from '@jusda-tools/metadata-ui-render';
import { useForm } from 'form-render';

const App: React.FC = () => {
  const form = useForm();
  return (
    <div>
      <MetadataFunctionContextProvider
        tenantCode="TEN_5004822448287686656"
        functionCode="FunctionOne"
        value={{
          // ...业务自定义数据
          test: 'test1',
        }}
      >
        <Button
          onClick={() => {
            console.log('Save', form.getValues());
            //
          }}
        >
          Save
        </Button>
        <CustomAreaFormRender areaCode="milestone" form={form} />
      </MetadataFunctionContextProvider>
    </div>
  );
};

export default App;
```


#### getTenantFunctionConfiguration

通过此方法可以获得租户的功能 UI 元数据配置。
| 参数 | 说明 | 类型 | 默认 | 备注 |
| ---------- | ---------------------------- | ------------------------------- | ------------------------------ | ---- | --- |
| tenantCode | 租户 code | string | - | - |
| data | {functionCode: string;} | object| - | - |

```jsx
import {
    getTenantFunctionConfiguration
} from '@jusda-tools/metadata-ui-render';

const result = async getTenantFunctionConfiguration(
  'tenantCode',
  {
    functionCode:'FunctionOne',
  }
  )

```

#### 更新记录

| 版本号 | 更新内容                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------- |
| 0.0.1  | 组件初始化，提供元数据渲染组件及其他子组件的导出                                               |
| 0.0.2  | 修复组件引用后影响项目 antd 组件样式                                                           |
| 0.0.20 | 将获取模型的 UI 元数据配置方法暴露出来                                                         |
| 0.1.1  | 修改获取数据接口及数据初始化，上下文数据结构更改及增加组件传参,增加了导出的接口请求方法        |
| 0.3.1  | 增加功能相关的数据上下文组件、功能内自定义区域渲染组件，及标准字段配置和自定义区域配置查询方法 |
