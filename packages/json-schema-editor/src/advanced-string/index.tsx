/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable linebreak-style */
import * as React from 'react';
import {
    Row, Col, Input, InputNumber, Select, Form, Button, Space, 
} from 'antd';
import {SchemaContext} from '../model'
import {getDefaultSchema, StringFormat, DataType} from '../utils'
import {
    JsonSchemaType,
    JsonSchemaString,
    JsonSchemaEnum
} from '../json-schema.types';

const { Option } = Select
export interface SchemaObjectProps {
    lens: string[];
    closeModal?: () => void;
};

export const AdvancedString: React.FunctionComponent<SchemaObjectProps> = (
    props: React.PropsWithChildren<SchemaObjectProps>
) => {
    const {lens, closeModal=()=>{}} = props
    const [form] = Form.useForm()

    // const onChangeCheckBox = (
    // 	checked: boolean,
    // 	callback: ((newValue: string[] | null, lens: string[]) => void) | undefined
    // ): void => {
    // 	if (callback) {
    // 		const newState = checked ? new Array<string>() : null
    // 		callback(newState, lens)
    // 	}
    // }

    // const changeEnumOtherValue = (
    // 	value: string,
    // 	callback: ((newValue: string[] | null, lens: string[]) => void) | undefined
    // ): void => {
    // 	const array = value.split('\n')
    // 	if (array.length === 0 || (array.length === 1 && !array[0])) {
    // 		if (callback) {
    // 			callback(null, lens)
    // 		}
    // 	} else if (callback) {
    // 		callback(array, lens)
    // 	}
    // }

    return (
        <SchemaContext.Consumer>
            {(schema) => {
                const initial: JsonSchemaType = getDefaultSchema(
                    DataType.string,
                    schema.schemaRoot
                )
                const data = schema.getDataByLens && schema.getDataByLens(lens)? schema.getDataByLens(lens) : initial
                // const isEnumChecked = (data as JsonSchemaEnum).enum !== undefined
                const enumData = data as JsonSchemaEnum
                // const enumValue = enumData?.enum?.join('\n')
                form.setFieldsValue(data);
                return (
					<>
					<Form layout="vertical" form={form}>
					    {/* <Row>
							<Form.Item label={schema.localesLab['defaultValue']}>
								<Input
									id="default"
									placeholder={schema.localesLab['enterDefaultValue']}
									value={data.default ?? ''}
									onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
										if (schema.changeAdvancedProperty) {
											schema.changeAdvancedProperty(
												evt.target.value,
												lens,
												'default'
											)
										}
									}}
								/>
							</Form.Item>
						</Row> */}
					    <Form.Item 
					        name='maxLength' 
					        label={schema.localesLab['maxLength']}
					        dependencies={['minLength']}
					        rules={[({ getFieldValue }) => ({
					            validator(_, value) {
					                const minLength = getFieldValue('minLength');
					                if (
					                    !value || (!minLength && minLength !== 0) ||
											value > minLength
					                ) {
					                    return Promise.resolve();
					                }
					                return Promise.reject(new Error('最大值必须大于最小值'));
					            },
					        })]}
					    >
					        <InputNumber
					            precision={0}
					            min={0}
								style={{ width: '100%' }}
					        />
					    </Form.Item>
					    <Form.Item
					        name='minLength'
					        label={schema.localesLab['minLength']}
					        dependencies={['maxLength']}
					        rules={[({ getFieldValue }) => ({
					            validator(_, value) {
										  const maxLength = getFieldValue('maxLength');
										  if (
					                    !value || (!maxLength && maxLength !== 0 )||
											value < maxLength
										  ) {
					                    return Promise.resolve();
										  }
										  return Promise.reject(new Error('最小值必须小于最大值'));
					            },
									  })]}
					    >
					        <InputNumber
					            precision={0}
					            min={0}
								style={{ width: '100%' }}
							/>
					    </Form.Item>
					    <Form.Item name="pattern" label={schema.localesLab['pattern']}>
					        <Input
					            id="pattern"
					            placeholder={schema.localesLab['patternPlaceholder']}
					        />
					    </Form.Item>
					    <Form.Item name="format" label={schema.localesLab['format']}>
					        <Select
					            placeholder={schema.localesLab['dataTypePlaceholder']}
					        >
					            {StringFormat.map((item, index) => {
					                return (
					                    <Option key={String(index)} value={item.name}>
					                        {item.name}
					                    </Option>
					                )
					            })}
					        </Select>
					    </Form.Item>
					    {/* <Col span={12}>
								<Form.Item label={schema.localesLab['enum']}>
									<Checkbox
										checked={isEnumChecked}
										onChange={(evt: CheckboxChangeEvent) => {
											onChangeCheckBox(evt.target.checked, schema.changeEnum)
										}}
									/>
								</Form.Item>
								<TextArea
									value={enumValue || ''}
									disabled={!isEnumChecked}
									placeholder={schema.localesLab['enumTextPlaceholder']}
									onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
										changeEnumOtherValue(evt.target.value, schema.changeEnum)
									}}
								/>
							</Col> */}
					</Form>
					<div style={{textAlign:'right'}}>
					    <Space>
					        <Button onClick={() => {
					            closeModal();
					            form.resetFields();
					        }}>取消</Button>
					        <Button 
					            type="primary"
					            onClick={async() => {
					                const formResult = await form.validateFields();
					                if (formResult.errorFields && formResult.errorFields.length !== 0) {
					                    return;
					                }
					                const data = {...formResult};
					                if(schema.changeAdvancedProperties){
					                    schema.changeAdvancedProperties(data,lens);
					                }
					                closeModal();
					            }}
					        >确认</Button>
					    </Space>
					</div>
					</>
                )
            }}
        </SchemaContext.Consumer>
    )
}
