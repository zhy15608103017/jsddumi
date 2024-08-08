import { css } from '@emotion/css';
export const successContainer = () => {
    return css`
    padding: 32px 0;`
}
export const uniFileUploadIcon = () => {
  return css`
  margin-bottom: 16px;`
}
export const successName = () => {
  return css`
  position: relative;

  svg {
    position: absolute;
    top: 4px;
    margin-left: 16px;
    cursor: pointer;
    &:hover {
      path {
        fill: #ffc500;
      }
    }
  }`
}