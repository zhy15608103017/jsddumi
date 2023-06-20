import React from 'react';
import './index.less';
import { FailIcon } from '../svgIcon/file';
import { DeleteIcon } from '../svgIcon/system';
import { columns } from './columns';
import { Table } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import getLocale from '../../locale';
import { ParsingFailProps } from '../types';
import { currentLanguage } from '@jusda-tools/language-control-panel';

const DefaultState = ({
    fileData = {},
    setFileData = () => {},
    rowKey = 'lineNo',
    tableColumns = columns(),
    tableProps = {},
    locale = 'zh-CN',
    customErrorFailTitle = () => null,
}: ParsingFailProps) => {
    const deleteCurrentFileData = () => {
        setFileData({ state: 'default', file: {}, failedToResolve: false });
    };
    const { errorMsgList = [], name = '' } = fileData;
    const currentLocale = getLocale(currentLanguage());

    const currentColumns = tableColumns?.length ? tableColumns : columns();

    return (
        <div className={'fail-container'}>
            <div>
                <FailIcon />
            </div>
            <div className={'fail-name'}>
                {name}
                <span onClick={deleteCurrentFileData}>
                    <DeleteIcon />
                </span>
            </div>
            <div className={'fail-text'}>
                <CloseCircleOutlined />
                {customErrorFailTitle(errorMsgList.length) ? (
                    customErrorFailTitle(errorMsgList.length)
                ) : (
          <>
            {currentLocale['You have']} {errorMsgList.length}{' '}
            {currentLocale['error reason!']}
          </>
                )}
            </div>
            <div className={'fail-table-container'}>
                <Table
                    columns={currentColumns}
                    rowKey={(record: any) =>
                        `${
                            typeof rowKey === 'object'
                                ? rowKey.map((item: any) => {
                                    return record?.[item];
                                })
                                : record?.[rowKey]
                        }`
                    }
                    pagination={false}
                    size={'small'}
                    scroll={{
                        y: 200,
                    }}
                    dataSource={errorMsgList}
                    {...tableProps}
                />
            </div>
        </div>
    );
};

export default DefaultState;
