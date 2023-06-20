/* eslint-disable no-unused-vars */
import React from 'react';
import './index.less';
import { FiledIcon } from '../svgIcon/file';
import { Upload, message } from 'antd';
// @ts-ignore
import { InitUpload } from '@jusda-tools/jusda-file-upload';
import getLocale from '../../locale';
import { DefaultStateProps } from '../types';
import { currentLanguage } from '@jusda-tools/language-control-panel';

// @ts-ignore
const initUpload = new InitUpload();

const { Dragger } = Upload;

const DefaultState = ({
    setFileData = () => {},
    maxSize,
    accept,
    locale = 'zh-CN',
    ossParams,
    uploadDescribe,
    uploadCustomMethod,
    addRules = () => {
        return [{ rule: false, errorMessage: '' }];
    },
    stopUploadVerification = false,
}: DefaultStateProps) => {
    const acceptSplit: any = accept.split(',');
    const currentLocale = getLocale(currentLanguage());
    // @ts-ignore
    const beforeCheck = (file: any) => {
        if (stopUploadVerification) {
            return true;
        }
        const fileNameSplit = file.name.split('.');
        const ruleFileName = fileNameSplit.some((item: string) =>
            /,|，/g.test(item),
        );

        const rules = [
            {
                rule: ruleFileName,
                errorMessage: currentLocale['Unsupported file name'],
            },
            {
                rule: !acceptSplit.includes(
                    `.${fileNameSplit[fileNameSplit.length - 1].toLowerCase()}`,
                ),
                errorMessage: currentLocale['Unsupported file format'],
            },
            {
                rule: file.size >= maxSize,
                errorMessage: currentLocale['The file is too large'],
            },
            ...addRules(file),
        ];

        return rules.every((item) => {
            if (item.rule) {
                message.error(item.errorMessage);
                return false;
            }
            return true;
        });
    };

    // @ts-ignore
    const uploadProps = {
        multiple: false,
        accept,
        name: 'file',
        showUploadList: false,
        beforeUpload: (file: any) => {
            if (!beforeCheck(file)) {
                return false;
            }
            if (uploadCustomMethod) {
                uploadCustomMethod(file);
                return false;
            }

            initUpload
                .initFileUploadFn(
                    file,
                    ossParams?.systemName,
                    ossParams?.bucketName + '/' + file.name,
                )
                .then((res: any) => {
                    setFileData({
                        url: res?.data?.fileId,
                        name: file?.name,
                        state: 'success',
                    });
                })
                .catch(() => setFileData({ state: 'parsingFail' }));
            return false;
        },
    };

    return (
        <div>
            <Dragger {...uploadProps}>
                <p>
                    <FiledIcon />
                </p>
                <p className={'uploadText'}>
                    {uploadDescribe ||
            currentLocale['Click or drag file to this area to upload']}
                </p>
            </Dragger>
        </div>
    );
};

export default DefaultState;
