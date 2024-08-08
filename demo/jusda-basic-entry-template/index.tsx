/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Input, Button, Card } from "antd";
// @ts-ignore
import { BasicTemplateSelect, obtainBasicDataThroughTypes } from '@jusda-tools/jusda-basic-entry-template';
import { API } from '@jusda-tools/jusda-basic-entry-template/src/api';
import TableComponent from "./Table";




const BasicDataIntl = () => {
    const [val, setVal]: any = useState('')
    const tableDataKeys = Object.keys(API);
    const tableData: any = tableDataKeys.map((item: any) => {
        return { ...API[item], key: item }
    })


    return (
        <div style={{
            padding: "12px 16px"
        }}>
            <div style={{ marginBottom: 16 }}>
                <Card style={{ width: '50%' }} title="BasicTemplateSelect组件示例">
                    <BasicTemplateSelect onSelect={(a: any, b: any, c: any) => {
                    }} style={{
                        width: 200
                    }} type={'bsvendors'} />
                </Card>
            </div>
            <div style={{ marginBottom: 16 }} >
                <Card style={{ width: '80%' }} title="obtainBasicDataThroughTypes方法快速测试" >
                    <Input.Group compact>
                        <Input
                            value={val}
                            onChange={(e: any) => {
                                setVal(e?.target?.value)
                            }}
                            style={{ width: 200 }} />
                        <Button
                            onClick={() => {
                                obtainBasicDataThroughTypes({ type: val?.trim() }).then((res: any) => {
                                    console.log("%c Line:32 🌽 res", "color:#ed9ec7", res);

                                })
                            }}
                            type="primary">输入类型调取接口,在控制台查看结果</Button>
                    </Input.Group>
                </Card>

            </div>
            <div>
                <Card title="常用基础数据接口合集">
                    <TableComponent data={tableData} />
                </Card>
            </div>
        </div>

    );
};

export default BasicDataIntl;
