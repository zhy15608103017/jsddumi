import * as React from 'react'
import {
	Popover, Button,
} from 'antd';
import {SchemaContext} from '../model'
import {PropertyType} from '../utils'
import { PlusCircleOutlined } from '@ant-design/icons';
export interface DropPlusProps {
	lens: string[]
	isDisabled: boolean
}
export const DropPlus: React.FunctionComponent<DropPlusProps> = (
	props: React.PropsWithChildren<DropPlusProps>
) => {
	if (props.isDisabled) {
		return <div />
	}

	return (
		<SchemaContext.Consumer>
			{(schema) => (
				<Popover 
					content={(<>
						<Button
							onClick={() => {
								if (schema.addItem) {
									schema.addItem(props.lens, PropertyType.SIBLING)
								}
							}}
						>
							{schema.localesLab['addSiblingNode']}
						</Button>
						<Button
							onClick={() => {
								if (schema.addItem) {
									schema.addItem(
										[...props.lens, 'properties'],
										PropertyType.CHILD
									)
								}
							}}
						>
							{schema.localesLab['addChildNode']}
						</Button>
					</>)}
					trigger="hover">
					<Button type="link" icon={<PlusCircleOutlined style={{color:schema.isReadOnly?'rgb(184 184 184)':'green'}}/>}/>
				</Popover>
			)}
		</SchemaContext.Consumer>
	)
}
