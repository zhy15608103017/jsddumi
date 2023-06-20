import * as React from 'react'
// import {Flex} from '@chakra-ui/core'
import {Row} from 'antd'
import {SchemaContext} from '../model'
import {AdvancedString} from '../advanced-string'
import {AdvancedNumber} from '../advanced-number'
import {AdvancedBoolean} from '../advanced-boolean'
import {JsonSchemaType} from '../json-schema.types'

export interface AdvancedSettingsProps {
    lens: string[],
    closeModal?: ()=>void,
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const AdvancedSettings: React.FunctionComponent<AdvancedSettingsProps> = (
    props: React.PropsWithChildren<AdvancedSettingsProps>
) => {
    const {lens, closeModal=()=>{}} = props

    return (
        <SchemaContext.Consumer>
            {(schema) => {
                const getComponent = (lens: string[]): JSX.Element | undefined => {
                    const data = schema.getDataByLens && schema.getDataByLens(lens)?
                        schema.getDataByLens(lens)
                        // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
                        : ({} as JsonSchemaType);
                    let type  = data.type;
                    if(Array.isArray(data.type)){
                        type = data.type.find(ele => ele !== 'null') ;
                    }
                    switch (type) {
                        case 'string':
                            return <AdvancedString lens={lens} closeModal={closeModal}/>
                        case 'number':
                        case 'integer':
                            return <AdvancedNumber lens={lens} closeModal={closeModal}/>
                        case 'boolean':
                            return <AdvancedBoolean lens={lens}/>
                        default:
                            return undefined
                    }
                }

                return getComponent(lens)
            }}
        </SchemaContext.Consumer>
    )
}
