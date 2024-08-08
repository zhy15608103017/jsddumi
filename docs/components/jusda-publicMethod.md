---
title: jusda-publicmethod  公共方法库.
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---

# jusda-publicMethod

# Installation

> 注: 外网需换成内网地址

```bash
npm install --save @jusda-tools/jusda-publicmethod --registry=http://nexus.jusdaglobal.com/verdaccio/
```

# 使用案例

## 微应用嵌入主应用流程示例

> 1.获取并监听主应用路由参数实现页面跳转示例
## JusdaHistory.subAppPageJump

```tsx | pure
// AppLayouts.tsx``
import { JusdaHistory } from '@jusda-tools/jusda-publicmethod'; //获取公共方法实例
import { history } from 'umi'; // 获取umi4路由跳转方法

function AppLayouts() {
    // 获取公共跳转方法
    const { subAppPageJump } = new JusdaHistory({ history }); 
    // 从主应用拿到该参数并进行监听
    const { urlParams } = useModel('@@qiankunStateFromMaster') || {};
    const { subApplicationPath } = urlParams || {};

    // 监听该参数执行页面跳转方法 必须执行,否则子应用页面跳转逻辑无法使用
    useEffect(() => { 
        subAppPageJump({ urlParams });
    }, [subApplicationPath]);

    return <div></div>
}

export default AppLayouts;
```

## JusdaHistory.microFrontModifyUrl

> 2.子应用手动修改路由示例
> 子应用快捷获取URL参数示例.

```tsx | pure
import { useEffect, useState } from 'react';
import { JusdaHistory, getUrlParams,subApplicationPathParamsSpell } from '@jusda-tools/jusda-publicmethod'
import { history } from 'umi';

// 任意umi4中的hook文件.
const Demo = () => {
    // 获取从主应用传来的修改路由方法.
    const { modifyUrl,urlParams } = useModel('@@qiankunStateFromMaster') || {};
    // 将本umi4系统的history与主应用修改路由方法一同传入该实例.
    // 拿到新的修改路由方法(这样就可以在本地开发没有主应用的时候也能愉快的跳转页面了)
    const { microFrontModifyUrl } = new JusdaHistory({
        history,
        modifyUrl,
    });
    const newUrlParams: {
        individualAccessPath: string; // 已经拼接好的跳转目录. 示例 ${location.pathname}${location.search}
        [propName: string]: string; //参数集合 示例 { SecondaryMenu:XXX, materialId:XXX}
    } = getUrlParams(urlParams);  // 只有单独子应用开发才用得到. 平时都直接用主应用传过来的参数即可

    const subApplicationPath=subApplicationPathParamsSpell({
        routePath:'/materialDetails', //?routePath为子应用的目录."必传", 
        SecondaryMenu:'1',   // 其他SecondaryMenu与materialId为子应用的参数. "非必填"
        materialId:'3475873465786', 
            })

    return (
        <>
           <button 
              onClick={() => {
                    microFrontModifyUrl({  
                        subApplicationPath //`?routePath=/materialDetails&SecondaryMenu=1&materialId=3475873465786`,
                    });
                }}
           >进行页面跳转.</button>
        </>
    )
}

export default Demo
```

> 递归查找并替换指定字符串(内网域名转换)
## convertJuslinkDomainToFoxconnDomain

```tsx | pure
// AppLayouts.tsx``
import { convertJuslinkDomainToFoxconnDomain } from '@jusda-tools/jusda-publicmethod';
//  实际使用时可以不传第二个参数,该示例为默认传参,
  const convertJuslinkDomainToFoxconnDomain = convertJuslinkDomainToFoxconnDomain(data, [
        { type: '.jus-link.', replaceEx: '.foxconn.' },
        { type: '//uat.', replaceEx: '//juslinkuat.' },
        { type: '//www.', replaceEx: '//juslink.' },
    ]);


```
<!-- 提取MD -->
### API
| 参数                                       | 说明                                                         | 类型                                                       | 默认 | 备注                                                                   |
| ------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- | ---- | ---------------------------------------------------------------------- |
| JusdaHistory                               | 整合主应用与子应用的history                                  | CLASS                                                      |      | 必须要传history 如果要使用microFrontModifyUrl必须要传主应用的modifyUrl |
| JusdaHistory.subApplicationPath            | 在layouts文件中监听主应用传过来的参数.执行该方法进行页面跳转 | ({urlParams,pathIgnoredForIndividualAccess:string})=>void; |      |
| JusdaHistory.microFrontModifyUrl           | 子应用手动修改路由方法.                                      | ({history,modifyUrl,historyState})=>void;                  |      | history为自身参数,modifyUrl与historyState从主应用获取                  |
| getUrlParams                               | 子应用快捷获取URL相关参数.                                   | (urlParams)=>URL相关数据;                                  |      | urlParams从主应用获取                                                  |
| JusdaHistory.subApplicationPathParamsSpell | 传入obj帮你拼写subApplicationPath这个参数,看示例3            | (urlParams)=>subApplicationPath;                           |      | 优化项:减去拼写subApplicationPath的重复工作,                           |
| convertJuslinkDomainToFoxconnDomain        | 递归查找并替换指定字符串(内网域名转换)                       | <\T>(data:T, [{type:string,replaceEx:string}])=> T         |      |                                                                        |


###### 0.0.18更新内容:
```base
 1. 修复了在本地开发中,会有错误的undefined出现在路由中
```

###### 1.0.3更新内容:
```base
1. 增加了historyState
2. 增加了convertJuslinkDomainToFoxconnDomain方法
```
<!-- end提取MD -->