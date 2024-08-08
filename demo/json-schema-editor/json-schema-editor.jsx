import React from 'react';
import JsonSchemaEditor from '@jusda-tools/json-schema-editor';

function Test() {
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