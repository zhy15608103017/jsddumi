import * as React from 'react'

import {
    Row, Input, Checkbox, Select, Tooltip, Button, Space, Col
} from 'antd';
import type { ReactNodeLike } from 'prop-types';
// import {FiSettings} from 'react-icons/fi'
// import {IoIosAddCircleOutline} from 'react-icons/io'
import { SchemaContext } from '../model'
import { SchemaTypes, PropertyType } from '../utils'
import { getComponent } from '../mapper'
import { JsonSchemaArray } from '../json-schema.types'
import { PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { Option } = Select;
export interface SchemaArrayProps {
    data: JsonSchemaArray;
    lens: string[];
    showAdvanced: (lens: string[]) => void;
}
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const SchemaArray: React.FunctionComponent<SchemaArrayProps> = (
    props: React.PropsWithChildren<SchemaArrayProps>
) => {
    const { data, lens, showAdvanced } = props

    const { items } = data

    const { length } = lens.filter((name) => name !== 'properties')
    const shouldAllowNull = items.type === 'null' || (Array.isArray(items.type) && items.type.includes('null'));
    const tagPaddingLeftStyle = {
        paddingLeft: `${20 * (length + 1)}px`,
        marginBottom: '8px'
    }

    return (
        <SchemaContext.Consumer>
            {(schema) => (
                <>
                    <Row
                        wrap={false}
                        className="array-item"
                        style={tagPaddingLeftStyle}
                    >
                        <Col flex={1}>
                            <Space>
                                <Input
                                    key="Items"
                                    disabled
                                    value="Items"
                                />
                                <Checkbox disabled />
                                <Select
                                    disabled={schema.isReadOnly}
                                    value={Array.isArray(items.type) ? (SchemaTypes.includes(items.type[0]) ? items.type[0] : '') : (SchemaTypes.includes(items.type) ? items.type : '')}
                                    placeholder={schema.localesLab['dataTypePlaceholder']}
                                    onChange={(value) => {
                                        if (schema.handleTypeChange) {
                                            schema.handleTypeChange(value, lens, items.type)
                                        }
                                    }}
                                >
                                    {SchemaTypes.map((item, index) => {
                                        return (
                                            <Option key={String(index)} value={item}>
                                                {item}
                                            </Option>
                                        )
                                    })}
                                </Select>
                                {(['string', 'number', 'integer', 'boolean', 'null'].includes(items.type) || (Array.isArray(items.type) && items.type.some(ele => ['string', 'number', 'integer', 'boolean', 'null'].includes(ele)))) && (
                                    <Tooltip
                                        title={schema.localesLab['shouldAllowNull']}
                                        placement="top"
                                    >
                                        <Checkbox
                                            disabled={schema.isReadOnly}
                                            checked={shouldAllowNull}
                                            onChange={(evt: CheckboxChangeEvent) => {
                                                if (schema.handleTypeChangeWithNull) {
                                                    schema.handleTypeChangeWithNull(items.type, evt.target.checked, lens)
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                )}
                                <Input
                                    value={items.title || ''}
                                    disabled={schema.isReadOnly}
                                    placeholder={schema.localesLab['addTitlePlaceholder']}
                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                                        if (schema.handleTitleChange) {
                                            schema.handleTitleChange(evt.target.value, lens)
                                        }
                                    }}
                                />
                                <Input
                                    value={items.description || ''}
                                    disabled={schema.isReadOnly}
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
                            {(['string', 'number', 'integer'].includes(items.type) || (Array.isArray(items.type) && items.type.some(ele => ['string', 'number', 'integer'].includes(ele)))) && (<Tooltip
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
                            </Tooltip>)}
                            {items.type === 'object' && (
                                <Tooltip
                                    title={schema.localesLab['addChildNode']}
                                    placement="top"
                                >
                                    <Button
                                        type="link"
                                        icon={<PlusCircleOutlined style={{ color: schema.isReadOnly ? 'rgb(184 184 184)' : 'green' }} />}
                                        disabled={schema.isReadOnly}
                                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                                        onClick={() => {
                                            if (schema.addItem) {
                                                schema.addItem(
                                                    [...lens, 'properties'],
                                                    PropertyType.CHILD
                                                )
                                            }
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </Col>

                    </Row>
                    {getComponent(items, lens, showAdvanced)}
                </>
            )}
        </SchemaContext.Consumer>
    )
}
