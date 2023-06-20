import {
	JsonSchemaType,
	JsonSchemaArray,
	JsonSchemaObject
} from './json-schema.types'

const schemaDraft = 'http://json-schema.org/draft-07/schema'

export const JSONPATH_JOIN_CHAR = '.'

export enum PropertyType {
	SIBLING,
	CHILD
}

export const StringFormat = [
	{name: 'date-time'},
	{name: 'date'},
	{name: 'time'},
	{name: 'email'},
	{name: 'hostname'},
	{name: 'ipv4'},
	{name: 'ipv6'},
	{name: 'uri'},
	{name: 'regex'}
]

export const SchemaTypes = [
	'string',
	'number',
	'array',
	'object',
	'boolean',
	'integer'
]

export enum DataType {
	string = 'string',
	number = 'number',
	array = 'array',
	object = 'object',
	boolean = 'boolean',
	integer = 'integer'
}

export const getDefaultSchema = (
	dataType: DataType,
	schemaRoot: string | undefined,
	includeSchema?: boolean
): JsonSchemaType | JsonSchemaArray | JsonSchemaObject => {
	switch (dataType) {
		case DataType.number:
			return includeSchema
				? {
						$schema: schemaDraft,
						$id: schemaRoot ?? '',
						type: 'number',
						title: '',
						description: ''
				  }
				: {
						$id: schemaRoot ?? '',
						type: 'number',
						title: '',
						description: ''
				  }
		case DataType.boolean:
			return includeSchema
				? {
						$schema: schemaDraft,
						$id: schemaRoot ?? '',
						type: 'boolean',
						title: '',
						description: ''
				  }
				: {
						$id: schemaRoot ?? '',
						type: 'boolean',
						title: '',
						description: ''
				  }
		case DataType.integer:
			return includeSchema
				? {
						$schema: schemaDraft,
						$id: schemaRoot ?? '',
						type: 'integer',
						title: '',
						description: ''
				  }
				: {
						$id: schemaRoot ?? '',
						type: 'integer',
						title: '',
						description: ''
				  }
		case DataType.array:
			return includeSchema
				? {
						$schema: schemaDraft,
						$id: schemaRoot ?? '',
						type: 'array',
						title: '',
						description: '',
						items: {
							$id: schemaRoot ?? '',
							type: 'string',
							title: '',
							description: ''
						}
				  }
				: {
						$id: schemaRoot ?? '',
						type: 'array',
						title: '',
						description: '',
						items: {
							$id: schemaRoot ?? '',
							type: 'string',
							title: '',
							description: ''
						}
				  }
		case DataType.object:
			return includeSchema
				? {
						$schema: schemaDraft,
						$id: schemaRoot ?? '',
						type: 'object',
						title: '',
						description: '',
						properties: {},
						required: []
				  }
				: {
						$id: schemaRoot ?? '',
						type: 'object',
						title: '',
						description: '',
						properties: {},
						required: []
				  }
		case DataType.string:
		default:
			return includeSchema
				? {
						$schema: schemaDraft,
						$id: schemaRoot ?? '',
						type: 'string',
						title: '',
						description: ''
				  }
				: {
						$id: schemaRoot ?? '',
						type: 'string',
						title: '',
						description: ''
				  }
	}
}

export const deepCopy = (targetObj: any) => {
	if(typeof targetObj !== 'object' || targetObj === null){
		return targetObj
	}
	let result: any;
	if(Object.prototype.toString.call(targetObj) === '[object Array]'){
		result = [];
		targetObj.forEach((element: any) => {
			if(typeof targetObj !== 'object' || targetObj === null){
				result.push(element);
			}else{
				result.push(deepCopy(element));
			}
		});
		return result;
	}
	result = {};
	Object.keys(targetObj).forEach((key: string) => {
		if(typeof targetObj[key] === 'object' && targetObj[key] !== null){
			result[key] = deepCopy(targetObj[key]);
		}else{
			result[key] = targetObj[key];
		}
	})
	return result;
}

export const isTypeIncludeNull = ( data: string | string[]):boolean =>{
	return data === 'null' || (Array.isArray(data)&& data.includes('null'));
}

export const dealAllRequired = ( schema: JsonSchemaType, addFlag = true ) => {
	if(schema.properties){
		const allPropertiesKey = Object.keys(schema.properties)
		if(!addFlag){
			schema.required && delete schema.required;
		}else{
			schema.required = allPropertiesKey;
		}
		allPropertiesKey.forEach(propertiesKey => {
			const subSchema = schema.properties?schema.properties[propertiesKey] as JsonSchemaType : undefined;
			if(subSchema && subSchema.properties){
				dealAllRequired(subSchema, addFlag)
			}
		})
	}
}


/* dealAllNull  处理所有schema片段type参数是否包含null
schema：JsonSchemaType
addFlag：boolean // 为true增加null值，false从type去掉null值
*/

export const dealAllNull = ( schema: any, addFlag?: boolean ) => {
	if(schema.type === 'object'){
		const subProperties = Object.values(schema.properties || {});
		subProperties.forEach((ele: any) => dealAllNull(ele, addFlag));
		return;
	}
	if(schema.type === 'array'){
		schema.items && dealAllNull(schema.items, addFlag);
		return
	}
	if(schema.type === 'null' || ( Array.isArray(schema.type) && schema.type.includes('null') )){
		if(addFlag)return;
		if(Array.isArray(schema.type)){
			schema.type.splice(schema.type.findIndex((ele: string) => ele === 'null'),1);
			if(schema.type.length === 1){
				schema.type = schema.type[0];
			}
			return;
		}
		schema.type = '';
		return;
	}
	if(!addFlag) return;
	if(Array.isArray(schema.type)){
		schema.type.push('null');
	}else{
		if(schema.type as any) {
			schema.type = [schema.type, 'null'] ;
		}else{
			schema.type = 'null';
		}
	}
}

// 验证schema是否是全必填， 返回true为全必填
export const caculateAllRequired = (data: JsonSchemaType | undefined):boolean => {
	if(data?.type !== 'object')return true;
	if(data && data.required){
		const allPropertiesKey = Object.keys(data.properties || {})
		if( data.required.join('') !== allPropertiesKey.join(''))return false;
		if(allPropertiesKey.length === 0)return false;
		return allPropertiesKey.every(propertiesKey => {
			const subSchema = data.properties?data.properties[propertiesKey] as JsonSchemaType : undefined;
			if(subSchema){
				return caculateAllRequired(subSchema)
			}
			return false;
		})
	}
	return false
}

// 验证schema的type是否都包含null，return true表示都包含null
export const caculateAllNull = (data: any):boolean => {
	if(data ){
		if(data.type === 'object'){
			const propertiesKey = Object.keys(data.properties);
			if(propertiesKey.length === 0) return false;
			return propertiesKey.every((key: string) => caculateAllNull(data.properties[key]));
		}
		if(data.type === 'array' ){
			return caculateAllNull(data.items);
		}
		return isTypeIncludeNull(data.type)
	}
	return false
}