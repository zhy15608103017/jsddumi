import * as React from 'react'
// import {Flex, FormLabel, Stack, Select} from '@chakra-ui/core'
import { Row, Select, Form} from 'antd'
import {SchemaContext} from '../model'
import {getDefaultSchema, DataType} from '../utils'
import {JsonSchemaType, JsonSchemaString} from '../json-schema.types'

export interface AdvancedBooleanProps {
	lens: string[]
}

export const AdvancedBoolean: React.FunctionComponent<AdvancedBooleanProps> = (
	props: React.PropsWithChildren<AdvancedBooleanProps>
) => {
	const {lens} = props

	return (
		<SchemaContext.Consumer>
			{(schema) => {
				const initial: JsonSchemaType = getDefaultSchema(
					DataType.object,
					schema.schemaRoot
				)
				const data = schema.getDataByLens && schema.getDataByLens(lens)? schema.getDataByLens(lens) : initial
				return (
					<Row>
						<Form.Item label={schema.localesLab['defaultValue']}>
							<Select
								value={(data as JsonSchemaString).default ?? ''}
								placeholder={schema.localesLab['dataTypePlaceholder']}
								onChange={(value) => {
									if (schema.changeAdvancedProperty) {
										schema.changeAdvancedProperty(
											value,
											lens,
											'default'
										)
									}
								}}
							>
								<option key="true" value="true">
									true
								</option>
								<option key="false" value="false">
									false
								</option>
							</Select>
						</Form.Item>
						
					</Row>
				)
			}}
		</SchemaContext.Consumer>
	)
}
