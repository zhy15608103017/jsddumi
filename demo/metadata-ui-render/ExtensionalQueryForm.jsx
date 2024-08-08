import React, { useEffect, useState } from 'react';
import {
    MetadataFunctionContextProvider,
    CustomAreaFormRender,
    MetadataFunctionContext
} from '@jusda-tools/metadata-ui-render';
import { Form, Button, Input } from 'antd';
import ComponentTest from './ExtensionalQueryComponent'


const App = () => {
    const [inputForm] = Form.useForm();
    const [functionInfo, setFunctionInfo] = useState({ functionCode: 'functionType-list2', tenantCode: 'TEN_5004822448287686656' });

    useEffect(() => {
        inputForm.setFieldsValue(functionInfo);
    }, [functionInfo])
    return (
        <div>
            <Form
                layout="inline"
                form={inputForm}
                style={{margin: '8px 0'}}
            >
                <Form.Item label="功能编码" required name="functionCode">
                    <Input />
                </Form.Item>
                <Form.Item label="租户编码" name="tenantCode">
                    <Input />
                </Form.Item>
                <Button onClick={async () => {
                    const newV = await inputForm.validateFields();
                    setFunctionInfo(newV);
                }}>确认</Button>
            </Form>
            <MetadataFunctionContextProvider
                tenantCode={functionInfo?.tenantCode}
                functionCode={functionInfo?.functionCode}
                value={{
                    // ...业务自定义数据
                    test: 'test1',
                }}
            >
                <ComponentTest />
            </MetadataFunctionContextProvider>
        </div>
    );
};

export default App;