import { css } from "@emotion/css"

export const overlayStyle = () => {
    return css`
        &.juslink-popover{
            padding-top: 0;
        }
    `
}

export const moreButtonStyle = () => {
    return css`
    .selected-items-box{
        border-bottom: 1px solid rgba(224,224,224,1);
        .item{
            align-items: baseline;
            .anticon{
                margin-right: 6px;
            }
        }
    }
    .to-select-items-box{
        .item{
            .juslink-checkbox-wrapper{
                margin-left: 20px;
            }
        }
        .title-wrapper{
            margin-bottom: 6px;
        }
    }
        .title-wrapper{
            display: flex;
            justify-content: space-between;
            color: #444;
            font-weight: 500;
            .recover-btn{
                color: #ea9000;
                font-weight: 400;
                &:hover{
                    cursor:pointer;
                }
            }
        }
        
        .item{
            display:flex;
            .juslink-checkbox-wrapper{
                flex:1;
                .juslink-checkbox{
                    align-self: baseline;
                }
            }
        }
        
    `
}

export const moreBtnStyle = () =>{
    return css`
    background-color: #f2f2f2;
    border-radius: 4px;
    border:none !important;
    box-shadow: none;
    margin-top:1px;
    `
}