import { css } from '@emotion/css';


export const dropdownStyle = (token) => {
    return css`
        position:  unset;
        .juslink-select-item-option-state{
            display: none;
        }
        .checkable-option{
            .juslink-checkbox{
                margin-top: -4px;
            }
            
        }
        .custom-dropdown-box{
            padding: 4px;
            width: 284px;
            .custom-selected-item-box{
                display: flex;
                align-items: center;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
                padding: 2px 4px;
                width: 100%;
                height: 36px;
                &.custom-selected-item-box-focus{
                    border-color: ${token.colorPrimaryBg};
                    box-shadow: 0px 0px 4px 0px ${token.colorPrimaryBg};
                }
                .custom-select-placeholder{
                    flex:1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #ccc;
                }
                
                .juslink-tag{
                    &.custom-selected-tag-no-search{
                        max-width: 100%;
                        .custom-selected-tag{
                            max-width: 230px;
                        }
                    }
                    max-width: calc(100% - 48px);
                    .custom-selected-tag{
                        display: inline-block;
                        max-width: 185px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        vertical-align: bottom;
                    }
                }
                >input{
                    height: 30px;
                    flex: 1 1 48px;
                }
            }
            .option-wrapper{
                max-height: 500px;
                overflow:auto;
                .juslink-select-item-option-content{
                    width: calc(100% - 36px);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    `
}

export const selectStyle = () => {
    return css`
        display: none;
    `
}

export const datetimeInputStyle = (token) => {
    return css`
        .normal-text{
            color: #8d9aad;
        }
        .shortcut{
            width: 60px;
            background-color: ${token.colorPrimaryBg};
            color: #ea9000;
            font-size: 12px;
            border-radius: 4px;
            text-align: center;
            line-height: 20px;
            margin-top:8px;
            &:hover{
                cursor: pointer;
            }
        }
    `
}

export const formItemStyle = (token) => {
    return css`
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        line-height: 32px;
        padding: 0 8px;
        margin-bottom: 8px;
        position: relative;
        &.focused{
            box-shadow: 0px 0px 4px 0px ${token.colorPrimaryBg};
            border-radius: 2px;
            border-color: ${token.colorPrimaryBg};
        }
        &:hover{
            .form-item-clear{
                display: inline-block;
            }
        }
        .form-item-label{
            color:#666;
        }
        .form-item-clear{
            background-color: #fff;
            display: none;
            position: absolute;
            right: 16px;
            top: 50%;
            color: #b4b4b4;
            transform: translateY(-50%);
            &:hover{
                color: #aaa;
                cursor: pointer;
            }
        }


    `
}

export const plainTextStyle = (isEmpty) => {
    return css`
        max-width: 300px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: bottom;
        color: #000;
        font-weight: ${isEmpty ? 400 : 'bold'};
    `
}

export const noPaddingPopoverStyle = () => {
    return css`
    .juslink-popover{
        .juslink-popover-inner {
            padding: 0;
            box-shadow: none;
        }
    }
    `
}

export const termPopoverStyle = () => {
    return css`
        .juslink-popover{
            padding-top: 0;
            .juslink-popover-inner-content{
                padding:0;
            }
           

        }
        .juslink-popover-arrow{
            display: none;
        }
        .btn-box{
            margin-top: 16px;
            .juslink-btn{
                width: 60px;
                text-align: center;
                padding:0;
                color: #222;
            }
        }
    `
}