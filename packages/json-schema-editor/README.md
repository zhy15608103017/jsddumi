# json-schema-editor Json Schema 编辑器

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

```jsx
import JsonSchemaEditor from '@jusda-tools/json-schema-editor';
function Test () {
    const onSchemaChange = (data) => {
        console.log(data);
    }

    return <div>
        <JsonSchemaEditor 
          schemaRoot='testJusda'
          onSchemaChange={onSchemaChange} 
          locale="zh-CN"
        />
    </div>
}
```

