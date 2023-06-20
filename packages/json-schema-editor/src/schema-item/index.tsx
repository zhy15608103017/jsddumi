import * as React from 'react'
import {
	Row, Col, Input, Checkbox, Select, Tooltip, Button, message, Space
} from 'antd';
import { DeleteOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { SchemaContext } from '../model'
import { SchemaTypes, PropertyType } from '../utils'
import { DropPlus } from '../drop-plus'
import { getComponent } from '../mapper'
import { JsonSchemaObject } from '../json-schema.types'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { Option } = Select;
export interface SchemaItemProps {
	data: JsonSchemaObject
	name: string
	lens: string[]
	showAdvanced: (lens: string[]) => void
}

export const SchemaItem: React.FunctionComponent<SchemaItemProps> = (
	props: React.PropsWithChildren<SchemaItemProps>
) => {
	const { name, data, lens, showAdvanced } = props

	const item = data.properties[name]
	const { length } = lens.filter((name) => name !== 'properties')
	const tagPaddingLeftStyle = {
		paddingLeft: `${20 * (length + 1)}px`,
		marginBottom: '8px'
	}
	const shouldAllowNull = item.type === 'null' || (Array.isArray(item.type) && item.type.includes('null'));
	const isRequired = data.required
		? data.required.length > 0 && data.required.includes(name)
		: false

	return (
		<SchemaContext.Consumer>
			{(schema) => (
				<>
					<Row
						wrap={false}
						className="schema-item"
						style={tagPaddingLeftStyle}
					>
						<Col flex={1}>
							<Space>
								<Input
									disabled={schema.isReadOnly}
									value={name}
									placeholder="Outline"
									onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
										// Todo: make toast for duplicate properties
										if (data.properties[evt.target.value]) {
											message.warn({
												title: schema.localesLab['duplicateProperty'],
												description: schema.localesLab['duplicatePropertyDesc'],
												status: 'error',
												duration: 1000,
												isClosable: true,
												position: 'top'
											})
										} else if (schema.handleNameChange) {
											schema.handleNameChange(evt.target.value, lens)
										}
									}}
								/>
								<Checkbox
									disabled={schema.isReadOnly}
									checked={isRequired}
									onChange={(evt: CheckboxChangeEvent) => {
										if (schema.handleRequiredChange) {
											schema.handleRequiredChange(evt.target.checked, lens)
										}
									}}
								/>
								<Select
									style={{ minWidth: 93 }}
									disabled={schema.isReadOnly}
									value={Array.isArray(item.type) ? (SchemaTypes.includes(item.type[0]) ? item.type[0] : '') : (SchemaTypes.includes(item.type) ? item.type : '')}
									placeholder={schema.localesLab['dataTypePlaceholder']}
									onChange={(value) => {
										if (schema.handleTypeChange) {
											schema.handleTypeChange(value, lens, item.type)
										}
									}}
								>
									{SchemaTypes.map((cur, index) => {
										// 若当前type为null 或包含null，则下拉选项中array和object不可选
										return <Option
											key={String(index)}
											disabled={(item.type === 'null' || (Array.isArray(item.type) && item.type.includes('null'))) && ['object', 'array'].includes(cur)}
											value={cur}>
											{cur}
										</Option>;
									})}
								</Select>
								{(['string', 'number', 'integer', 'boolean', 'null'].includes(item.type) || (Array.isArray(item.type) && item.type.some(ele => ['string', 'number', 'integer', 'boolean', 'null'].includes(ele)))) && (
									<Tooltip
										title={schema.localesLab['shouldAllowNull']}
										placement="top"
									>
										<Checkbox
											disabled={schema.isReadOnly}
											checked={shouldAllowNull}
											onChange={(evt: CheckboxChangeEvent) => {
												if (schema.handleTypeChangeWithNull) {
													schema.handleTypeChangeWithNull(item.type, evt.target.checked, lens)
												}
											}}
										/>
									</Tooltip>
								)}
								<Input
									disabled={schema.isReadOnly}
									value={item.title || ''}
									placeholder={schema.localesLab['addTitlePlaceholder']}
									onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
										if (schema.handleTitleChange) {
											schema.handleTitleChange(evt.target.value, lens)
										}
									}}
								/>
								<Input
									disabled={schema.isReadOnly}
									value={item.description || ''}
									placeholder={schema.localesLab['addDescPlaceholder']}
									onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
										if (schema.handleDescriptionChange) {
											schema.handleDescriptionChange(evt.target.value, lens)
										}
									}}
								/>
							</Space>
						</Col>
						<Col span={4}>
							{/*  <span> */}
							{(['string', 'number', 'integer'].includes(item.type) || (Array.isArray(item.type) && item.type.some(ele => ['string', 'number', 'integer'].includes(ele)))) && (
								<Tooltip
									title={schema.localesLab['addvancedSetting']}
									placement="top"
								>
									<Button
										type="link"
										icon={<SettingOutlined style={{ color: schema.isReadOnly ? 'rgb(184 184 184)' : 'blue' }} />}
										disabled={schema.isReadOnly}
										onClick={() => {
											props.showAdvanced(lens)
										}}
									/>
								</Tooltip>
							)}
							<Tooltip
								title={schema.localesLab['removeNode']}
								placement="top"
							>
								<Button
									icon={<DeleteOutlined style={{ color: schema.isReadOnly ? 'rgb(184 184 184)' : 'red' }} />}
									type="link"
									disabled={schema.isReadOnly}
									onClick={() => {
										if (schema.deleteItem) {
											schema.deleteItem(lens)
										}
									}}
								/>
							</Tooltip>
							{item.type === 'object' ? (
								<DropPlus isDisabled={schema.isReadOnly ?? false} lens={lens} />
							) : (
								<Tooltip
									title={schema.localesLab['addSiblingNode']}
									placement="top"
								>
									<Button
										type="link"
										icon={<PlusCircleOutlined style={{ color: schema.isReadOnly ? 'rgb(184 184 184)' : 'green' }} />}
										disabled={schema.isReadOnly}
										onClick={() => {
											if (schema.addItem) {
												schema.addItem(lens, PropertyType.SIBLING)
											}
										}}
									/>
								</Tooltip>
							)}
							{/* </span> */}
						</Col>
					</Row>
					{getComponent(item, lens, showAdvanced)}
				</>
			)}
		</SchemaContext.Consumer>
	)
}
