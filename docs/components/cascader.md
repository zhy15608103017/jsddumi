---
title: cascader 级联组件
nav: 组件
toc: content
group:
    title: 业务组件
    order: 2
---

# cascader

## API
### cascader组件

| 名称 | 描述 | 类型 | 可选值 | 默认值 |
| :-----------: |:--------:|:-----:|:--:|:-----:|
| disabled | 级联组件是否可用 | boolean | true/false | false |
| onChange | 值变化时，调用此函数 | function(value) | - | - |

## Example

```jsx
import React, {useEffect, useLayoutEffect} from 'react';
import { Cascader } from '@jusda-tools/cascader';
import {Form, Button, Input} from 'antd';
import 'antd/dist/antd.css';

function Test() {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({'username': {
                country: {value: 'CN'},
                subdivision: {value: 'CN-11'},
                city: { value: 'SCI105445'},
                county: { value: 'SCT106644'},
            }, 'uuu': '1234'
        });
    }, [])

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<div>
        <Form
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            form={form}
            // initialValues={{
            //     username: {
            //         country: {value: 'CN', label: 'CHINA'},
            //         subdivision: {value: 'CN-11', label: 'BEIJING'},
            //         city: {value: 'SCI105445', label: 'BEIJING'},
            //         county: {value: 'SCT106644', label: 'DAXING'},
            //     },
            //     uuu: 'dddd'
            // }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Cascader
                />
            </Form.Item>
            <Form.Item
                label="uuuu"
                name="uuu"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>)
}

export default Test;
```

### MetaSelect组件(通过自定义配置和业务代码，可以使用此组件实现自定义级联组件)

具体如何使用MetaSelect组件实现级联效果，请查看cascader组件的源码

| 名称 | 描述 | 类型 | 可选值 | 默认值 |
| :-----------: |:--------:|:-----:|:--:|:-----:|


## 更新日志
###### 0.1.0更新内容:
```
后端jusda-basic服务取消，切换到master-data-management服务上，无其他功能更新
```
