import React from 'react';
import { Form, Input, Select, Col } from 'antd';
import getLocale from '../../locale';
import { currentLanguage } from '@jusda-tools/language-control-panel';

const { Item } = Form;
const currentLocale: any = getLocale(currentLanguage());
export const itemNodeMap = new Map()
    .set('Input', (data: any) => {
        return (
            <Col span={data.span || null} key={data?.name}>
                <div style={{ width: data.width || '100%' }}>
                    <span className="lebel"> {data?.label}</span>
                    <Item
                        // label={data?.label}
                        name={data?.name}
                        rules={data?.rules || []}
                    >
                        <Input
                            placeholder={currentLocale[data?.placeholder]}
                            suffix={data?.suffix}
                            allowClear={data?.allowClear}
                        />
                    </Item>
                </div>
            </Col>
        );
    })
    .set('Select', (data: any) => {
        return (
            <Col span={data.span || null} key={data?.name}>
                <div style={{ width: data.width || '100%' }}>
                    <span className="lebel"> {data?.label}</span>
                    <Item
                        // label={data.label}
                        style={{ width: data.width || '100%' }}
                        name={data.name}
                        rules={data.rules || []}
                    >
                        <Select
                            mode={data.mode}
                            allowClear
                            style={{ width: data.width || '100%' }}
                            showSearch
                            options={data?.options}
                            // @ts-ignore
                            maxTagCount="responsive"

                            placeholder={currentLocale[data?.placeholder]}
                            optionLabelProp={data.optionLabelProp}
                            optionFilterProp="label"
                            labelInValue={data.labelInValue || false}
                        />
                    </Item>
                </div>
            </Col>
        );
    });
