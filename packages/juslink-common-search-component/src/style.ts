import { css } from "@emotion/css"

export const wrapperStyle = ()=>{
    return css`
        display: flex;
        width: 100%;
        margin-bottom: -8px;
        .terms-area{
            flex: 1;
            .juslink-form-inline .juslink-form-item {
                margin-right: 10px;
            }
        }
        .search-btn-box{
            align-items: flex-start;
            .juslink-btn{
                border-radius: 4px;
                color: #222;
            }
        }
        .w-90{
            width: 90px;
        }
        
    `
}