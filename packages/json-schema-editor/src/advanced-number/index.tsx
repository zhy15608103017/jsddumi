/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable linebreak-style */
import * as React from 'react'
import {
	Row, Col, Input, InputNumber, Form, Switch, Space, Button, Checkbox
} from 'antd';
import {SchemaContext} from '../model'
import {getDefaultSchema, DataType} from '../utils'
import FormSwitch from '../component/formSwitch'
import {
	JsonSchemaType,
	JsonSchemaRange
} from '../json-schema.types'
export interface SchemaObjectProps {
	lens: string[]
	closeModal?: ()=>void,
}

export const AdvancedNumber: React.FunctionComponent<SchemaObjectProps> = (
	props: React.PropsWithChildren<SchemaObjectProps>
) => {
	const {lens, closeModal=()=>{}} = props;
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
					DataType.number,
					schema.schemaRoot
				)
				const data = schema.getDataByLens && schema.getDataByLens(lens) ? schema.getDataByLens(lens): initial;
				const {type} = data;
				// const enumData = data as JsonSchemaEnum
				// const enumValue = enumData?.enum?.join('\n')
				form.setFieldsValue(data);
				return (
					<>
					<Form layout="vertical" form={form} style={{position:'relative'}}>
					{/* <Row>
						<Col>
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
						</Col>
					</Row> */}
							<Form.Item 
								name='maxValue'
								label={schema.localesLab['maxValue']}
								dependencies={['minValue']}
								rules={[({ getFieldValue }) => ({
									validator(_, value) {
									  const minValue = getFieldValue('minValue');
									  if (
										!value || (!minValue && minValue !== 0 )||
										value > minValue
									  ) {
										return Promise.resolve();
									  }
									  return Promise.reject(new Error('最大值必须大于最小值'));
									},
								})]}
							>
							<InputNumber
								style={{ width: '100%' }}
								precision={type === 'number'?undefined :0 }
							/>
							</Form.Item>
							<Form.Item 
								className="schema-editor_absoluteFormItem"
								name="exclusiveMaximum" 
								valuePropName="checked"
							>
								<Checkbox>{schema.localesLab['exclusiveMaximum']} </Checkbox>
							</Form.Item>
							<Form.Item
								name='minValue' 
								label={schema.localesLab['minValue']}
								dependencies={['maxValue']}
								rules={[({ getFieldValue }) => ({
									validator(_, value) {
									  const maxValue = getFieldValue('maxValue');
									  if (
										!value || (!maxValue && maxValue !== 0) ||
										value < maxValue
									  ) {
										return Promise.resolve();
									  }
									  return Promise.reject(new Error('最小值必须小于最大值'));
									},
								  })]}
							>
								<InputNumber
									style={{ width: '100%' }}
									precision={type === 'number'?undefined :0 }
								/>
							</Form.Item>
							<Form.Item 
								className="schema-editor_absoluteFormItem top81"
								name="exclusiveMinimum" 
								valuePropName="checked"
							>
								<Checkbox>{schema.localesLab['exclusiveMinimum']}</Checkbox>
							</Form.Item>
						{/* <Col>
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
								data.exclusiveMaximum = formResult.exclusiveMaximum?formResult.maxValue: undefined;
								data.exclusiveMinimum = formResult.exclusiveMinimum?formResult.minValue: undefined;
								if(schema.changeAdvancedProperties){
									schema.changeAdvancedProperties(data,lens);
								}
								closeModal();
							}}>确认</Button>
						</Space>
					</div>
					</>
				)
			}}
		</SchemaContext.Consumer>
	)
}
