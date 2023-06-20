import * as React from 'react'
import {
	Row,
	Modal,
	Button,
	Form
} from 'antd'
import {SchemaProvider, SchemaContext} from './model'

import {SchemaRoot} from './schema-root'
import {getComponent} from './mapper'
import {AdvancedSettings} from './schema-advanced'
import {JsonSchemaType} from './json-schema.types'
import {Whoops} from './whoops'
import IntlFn from './locales';
import './styles/global.less';
interface SchemaEditorProps {
	/**
	 * Text component
	 */
	data?: JsonSchemaType | undefined
	schemaRoot: string
	onSchemaChange: (data:JsonSchemaType) => void
	readOnly?: boolean,
	locale?: string,
}

export * from './json-schema.types'

/**
 * Some documented component
 *
 */
const JsonSchemaEditor: React.FC<SchemaEditorProps> = (
	props: SchemaEditorProps
) => {
	const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)
	const [currentLens, setCurrentLens] = React.useState(new Array<string>())

	// const focusRef = React.createRef<HTMLElement>()

	const {onSchemaChange, locale} = props
	const onCloseImport = (): void => {
		setIsAdvancedOpen(false)
	}

	const onCloseAdvanced = (): void => {
		setIsAdvancedOpen(false)
	}

	const showAdvanced = (lens: string[]): void => {
		setCurrentLens(lens)
		setIsAdvancedOpen(true)
	}
	const localesLab = IntlFn(locale);
	const form = Form.useForm();
	return (
		<SchemaProvider
			schemaRoot={props.schemaRoot}
			readOnly={props.readOnly}
			data={props.data}
			localesLab={localesLab}
			onSchemaChange={onSchemaChange}
		>
			<SchemaContext.Consumer>
				{(schema) => (
					<>
						{schema.isValidSchema ? (
							<>
							<Row>
								<SchemaRoot
									readOnly={schema.isReadOnly}
									data={schema.jsonSchema}
								/>
							</Row>
							<Row>
								{schema.jsonSchema &&
									getComponent(schema.jsonSchema, [], showAdvanced)}
							</Row>
							</>
						) : (
							<Row>
								<div style={{
									position:"absolute",
									left:'50%',
									top:'50%',
									transform:'translate(-50%,-50%)',
									marginTop:'350px',
									fontWeight:'bold'}}
								>
									<span>{schema.localesLab['validationWarning']}</span>
								</div>
							</Row>
						)}
						<Modal
							closable={false}
							visible={isAdvancedOpen}
							afterClose={onCloseAdvanced}
							// title={schema.localesLab['advancedModalTitle'] }
							footer={false}
							width={374}
						>	
							<AdvancedSettings lens={currentLens} closeModal={onCloseImport}/>
							{/* <Button
								onClick={onCloseImport}
							>
								{schema.localesLab['close']}
							</Button> */}
						</Modal>
					</>
				)}
			</SchemaContext.Consumer>
		</SchemaProvider>
	)
}

export default JsonSchemaEditor
