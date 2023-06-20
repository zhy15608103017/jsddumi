# 使用指南

```bash
$ npm install --save @jusda-tools/language-control-panel --registry http://nexus.jusdaglobal.com/repository/npm-group
```

## props

| 属性                 | 说明     | 类型   | 默认值 | 版本 |
| -------------------- | -------- | ------ | ------ | ---- |
| onClick | 切换时的回调 | (locale) => void | -  | -    |
| theme | 主题 | string | light  | -    |
| locale | 默认激活语言 | string | 'en-US'  | -    |

  

```JavaScript
import LanguageControlPanel, { currentLanguage } from "@jusda-tools/language-control-panel";


export default function Demo() {

    const languageSwitch = (locale: string) => {
        console.log('locale: ', locale);
        // ...
    }

    useEffect(() => {
        console.log('currentLanguage', currentLanguage());
    }, []);

    return (
        <div>
            <LanguageControlPanel locale="zh-CN" onClick={languageSwitch} />
        </div>
    );
}

```

#### 更新记录

##### V0.3.2
1、设置cookie时增加过期时间(1年)