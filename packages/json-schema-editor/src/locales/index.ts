import zhCN from './zh-CN';
import enUS from './en-US';

export default function IntlFn(localeTag?:string) {
    if( localeTag === 'zh-CN')return zhCN;
    return enUS;
}
