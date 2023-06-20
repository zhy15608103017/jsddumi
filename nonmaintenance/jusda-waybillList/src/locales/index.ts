import { currentLanguage } from '@jusda-tools/language-control-panel';
import enUS from './en-US.js.js';
import zhCN from './zh-CN.js.js';
// 国际化弹框按钮
const setLanguage = new Map()
    .set('en-US', enUS.JusdaWaybillList)
    .set('zh-CN', zhCN.JusdaWaybillList);
const jusdaLanguage = currentLanguage();
let language: string = setLanguage.get(jusdaLanguage);
export default language