import type { MouseEventHandler, ReactNode } from 'react';
import { ProgressProps } from 'antd/lib/progress';
import { TableProps } from 'antd/lib/table';
import { ModalProps } from 'antd/lib/modal';

export interface UploadProps {
    visible: boolean;
    onChange: Function;
    title?: string;
    templateDescribe?: string;
    templateButtonClick?: Function;
    templateButtonLoading?: boolean;
    uploadDescribe?: string;
    buttonDescribe?: string;
    maxSize?: number;
    onCancel: MouseEventHandler<HTMLElement>;
    onSubmit: MouseEventHandler<HTMLElement>;
    rowKey?: string | any[];
    tableColumns?: any[];
    tableProps?: TableProps<any>;
    modalProps?: ModalProps;
    locale?: 'zh-CN' | 'en-US';
    ossParams?: {
        systemName?: string;
        bucketName?: string;
    };
    isShowProgress?: boolean;
    progressProps?: ProgressProps;
    accept?: string;
    uploadCustomMethod?: Function | false;
    addRules?: (file: any) => { rule: boolean; errorMessage: string }[];
    stopUploadVerification?: boolean;
    submitButtonLoading?: boolean;
    successFooterButton?: any;
    customErrorFailTitle?: (num: number) => any;
    customerElement?: any; //空元素
    taskTitle?:string;//任务标题
    autoSubmit?:boolean;//是否自动提交
    taskStatus?:string;//任务状态
    taskCenter?:boolean;//是否接入任务中心
}

export interface FileProps {
    state: 'default' | 'customError' | 'parsingFail' | 'success';
    name: string;
    file?: undefined;
    url?: '';
    errorMsgList?: any[];
    errorText?: string;
}

export interface UniFiledUploadRef {
    fileData: FileProps;
    setFileData: Function;
}

export interface DefaultStateProps {
    setFileData: Function;
    maxSize: number;
    accept: string;
    locale: 'zh-CN' | 'en-US';
    ossParams?: {
        systemName?: string | undefined;
        bucketName?: string;
    };
    uploadDescribe?: string;
    uploadCustomMethod: Function | false;
    addRules?: (file: any) => { rule: boolean; errorMessage: string }[];
    stopUploadVerification?: boolean;
}

export interface SuccessStateProps {
    fileData: any;
    setFileData: Function;
    taskStatus?:string;
    autoSubmit?:boolean
}

export interface ParsingFailProps {
    fileData: any;
    setFileData: Function;
    rowKey: string | any[];
    tableColumns: any[] | undefined;
    tableProps: any;
    locale: 'zh-CN' | 'en-US';
    customErrorFailTitle?: (num: number) => any;
}

export interface CustomErrorProps {
    fileData: any;
    setFileData: Function;
    locale: 'zh-CN' | 'en-US';
}
