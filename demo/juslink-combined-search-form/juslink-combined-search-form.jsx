import CombinedForm from '@jusda-tools/juslink-combined-search-form';
import { useEffect, useState } from 'react'
import { Form, Popconfirm, Select, Input, Button, Row, Col, Space} from 'antd';

const ConditionForm = (props) => {
    const [form] = Form.useForm();
    const { children, defaultValue, onConfirm } = props;
    useEffect(() => {
        if (!defaultValue) return;
        form.setFieldsValue(defaultValue);
    }, [defaultValue])

    return <Popconfirm
        icon={<></>}
        placement="bottomLeft"
        title={<Form form={form} className='editorConditionForm' layout="vertical">
            <Row>
                <Col span={11}><Form.Item name="conditionName" label="条件">
                    <Select getPopupContainer={() => document.querySelector('.editorConditionForm')} options={[{ label: '编码', value: 'code' }, { label: '名称', value: 'name' }]} />
                </Form.Item>
                </Col>
                <Col span={11} push={2}><Form.Item name="operator" label="操作">
                    <Select getPopupContainer={() => document.querySelector('.editorConditionForm')} options={[{ label: '等于', value: 'IS' }]} />
                </Form.Item>
                </Col>
                <Col span={24}><Form.Item name="conditionValue" label="值">
                    <Input></Input>
                </Form.Item>
                </Col>
            </Row>
        </Form>}
        okText={'搜索'}
        onConfirm={() => {
            const newCondition = form.getFieldsValue();
            console.log('vnewCondition', newCondition)
            onConfirm && onConfirm(newCondition, form);
        }}
    >
        {children}
    </Popconfirm>

}


const AppLayout = (props) => {

    const [conditions, setConditions] = useState([{ conditionName: 'name', conditionValue: 'value', operator: 'operator' }]);
    const [conditions1, setConditions1] = useState([{ conditionName: 'name', conditionValue: 'value', operator: 'operator' }]);

    const [form] = Form.useForm()
    return (
        <>
            {/* <CombinedForm
                value={conditions}
                mode={'single'}
                onChange={(newValue) => {
                    setConditions(newValue);
                }}
            /> */}
            <br />
            <CombinedForm
                value={conditions1}
                mode={'multiple'}
                onChange={(newValue) => {
                    setConditions1(newValue);
                }}
                editorFilterButtonRender={(defaultDom, item) => {
                    return <ConditionForm
                        key={item.conditionName}
                        defaultValue={item}
                        onConfirm={(newCondition, _form) => {
                            const targetIndex = conditions1.findIndex(ele => ele.conditionName === newCondition.conditionName);
                            if (targetIndex < 0) {
                                setConditions1([...conditions1, newCondition]);
                                return
                            }
                            conditions1.splice(targetIndex, 1, newCondition)
                            setConditions1([...conditions1]);
                        }}
                    >
                        {defaultDom}
                    </ConditionForm>
                }}
                addFilterButtonRender={(defaultDom, addFilter) => {
                    return <Popconfirm
                        icon={<></>}
                        placement="bottomLeft"
                        onPopupClick={(e) => {
                            console.log('popupClick', e)

                        }}
                        onCancel={(...arg) => {
                            console.log('onCancel', arg)
                        }}
                        title={<Form form={form} className="createConditionForm" layout="vertical">
                            <Row>
                <Col span={11}> <Form.Item name="conditionName" label="条件">
                                <Select getPopupContainer={() => document.querySelector('.createConditionForm')} options={[{ label: '编码', value: 'code' }, { label: '名称', value: 'name' }]}></Select>
                            </Form.Item></Col>
                            <Col span={11} push={2}><Form.Item name="operator" label="操作">
                                <Select getPopupContainer={() => document.querySelector('.createConditionForm')} options={[{ label: '等于', value: 'IS' }]}></Select>
                            </Form.Item>
                            </Col>
                            <Form.Item name="conditionValue" label="值">
                                <Input></Input>
                            </Form.Item>
                            </Row>
                        </Form>}
                        okText={'搜索'}
                        onConfirm={(...arg) => {
                            const newCondition = form.getFieldsValue();
                            const targetIndex = conditions1.findIndex(ele => ele.conditionName === newCondition.conditionName);
                            if (targetIndex < 0) {
                                setConditions1([...conditions1, newCondition]);
                                return
                            }
                            conditions1.splice(targetIndex, 1, newCondition)
                            setConditions1([...conditions1]);
                        }}
                        onVisibleChange={(visible) => {
                            if (!visible) {
                                form.resetFields();
                            }
                        }}
                        overlayStyle={{ zIndex: 500 }}
                    >
                        {defaultDom}
                    </Popconfirm>
                }}
            />
        </>

    );
};

export default AppLayout;