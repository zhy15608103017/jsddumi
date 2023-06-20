import React, { useState, useRef, useEffect, forwardRef } from 'react';
import UniFileUpload, {
    // @ts-ignore
    UniFiledUploadRef,
} from '../UniFieldUpload';
import { currentLanguage } from "@jusda-tools/language-control-panel";
// @ts-ignore
import exportFn from '@jusda-tools/pollingdownload';
import { errorColumn } from './configure';
import { ConfigProvider, message, Spin } from 'antd';
import enUS from '../locale/en-US'
import { getTaskStatus } from '../service/task';
import { sleep } from '../utils';
import getLocale from '../locale';
import antd_enUS from "antd/lib/locale/en_US";
import antd_zhCN from "antd/lib/locale/zh_CN";
const UnifiedUploadWithTask = (
    {
        visible,
        onChange,
        templateDescribe,
        templateButtonClick,
        templateButtonLoading = false,
        uploadDescribe,
        maxSize,
        onSubmit,
        rowKey,
        tableColumns,
        tableProps,
        modalProps,
        locale,
        isShowProgress,
        buttonDescribe,
        downLoadTemplateApi,
        uploadApi,
        taskCenter = false,
        ossParams,
        autoSubmit = false,
        title = 'Upload',
        progressProps = {},
        accept,
        taskTitle,
        templateName,
        downloadTip,
        uploadCustomMethod,
        onCancel,
        addRules,
        stopUploadVerification,
        submitButtonLoading: submitButtonLoadingConfig,
        successFooterButton,
        customErrorFailTitle = () => { },
        customerElement
    }: {
        visible?: any;
        onChange?: () => {};
        templateDescribe?: string;
        templateButtonClick?: () => {};
        templateButtonLoading?: boolean;
        uploadDescribe?: string;
        buttonDescribe?: string;
        maxSize?: number;
        onSubmit?: () => {};
        rowKey?: string;
        tableColumns?: any;
        tableProps?: any;
        modalProps?: any;
        downLoadTemplateApi?: any,
        uploadApi?: any,
        taskCenter?: boolean,
        isShowProgress?: boolean;
        ossParams?: any,
        autoSubmit?: boolean
        title?: string,
        taskTitle?: string
        locale?: string
        templateName?: string
        downloadTip?: string
        progressProps?: any
        onCancel?: () => {}
        accept?: string;
        uploadCustomMethod?: Function | false;
        addRules?: (file: any) => { rule: boolean; errorMessage: string }[];
        stopUploadVerification?: boolean;
        submitButtonLoading?: boolean;
        successFooterButton?: any;
        customErrorFailTitle?: (num: number) => any;
        customerElement?: any; //空元素
    }, ref: React.Ref<unknown>) => {
    const currentLocale = getLocale(currentLanguage());
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const [uploadData, setUploadData]: any = useState();
    const uploadRef = useRef<UniFiledUploadRef>({
        fileData: {
            state: 'default',
            name: '',
        },
        setFileData: () => { },
    });
    // 上传加载loading
    const [uploadLoading, setuploadLoading] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [upLoadShow, setUpLoadShow] = useState(false);
    const [taskStatus, setTaskStatus] = useState('CREATED');

    const downloadOrderUpdateTemplate = async () => {
        setuploadLoading(true);
        let result = downLoadTemplateApi && downLoadTemplateApi()
        templateName = templateName || `${(enUS as any)['bulkImportInfoTemplate']}.xlsx`
        result?.then((res: any) => {
            setuploadLoading(false);

            if (res?.success) {
                // 直接返回的地址
                if (res?.data?.includes('http')) {
                    const a = document.createElement('a');
                    // @ts-ignore
                    a.download = templateName
                    a.href = res?.data;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    return
                }
                message.info(downloadTip || currentLocale['Downloading files, please wait'], 7)
                return exportFn(
                    String(res?.data),
                    {
                        duration: 3000,
                        fileName: templateName
                    }
                )
            }


        })
    };

    const uploadChange = (value: any) => {
        setUploadData(value);
        setTaskStatus('CREATED')
        setUploadPercent(0)
        setUpLoadShow(false)
    };
    const onSubmitUpload = (fileData: any) => {
        setSubmitButtonLoading(true);
        const obj = {
            fileId: fileData?.url || uploadData.url,
        };
        // api.paramsExcel(obj)

        uploadApi(obj)
            .then(async (res: { data: string; success: boolean, errorCode: string, errorData: any }) => {
                if (!res?.success) {
                    if (res?.errorCode == 'EXCEL_TEMPLATE_ERROR') {
                        message.error(currentLocale['EXCEL_TEMPLATE_ERROR'])
                    }
                    else {
                        res.errorData = []
                        message.error(currentLocale['Upload failed, please check whether the imported content is correct'])
                    }
                    setSubmitButtonLoading(false);
                    return;
                }
                isShowProgress ? setUpLoadShow(true) : ''
                let taskStatus = 'CREATED'
                let nowUploadPercent = 0
                while (taskCenter && taskStatus == 'CREATED') {
                    let taskRes = await getTaskStatus(res?.data)
                    taskStatus = taskRes?.data?.status
                    nowUploadPercent += Math.ceil(Math.random() * 10)
                    nowUploadPercent = Math.min(nowUploadPercent, 99)
                    setUploadPercent(nowUploadPercent)
                    await sleep(1)
                }
                setUploadPercent(100)
                if (!taskCenter) {
                    message.success(currentLocale['uploadSuccess'])
                }
                setTaskStatus(taskStatus)
                setSubmitButtonLoading(false);
                !taskCenter ? onCancel?.() : ''
            })
            .catch(() => {
                setSubmitButtonLoading(false);
            });
    };

    useEffect(() => {
        if (!visible) {
            //关闭的的时候清除掉之前的信息
            uploadRef?.current?.setFileData({
                state: 'default',
                file: {},
            });
            setTaskStatus('CREATED')
            setUploadPercent(0)
            setUpLoadShow(false)
        }

    }, [visible]);
    return (
        <ConfigProvider locale={currentLanguage()?.includes("zh") ? antd_zhCN : antd_enUS}>
            <Spin spinning={uploadLoading}>
                {/* 上传Excel部分 */}
                <UniFileUpload
                    visible={visible}
                    onChange={onChange || uploadChange}
                    title={title}
                    templateDescribe={templateDescribe}
                    templateButtonLoading={templateButtonLoading}
                    uploadDescribe={uploadDescribe || `${currentLocale['fileMessageOne']}${currentLocale['fileMessageTwo']}${currentLocale['fileMessageThree']}`}
                    buttonDescribe={buttonDescribe}
                    maxSize={maxSize}
                    // @ts-ignore
                    onCancel={onCancel}
                    templateButtonClick={templateButtonClick || downloadOrderUpdateTemplate}
                    submitButtonLoading={submitButtonLoadingConfig && submitButtonLoading}
                    rowKey={rowKey}
                    tableColumns={tableColumns || errorColumn({ currentLocale })}
                    tableProps={tableProps}
                    modalProps={modalProps}
                    // @ts-ignore
                    locale={locale}
                    ossParams={ossParams}
                    // @ts-ignore
                    isShowProgress={upLoadShow}
                    taskStatus={taskStatus}
                    taskCenter={taskCenter}
                    addRules={addRules}
                    progressProps={
                        {
                            percent: uploadPercent,
                            strokeColor: (taskStatus == 'SUCCESS' || taskStatus == 'CREATED') ? '#FFC600' : '#E0311B',
                            status: (taskStatus != 'SUCCESS' && taskStatus != 'CREATED') ? 'exception' : 'active',
                            ...progressProps
                        }

                    }
                    autoSubmit={autoSubmit}
                    taskTitle={taskTitle}
                    accept={accept}
                    successFooterButton={successFooterButton}
                    customerElement={customerElement}
                    customErrorFailTitle={customErrorFailTitle}
                    uploadCustomMethod={uploadCustomMethod}
                    stopUploadVerification={stopUploadVerification}
                    // @ts-ignore
                    ref={uploadRef} // 获取设置组件状态的方法.
                    onSubmit={onSubmit || onSubmitUpload}

                />
            </Spin>
        </ConfigProvider>
    );
};

export default forwardRef(UnifiedUploadWithTask);
