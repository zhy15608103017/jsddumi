/* eslint-disable @typescript-eslint/explicit-function-return-type */
import getCssVariables from '../utils/cssVariables';
import initBaseStyle from '../utils/initBaseStyle';

export default function initCssVariables(){
    const cssVariables = getCssVariables();
    Object.entries(cssVariables).forEach(([property, value]) => {
        //@ts-ignore
        document.documentElement.style.setProperty(property, value);
    });
    initBaseStyle();
}