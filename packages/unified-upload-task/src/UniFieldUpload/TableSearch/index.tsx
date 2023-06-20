import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Row, Button } from 'antd';
import { itemNodeMap } from './config';
import classNames from 'classnames';
import './index.less';
import { Col } from 'antd';
import getLocale from '../../locale';
import { currentLanguage } from '@jusda-tools/language-control-panel';

type props = {
    config?: any;
    handleOk?: any;
    formDefault?: {};
    onValuesChange?: any;
    setSiteOptionsList?: any;
    buttonLayout?: 'button-right' | 'inline';
    onReset?: () => void;
    locale?:any
};
const TableSearch = (props: props, ref: any) => {
    const {
        handleOk,
        config,
        formDefault,
        onValuesChange,
        setSiteOptionsList = null,
        buttonLayout = 'inline',
        locale
    } = props;
    const currentLocale: any = getLocale(currentLanguage());
    const [form] = Form.useForm();
    const formItemFn = (config: any) => {
        const Items = config.map((item: any) => {
            const { type, customRenderNode } = item;
            // 自定义form.item
            if (customRenderNode) {
                return customRenderNode;
            }
            if (itemNodeMap.has(type)) {
                return itemNodeMap.get(type)(item);
            }
            return null;
        });
        return Items;
    };
    const onReset = async () => {
        form.resetFields();
        if (props?.onReset) {
            props?.onReset();
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setSiteOptionsList && setSiteOptionsList();
        form.validateFields().then(async v => {
            await handleOk(v);
        });
    };
    useImperativeHandle(ref, () => ({
        // 暴露给父组件的属性方法
        Form: form,
    }));
    const onFinish = async (value: any) => {
        if (value) {
            await handleOk(value);
        }
    };
    return (
        <div className="table-select">
            <Form
                requiredMark="optional"
                form={form}
                initialValues={formDefault}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
                layout={buttonLayout === 'inline' ? 'inline' : undefined}
            >

                <div style={{display:'flex'}}>
                    <div style={{ width: '100%' }}>
                        <Row>{formItemFn(config)}</Row>
                    </div>
                    <div
                        className={classNames({
                            [`table-select-${buttonLayout}`]: true,
                        })}
                    >
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {currentLocale['searchButton']}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={onReset}>
                                {currentLocale['resetButton']}
                            </Button>
                        </Form.Item>
                    </div>
                </div>



            </Form>
        </div>
    );
};
export default forwardRef(TableSearch);
