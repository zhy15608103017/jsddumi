---
title: Json Schema 编辑器
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# Json Schema 编辑器

## API
### json-schema-editor
| 参数    | 说明                   | 类型                                  | 默认  | 备注 |
| ------- | ---------------------- | ------------------------------------- | ----- | ---- |
| schemaRoot    | 设置$id参数           | string          | -     | -    |
| onSchemaChange  | schema值改变回调| function(schema)   | -    |-|
| data | 初始值     | {}                       | -     | -    |
| readOnly  | 只读标志         | boolean                                | false    | -    |
| locale  | 语言参数        |   "zh-CN"|"en-US"                              | "en-US"    | -    |

## Example

<!-- ```jsx
import React from 'react';
import JsonSchemaEditor from '@jusda-tools/cascader';
// import '../../packages/cascader/node_modules/antd/dist/antd.css';
function Test () {
    const onSchemaChange = (data) => {
        console.log(data);
    }

    return (<div>
                <JsonSchemaEditor 
                schemaRoot='testJusda'
                onSchemaChange={onSchemaChange} 
                locale="zh-CN"
                />
            </div>)
}
export default Test;
``` -->
