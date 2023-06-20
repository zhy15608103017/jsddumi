// @ts-nocheck
import styled from 'styled-components';
import { Modal } from 'antd';
export const prefix = 'jusda-feedback';
export const UrlModal: any = styled(Modal)`
    .${prefix}-modal-content {
        background-color: ${(props: any) => props?.themes?.bodyBgColor};
    }
    .${prefix}-modal-header {
        background-color: ${(props: any) => props?.themes?.headerBgColor};
        border-bottom: ${(props: any) => props?.themes?.headerBorderColor};
        .${prefix}-modal-title {
            color: ${(props: any) => props?.themes?.headerColor};
        }
    }
    .${prefix}-modal-close-x {
        color: ${(props: any) => props?.themes?.headerColor};
    }
`;
export const Allbtnstyle = styled.div`
    text-align: center;
    margin-top: 30px;
    button {
        width: 120px;
        height: 40px;
    }
    .cancel {
        color: ${(props: any) => props?.themes?.cancelBtn?.cancelColor};
        background-color: ${(props: any) => props?.themes?.cancelBtn?.bgColor};
        border: 1px solid ${(props: any) =>
            props?.themes?.cancelBtn?.cancelBorder};
    }
    .comfirm {
        margin-left: 20px;
        color: #444;
        box-shadow: unset;
        text-shadow: unset;
`;

export const WarmInfo = styled.div`
    color: ${(props: any) => props?.themes?.color};
    font-size: 12px;
`;

export const Title = styled.div`
    color: ${(props: any) => props?.themes?.color};
    font-size: 12px;
`;

export const TitleUpload = styled.div`
    height: 17px;
    margin: 24px 0px 6px;
    color: ${(props: any) => props?.themes?.color};
    font-size: 12px;
`;

export const Span = styled.span`
    position: absolute;
    right: 13px;
    top: 87px;
    color: #ccc;
    font: 12px PingFangSC-Regular;
`;
export const NewModal: any = styled(Modal)`
    .${prefix}-modal-content {
        opacity: ${(props: any) => props?.themes?.opacity};
        border: 1px solid ${(props: any) => props?.themes?.modelBorder};
        width: 422px;
        .${prefix}-radio-wrapper{
            color: ${(props: any) => props?.themes?.headerColor};
        }
    }
    .${prefix}-modal-header {
        padding: 0px;
        background-color: ${(props: any) => props?.themes?.headerBgColor};
        weight: 700;
        border-bottom: ${(props: any) => props?.themes?.headerBorderColor};
        .${prefix}-modal-title {
            height: 40px;
            line-height: 40px;
            margin-left: 30px;
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            color: ${(props: any) => props?.themes?.headerColor};
        }
    }
    .${prefix}-modal-close-x {
        font-size: 27px;
        height: 40px;
        line-height: 40px;
        width: 34px;
        color: ${(props: any) => props?.themes?.headerColor};
    }
    .${prefix}-modal-body {
        padding: 0px 30px 30px;
        background-color: ${(props: any) => props?.themes?.bodyBgColor};
        .${prefix}-form-item-has-error
            .${prefix}-input,
            .${prefix}-form-item-has-error
            .${prefix}-input-affix-wrapper,
            .${prefix}-form-item-has-error
            .${prefix}-input:hover,
            .${prefix}-form-item-has-error
            .${prefix}-input-affix-wrapper:hover {
            border-color: ${(props: any) =>
                props?.themes?.checkColor} !important;
        }
        .${prefix}-row {
            margin-bottom: 0px;
            .${prefix}-form-item-explain {
                color: ${(props: any) => props?.themes?.checkColor};
            }
            textarea.${prefix}-input {
                font: 12px PingFangSC-Regular;
                color: ${(props: any) => props?.themes?.textVluColor};
                background-color: ${(props: any) => props?.themes?.textBgColor};
                border: 1px solid
                    ${(props: any) => props?.themes?.textBorderColor};
            }
            .${prefix}-input:focus,
                .${prefix}-input-focused,
                .${prefix}-input:hover {
                box-shadow: ${(props: any) => props?.themes?.textBoderHover};
            }
            textarea::-webkit-input-placeholder {
                color: ${(props: any) => props?.themes?.placeholderColr};
            }
            .${prefix}-upload, .${prefix}-upload-list-item {
                width: 80px;
                height: 80px;
                background-color: ${(props: any) =>
                    props?.themes?.uploadBgColor};
                margin: 0px;
                padding: 0px;
                font-size: 12px;
                .${prefix}-progress-outer {
                    width: 78px;
                    text-align: center;
                    .${prefix}-progress-inner {
                        width: 60px;
                    }
                }
            }
            .${prefix}-upload-list-picture-card-container {
                width: 80px;
                height: 80px;
                margin: 0px;
                margin-right: 10px;
                color: ${(props: any) => props?.themes?.processColor};
            }
            .${prefix}-upload.${prefix}-upload-select-picture-card {
                border: 1px dashed
                    ${(props: any) => props?.themes?.textBorderColor};
                > span {
                    height: 78px;
                    color: #666;
                }
            }
        }
    }
`;
