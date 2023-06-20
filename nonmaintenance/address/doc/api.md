# 文档
这是一个 address 库，有选择和修改 address 功能


## 简易用法

* antd v3

```jsx
import {  Form, Row, Col } from 'antd';
import Address, { createForm3,createForm4,  AddressFormItem } from '@jusda-tools/address';
import '@jusda-tools/address/dist/jusda-address.css';

const Demo = ( props ) => {
    const {form} = props;
    const {getFieldDecorator} = form;
    const [id, setId] = React.useState();
    return (
        <Form>
             <Row style={{ width: '100%' }}>
                    <Col span={12}>

                        <Address
                            selectStyle={{ width: '50%' }}
                            // handleChangeDetail={(detail) => console.log(detail)}
                            type="SHIPPER"
                            form={form}
                            options={
                                    initialValue: "xxxxxxxxxx",
                                     rules: [{ required: true }],
                            }
                            rules={[
                                {
                                    required: true,
                                    message: '请填写发货方',
                                },
                            ]}
                            formComponent={createForm3(Form, getFieldDecorator)}
                            onChange={(
                                value,
                                isValueChange,
                            ) => {
                                // console.log(value, isValueChange);
                                setId(value)
                                form.setFieldsValue({
                                    'xxxxx': undefined
                                })

                            }}
                        />
                    </Col>

                    <Col span={12}>
                        <Form.Item>
                            {
                                getFieldDecorator('xxxxx', {})(
                                <AddressFormItem
                                selectStyle={{ width: '50%' }}
                                label={'发货地址'}
                                contactPartnerId={id}
                                disable={disable}
                                />
                                )

                            }

                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        
    
    )
}

export default Form.create()(Demo);


```


* antd 4


```

import Address, { createForm4 } from '@jusda-tools/address';
import '@jusda-tools/address/dist/jusda-address.css';

...
return (


                      <Address
                            selectStyle={{ width: '50%' }}
                            type="SHIPPER"
                            form={form}
                            options={
                                    initialValue: "xxxxxxxxxx",
                                     rules: [{ required: true }],
                            }
                           
                            formComponent={createForm4(Form)}
                            onChange={(
                                value,
                                isValueChange,
                            ) => {
                                 <!-- console.log(value, isValueChange); -->
                            }}
                        />

) 


```

## api 


type types = "SHIPPER" | "CONSIGNEE" | "NOTIFY_PARTY";

```js
// 代码
```

特殊说明，比如特殊情况下会报错等
