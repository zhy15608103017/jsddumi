import * as React from 'react'
import {
	Row, Input, Checkbox, Select, Tooltip, Button, Col, Space
} from 'antd';
import { SchemaContext } from '../model'
import { PropertyType, caculateAllRequired, caculateAllNull } from '../utils'
import { JsonSchemaType } from '../json-schema.types'
import { PlusCircleOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { Option } = Select;
export interface SchemaArrayProps {
	data: JsonSchemaType | undefined
	readOnly?: boolean
}
export const SchemaRoot: React.FunctionComponent<SchemaArrayProps> = (
	props: React.PropsWithChildren<SchemaArrayProps>
) => {
	const { data, readOnly } = props;
	const shouldAllRequired = caculateAllRequired(data);
	const shouldAllNull = caculateAllNull(data);
	return (
		<SchemaContext.Consumer>
			{(schema) => (
				<Row style={{ marginBottom: '8px' }}>
					<Space>
						<Input
							disabled
							value="root"
						/>

						<Tooltip
							title={schema.localesLab['allRequired']}
							placement="top"
						>
							<Checkbox
								disabled={Object.keys(data?.properties || {}).length === 0 || readOnly}
								checked={shouldAllRequired}
								onChange={(evt: CheckboxChangeEvent) => {
									console.log('onchange', evt.target.checked);

									if (schema.changeAllRequired) {
										schema.changeAllRequired(evt.target.checked)
									}
								}} />
						</Tooltip>
						<Select
							disabled={readOnly}
							value={(data?.type ?? '') as string}
							placeholder={schema.localesLab['dataTypePlaceholder']}
							onChange={(value) => {
								if (schema.handleTypeChange) {
									schema.handleTypeChange(value, [], data?.type ?? '')
								}
							}}
						>
							<Option key="object" value="object">
								object
							</Option>
							<Option key="array" value="array">
								array
							</Option>
						</Select>
						<Tooltip
							title={schema.localesLab['shouldAllAllowNull']}
							placement="top"
						>
							<Checkbox
								disabled={Object.keys(data?.properties || {}).length === 0 || readOnly}
								checked={shouldAllNull}
								onChange={(evt: CheckboxChangeEvent) => {
									if (schema.changeAllAllowNull) {
										schema.changeAllAllowNull(evt.target.checked)
									}
								}}
							/>
						</Tooltip>
						<Input
							value={data?.title ?? ''}
							disabled={readOnly}
							placeholder={schema.localesLab['addTitlePlaceholder']}
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
								if (schema.handleTitleChange) {
									schema.handleTitleChange(evt.target.value, [])
								}
							}}
						/>
						<Input
							value={data?.description ?? ''}
							disabled={readOnly}
							placeholder={schema.localesLab['addDescPlaceholder']}
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
								if (schema.handleDescriptionChange) {
									schema.handleDescriptionChange(evt.target.value, [])
								}
							}}
						/>
					</Space>
					{data?.type === 'object' && (
						<Tooltip
							title={schema.localesLab['addChildNode']}
							placement="top"
						>
							<Button
								type="link"
								icon={<PlusCircleOutlined style={{ color: schema.isReadOnly ? 'rgb(184 184 184)' : 'green' }} />}
								disabled={readOnly}
								onClick={() => {
									if (schema.addItem) {
										schema.addItem(['properties'], PropertyType.CHILD)
									}
								}}
							/>
						</Tooltip>
					)}
				</Row>
			)}
		</SchemaContext.Consumer>
	)
}
