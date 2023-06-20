import React from 'react';
import './index.less';
import { FailIcon } from '../svgIcon/file';
import { DeleteIcon } from '../svgIcon/system';
import { CloseCircleOutlined } from '@ant-design/icons';
import getLocale from '../../locale';
import { CustomErrorProps } from '../types';

const CustomError = ({
    fileData = {},
    setFileData = () => {},
    locale = 'zh-CN',
}: CustomErrorProps) => {
    const deleteCurrentFileData = () => {
        setFileData({ state: 'default', file: {}, failedToResolve: false });
    };
    const currentLocale = getLocale(locale);
    const { name = '' } = fileData;

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
                {fileData?.errorText
                    ? fileData.errorText
                    : currentLocale['The template you uploaded is incorrect!']}
            </div>
        </div>
    );
};

export default CustomError;
