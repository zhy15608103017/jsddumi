/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { css } from '@emotion/css';
// import { theme } from 'antd';
// import { getAntdConfig } from '@jusda-tools/jusda-theme-config';

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
const ant_prefix = 'juslink';
// const jusdaThemeConfig = {
//     token: getAntdConfig('v5'),
// };
// const { getDesignToken } = theme;

// const themeConfig = getDesignToken(jusdaThemeConfig);
// const { colorPrimary } = themeConfig;

const faReportTableStyle = ()=>{
    return css `
    .${ant_prefix}-table-content {
        > table {
          .${ant_prefix}-table-thead {
            > tr {
              > th {
                &:last-child {
                  border-left: 1px solid #ccc;
                }
              }
            }
          }
          .${ant_prefix}-table-tbody{
            tr{
                &:not(:first-child):last-child{
                    td{
                        border-bottom:  1px solid #ccc;
                    }
                }
    
            }
          }
          .${ant_prefix}-table-tbody,
          .${ant_prefix}-table-summary {
            > tr:not(.${ant_prefix}-table-placeholder){
              > td{
                &:not(:first-child):last-child {
                  border-left: 1px solid #ccc;
                }
              }
            }
          }
        }
      }
    `;
};

// ============================== Export ==============================
export {
    faReportTableStyle,
};