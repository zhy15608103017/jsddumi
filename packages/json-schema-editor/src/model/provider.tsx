import * as React from 'react'
import * as R from 'ramda'
import {SchemaContext} from './context'
import {PropertyType, getDefaultSchema, DataType, dealAllRequired, deepCopy, dealAllNull} from '../utils'
import {JsonSchemaObject, JsonSchemaType} from '../json-schema.types'
import Ajv from 'ajv'

const ajv = new Ajv()

export type SchemaProviderProps = {
	data?: JsonSchemaType
	readOnly?: boolean
	schemaRoot: string
	localesLab?: any
	onSchemaChange?: (data:JsonSchemaType) => void
}

export const SchemaProvider: React.FunctionComponent<SchemaProviderProps> = (
	props: React.PropsWithChildren<SchemaProviderProps>
) => {
	const errorMessage = ''
	const defaultSchema: JsonSchemaObject = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: props.schemaRoot,
		type: 'object',
		title: 'title',
		description: '',
		properties: {},
		required: []
	}

	const countKeys = (object: any): number => {
		if (typeof object !== 'object' || object === null) {
			return 0
		}

		const keys = Object.keys(object)
		let sum = keys.length
		for (const key of keys) {
			sum += countKeys(object[key])
		}

		return sum
	}

	const defaultState: JsonSchemaType =
		props.data === undefined ? defaultSchema : props.data

	const isValidSchema = (): boolean => {
		const isValid = ajv.validateSchema(defaultState);
		return isValid
	}

	const [state, setState] = React.useState({
		schema: defaultState,
		fieldId: countKeys(props.data),
		isValid: isValidSchema(),
		errorMessage
	})

	const [isReadOnly] = React.useState(props.readOnly ?? false)
	const [schemaRoot] = React.useState(props.schemaRoot ?? '')

	const renameKeys = R.curry((keysMap: Record<string, string>, object: any) =>
		R.reduce(
			(acc: any, key: string) => {
				const k = R.has(key, keysMap) ? keysMap[key] : key
				acc[k] = object[key]
				return acc
			},
			{},
			R.keys(object) as string[]
		)
	)
	
	React.useEffect(()=>{
		const newDefaultData = props.data === undefined ? defaultSchema : props.data;
		setState({
			schema: newDefaultData,
			fieldId: countKeys(props.data),
			isValid: ajv.validateSchema(newDefaultData),
			errorMessage
		})
	},[props.data])
	
	return (
		<SchemaContext.Provider
			value={{
				jsonSchema: state.schema,
				isValidSchema: state.isValid,
				isReadOnly,
				schemaRoot,
				localesLab:props.localesLab || {},
				handleNameChange: (newValue: string, lens: string[]) => {
					const map = {[lens[lens.length - 1]]: newValue}
					const propsLens = R.lensPath(lens.slice(0, -1))
					const propView = R.view(propsLens, state.schema)
					const newProperties = renameKeys(map, propView)

					const newState = R.set(propsLens, newProperties, state.schema)
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				handleTitleChange: (newValue: string, lens: string[]): void => {
					const idLens = R.lensPath([...lens, '$id'])
					const titleLens = R.lensPath([...lens, 'title'])
					let newId = `${schemaRoot}${newValue.toLowerCase()}`
					newId = newId.replace(/\s/g, '')
					const updatedId = R.set(idLens, newId, state.schema)
					const newState = R.set(titleLens, newValue, updatedId)
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				handleTypeChangeWithNull: (typeValue: string |string[], shouldAllowNull: boolean, lens: string[]) => {
					const typeLens = R.lensPath([...lens, 'type'])
					let newTypeValue;
					if(shouldAllowNull){
						if(Array.isArray(typeValue) && !typeValue.includes('null')){
							newTypeValue = [...typeValue];
							newTypeValue.push('null');
						}
						if(!Array.isArray(typeValue) && typeValue !== 'null'){
							if(typeValue){
								newTypeValue = [typeValue, 'null'];
							}else{
								newTypeValue = 'null';
							}
							
						}
					}else{
						if(Array.isArray(typeValue)){
							newTypeValue = [...typeValue];
							newTypeValue.splice(newTypeValue.findIndex(ele => ele === 'null'),1);
							newTypeValue = newTypeValue.length === 1? newTypeValue[0]: newTypeValue;
						}
					}
					const newState = R.set(
						typeLens,
						newTypeValue,
						state.schema
					)
					
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				handleTypeChange: (newValue: string, lens: string[], curType: string | string[]) => {
					if (lens.length > 0) {
						const typeLens = R.lensPath(lens)
						const dataTypeValue: DataType = (DataType as any)[newValue];
						let newType;
						if(Array.isArray(curType) && curType.includes('null')){
							newType = [dataTypeValue, 'null'];
						}else{
							newType = dataTypeValue;
						}
						const newState = R.set(
							typeLens,
							{...getDefaultSchema(dataTypeValue, schemaRoot), type: newType},
							state.schema
						)
						setState({
							schema: newState,
							fieldId: state.fieldId,
							isValid: state.isValid,
							errorMessage: state.errorMessage
						})
						if( props.onSchemaChange) props.onSchemaChange(newState);
					} else {
						switch (newValue) {
							case 'array':
								const newArrayDefault = getDefaultSchema(DataType.array, schemaRoot, true);
								setState({
									schema: newArrayDefault,
									fieldId: state.fieldId,
									isValid: state.isValid,
									errorMessage: state.errorMessage
								})
								if( props.onSchemaChange) props.onSchemaChange(newArrayDefault);
								break

							case 'object':
								const newObjectDefault = getDefaultSchema(DataType.object, schemaRoot, true);
								setState({
									schema: getDefaultSchema(DataType.object, schemaRoot, true),
									fieldId: state.fieldId,
									isValid: state.isValid,
									errorMessage: state.errorMessage
								})
								if( props.onSchemaChange) props.onSchemaChange(newObjectDefault);
								break
							default:
						}
					}
				},
				handleDescriptionChange: (newValue: string, lens: string[]) => {
					const titleLens = R.lensPath([...lens, 'description'])

					const newState = R.set(titleLens, newValue, state.schema)
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				deleteItem: (lens: string[]) => {
					const propertyName = lens[lens.length - 1]
					const requiredLens = R.lensPath([...lens.splice(0, -1), 'required'])
					const currentRequired = R.view<JsonSchemaType, string[]>(
						requiredLens,
						state.schema
					)
					if(currentRequired){
						const indexOfRequired = currentRequired.indexOf(propertyName);
						if(indexOfRequired > -1){
							currentRequired.splice(indexOfRequired, 1)
						}
					}
					const newState = R.dissocPath<JsonSchemaType>(lens, state.schema)
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				addItem: (lens: string[], type: PropertyType) => {
					const fieldName = `field_${String(state.fieldId++)}`
					lens =
						type === PropertyType.SIBLING
							? [...lens.slice(0, -1), fieldName]
							: [...lens, fieldName]

					const addPath = R.lensPath(lens)
					const newState = R.set(
						addPath,
						getDefaultSchema(DataType.string, schemaRoot),
						state.schema
					)

					setState({
						schema: newState,
						fieldId: state.fieldId++,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				changeAdvancedProperties: (
					newValue: any,
					lens: string[],
				) => {
					if( typeof newValue !== 'object') return;
					const properties = Object.keys(newValue);
					const propertyLens = R.lensPath([...lens]);
					const currentItem:JsonSchemaType = R.view(propertyLens, state.schema) || {};
					const toBeUpdateItem: any = {...currentItem};
					properties.forEach( (property )=> {
						if(newValue[property]){
							toBeUpdateItem[property] = newValue[property];
						}else{
							delete toBeUpdateItem[property];
						}
					})
					const newState = R.set(propertyLens, toBeUpdateItem, state.schema);
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				}, 
				changeAdvancedProperty: (
					newValue: any,
					lens: string[],
					property: string
				) => {
					const propertyLens = R.lensPath([...lens, property])

					let  correctNewValue ;
					if( typeof newValue === 'string'){
						correctNewValue = newValue;
					}else{
						correctNewValue = Number(newValue) === undefined ? newValue : Number(newValue)
					}

					const newState = R.set(propertyLens, correctNewValue, state.schema)
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				changeEnum: (newValue: string[] | null, lens: string[]) => {
					const propertyLens = R.lensPath([...lens, 'enum'])
					let newState: JsonSchemaType
					if (newValue === null) {
						newState = R.dissocPath<JsonSchemaType>(
							[...lens, 'enum'],
							state.schema
						)
					} else {
						const typeLens = R.lensPath(lens)

						const propType = R.view<JsonSchemaType, JsonSchemaType>(
							typeLens,
							state.schema
						)
						const correctNewValue =
							propType.type === 'number'
								? newValue.map((string) =>
										string === '' ? string : Number(string)
								  )
								: newValue

						newState = R.set(propertyLens, correctNewValue, state.schema)
					}

					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				dissocPath: (lens: string[]) => {
					let newState: JsonSchemaType
					if(lens){
						newState = R.dissocPath<JsonSchemaType>(
							[...lens],
							state.schema
						)
						setState({
							schema: newState,
							fieldId: state.fieldId,
							isValid: state.isValid,
							errorMessage: state.errorMessage
						})
						if( props.onSchemaChange) props.onSchemaChange(newState);
					}
				},
				getDataByLens: (lens: string[]) => {
					const propertyLens = R.lensPath(lens)
					const result = R.view(propertyLens, state.schema);
					if(!result)return;
					const data = JSON.parse(
						JSON.stringify(result)
					)
					return data
				},
				handleRequiredChange: (newValue: boolean, lens: string[]) => {
					const propertyName = lens[lens.length - 1]

					const requiredPath = lens.slice(0, -2)
					const requiredLens = R.lensPath(requiredPath)

					const currentState = R.view<JsonSchemaType, JsonSchemaObject>(
						requiredLens,
						state.schema
					)

					if (!currentState.required) {
						currentState.required = new Array<string>()
					}

					const indexOfRequired = currentState.required.indexOf(propertyName)

					if (!newValue && indexOfRequired >= 0) {
						currentState.required.splice(indexOfRequired, 1)
					} else if (newValue && indexOfRequired === -1) {
						currentState.required.push(propertyName)
					}

					const newState = R.set(requiredLens, currentState, state.schema)

					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				changeAllRequired: (newValue: boolean) => {
					const newState = deepCopy(state.schema);
					dealAllRequired(newState, newValue);
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
				changeAllAllowNull:  (newValue: boolean) => {
					const newState = deepCopy(state.schema);
					if(newState.type === 'object'){
						Object.values(newState.properties).forEach((ele: any) => dealAllNull(ele, newValue));
					}
					if(newState.type === 'array'){
						dealAllNull(newState.items, newValue)
					}
					setState({
						schema: newState,
						fieldId: state.fieldId,
						isValid: state.isValid,
						errorMessage: state.errorMessage
					})
					if( props.onSchemaChange) props.onSchemaChange(newState);
				},
			}}
		>
			{props.children}
		</SchemaContext.Provider>
	)
}
