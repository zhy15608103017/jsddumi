import * as React from 'react'
import { PropertyType } from '../utils'
import { JsonSchemaType } from '../json-schema.types'

export interface SchemaStore {
    jsonSchema: JsonSchemaType;
    isValidSchema: boolean;
    isReadOnly: boolean;
    schemaRoot: string;
    localesLab: any;
    handleNameChange: (newValue: string, lens: string[]) => void;
    handleTitleChange: (newValue: string, lens: string[]) => void;
    handleTypeChange: (newValue: string, lens: string[], curType: string | string[]) => void;
    handleTypeChangeWithNull: (newValue: string, shouldAllowNull: boolean, lens: string[]) => void;
    handleDescriptionChange: (newValue: string, lens: string[]) => void;
    handleRequiredChange: (newValue: boolean, lens: string[]) => void;
    deleteItem: (lens: string[]) => void;
    addItem: (lens: string[], type: PropertyType) => void;
    getDataByLens: (lens: string[]) => JsonSchemaType;
    changeAdvancedProperty: (
        newValue: any,
        lens: string[],
        property: string
    ) => void;
    changeAdvancedProperties: (
        newValue: any,
        lens: string[],
    ) => void;
    changeEnum: (newValue: string[] | null, lens: string[]) => void;
    dissocPath: (lens: string[]) => void;
    changeAllRequired: (newValue: boolean) => void;
    changeAllAllowNull: (newValue: boolean) => void;
}

export const SchemaContext = React.createContext<Partial<SchemaStore>>({})
