# metadata-ui-render 元数据渲染组件

## API

### metadata-ui-render

该组件通过 tenantCode 及 UI 元数据 code 自动查询元数据配置。注入上下文中，并提供了 FormRender 组件进行渲染。
该组件提供了：

#### MetadataFunctionContext

功能元数据上下文，可从中获取到传入的参数及从接口获取到的元数据配置。

```jsx
import { useContext } from 'react';
import { MetadataFunctionContext } from '@jusda-tools/metadata-ui-render';

export default function ComponentTest() {
  const {
    getUIConfOfCustomAreas: (areaCodes: string[]) => CustomAreaUiConf[];
    getConfOfStandardProperties: ( propertyPaths: string[]) => PropertyConfigWithUI[],
    // 将传入的表单数据用对应扩展区域绑定模型的扩展字段配置，如果绑定了DATETIME类型的数据元，那么值将被初始化为moment对象
    formatValueAccordToCustomAreaConf: (
        value: any,
        customAreaCode: 'string',
        options?: {
            valueHandler?: (
                value: any,
                propertyConfig: {
                    name: string;
                    [key: string]: any;
                    dataElement: {
                        type: DateElementType;
                        formatStrategy: any;
                        [key: string]: string;
                    };
                },
            ) => any;
        },
    ) => any;
    // 将传入的表单数据用对应扩展区域绑定模型的扩展字段配置，如果绑定了DATETIME类型的数据元，那么值将用数据元配置的format格式化为字符串
    inverseFormatValueAccordToCustomAreaConf: (
        value: any,
        customAreaCode: 'string',
        options?: {
            valueHandler?: (
                value: any,
                propertyConfig: {
                    name: string;
                    [key: string]: any;
                    dataElement: {
                        type: DateElementType;
                        formatStrategy: any;
                        [key: string]: string;
                    };
                },
            ) => any;
        },
    ) => any;
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
| ------------ | ---------------------------- | ------------------------------- | ------------------------------ | ---- | 
| functionCode | UI 元数据功能 code           | string                          | -                              |      |     
| tenantCode   | 租户 code                    | string                          | 从 window.jusdaUserInfo 中获取 | -    |
| 其他参数     | 继承 Context.Provider 的参数 | {children：any, value: any,...} | -                              | -    |

#### CustomAreaFormRender

自动注入元数据上下文，并通过上下文中的 schema 参数对某一自定义区域进行渲染。该组件参数继承了除 schema 外其他的 FormRender 参数。请在 MetadataFunctionContextProvider 中使该组件。
请参考 https://xrender.fun/form-render/api/props
自动初始化上下文的组件。

| 参数     | 说明            | 类型   | 默认 | 备注 |
| -------- | --------------- | ------ | ---- | ---- | 
| areaCode | 自定义区域 Code | string | ''   |      |     

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
| ---------- | ---------------------------- | ------------------------------- | ------------------------------ | ---- | 
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

#### formatQueryValueAccordToFunctionConf

根据列表类型功能的搜索配置整理传入的 formdata 为查询接口接收类型的数据
| 参数 | 说明 | 类型 | 默认 | 备注 |
| ---------- | ---------------------------- | ------------------------------- | ------------------------------ | ---- |
| formdata | 表单数据 | { [key: string]: string | { start: any; operator: string; end?: any } } | - |

```jsx | pure
import React, { useContext } from 'react';
import {
  MetadataFunctionContextProvider,
  MetadataFunctionContext,
} from '@jusda-tools/metadata-ui-render';
import { Button } from 'antd';

const Test = (props) => {
  const contextValue = useContext(MetadataFunctionContext);
  const {
    formatQueryValueAccordToFunctionConf,
  } = contextValue;
  return (
    <Button
      onClick={() => {
        const formattedFormdata = formatQueryValueAccordToFunctionConf({
          code: '4342',
          birthday: '2017-3-1',
          transportModeCodeEq: 'rwrwerew',
        });
        console.log('data', formattedFormdata);
        //
      }}
    >
      Click Here
    </Button>
  );
};
```

#### getListTypeFunctionQueryPropertyConfig

获取列表功能中配置的搜索区域标准字段和扩展字段列表，并添加字段标识及字段显示名配置，按照sequence属性升序排序

```jsx | pure
import React, { useContext } from 'react';
import {
  MetadataFunctionContextProvider,
  MetadataFunctionContext,
} from '@jusda-tools/metadata-ui-render';
import { Button } from 'antd';

const Test = (props) => {
  const contextValue = useContext(MetadataFunctionContext);
  const {
    getListTypeFunctionQueryPropertyConfig,
  } = contextValue;
  return (
    <Button
      onClick={() => {
        const data = getListTypeFunctionQueryPropertyConfig();
        console.log('data', data);
        //
      }}
    >
      Click Here
    </Button>
  );
};
```

#### getListTypeFunctionTablePropertyConfig

获取列表功能中配置的列表区域标准字段和扩展字段列表，并添加字段标识及字段显示名配置，按照sequence属性升序排序

```jsx | pure
import React, { useContext } from 'react';
import {
  MetadataFunctionContextProvider,
  MetadataFunctionContext,
} from '@jusda-tools/metadata-ui-render';
import { Button } from 'antd';

const Test = (props) => {
  const contextValue = useContext(MetadataFunctionContext);
  const {
    getListTypeFunctionTablePropertyConfig,
  } = contextValue;
  return (
    <Button
      onClick={() => {
        const data = getListTypeFunctionTablePropertyConfig();
        console.log('data', data);
        //
      }}
    >
      Click Here
    </Button>
  );
};
```

#### getMetadataTableColumns
获取列表功能中配置的列表区域标准字段和扩展字段升序排列List，并处理成antd表格columns需要的基础数据，如：dataIndex，title
```jsx | pure
import React, { useContext } from 'react';
import {
  MetadataFunctionContextProvider,
  MetadataFunctionContext,
} from '@jusda-tools/metadata-ui-render';
import { Button } from 'antd';

const Test = (props) => {
  const contextValue = useContext(MetadataFunctionContext);
  const {
    getMetadataTableColumns,
  } = contextValue;
  return (
    <Button
      onClick={() => {
        const data = getMetadataTableColumns();
        console.log('data', data);
        //
      }}
    >
      Click Here
    </Button>
  );
};
```



#### MetadataRender

自动初始化上下文及 FormRender 渲染。仅获取模型根路径下的 ui 配置及全量属性配置。

| 参数       | 说明           | 类型         | 默认                           | 备注 |
| ---------- | -------------- | ------------ | ------------------------------ | ---- | 
| code       | UI 元数据 code | string       | -                              |      |     
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
| ---------------------- | ------------------------------------------------------------------------ | ------------------------------- | ------------------------------ | ---- | 
| code                   | UI 元数据 code                                                           | string                          | -                              |      |     
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
| ---- | ----------------- | ------ | ---- | ---- | 
| path | ui 配置的所属路径 | string | ''   |      |     

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
| ---------- | ---------------------------- | ------------------------------- | ------------------------------ | ---- | 
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
| ---------- | ---------------------------- | ------------------------------- | ------------------------------ | ---- | 
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


#### 更新记录

| 版本号        | 更新内容                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------- |
| 0.0.1         | 组件初始化，提供元数据渲染组件及其他子组件的导出                                               |
| 0.0.2         | 修复组件引用后影响项目 antd 组件样式                                                           |
| 0.0.20        | 将获取模型的 UI 元数据配置方法暴露出来                                                         |
| 0.1.1         | 修改获取数据接口及数据初始化，上下文数据结构更改及增加组件传参,增加了导出的接口请求方法        |
| 0.3.1         | 增加功能相关的数据上下文组件、功能内自定义区域渲染组件，及标准字段配置和自定义区域配置查询方法 |
| 0.3.5         | 功能配置上下文中增加了数据加载请求的状态参数                                                   |
| 0.3.6 ~ 0.3.9 | schema 通过配置注入对应语言的显示名                                                            |
| 0.3.10        | 提供数据的格式化方法，主要处理时间字段的转换                                                   |
| 1.0.0         | 将引用的 form-render 版本固定，并将引用版本的 form-render 相关方法提供出来                     |
| 1.1.0         | 提供列表功能的搜索配置获取方法和转换表单数据为扩展字段查询数据的方法                  |
| 1.2.0        | 提供列表功能的列表区域配置获取方法及列表区域配置转为antd的Table columns标准数据的方法               |
