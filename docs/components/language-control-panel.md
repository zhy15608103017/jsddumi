---
title: language switch 语言切换
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# language-control-panel  

## 背景

切换站点的语言标识

## 代码演示

```tsx
/**
 * iframe: true
*/

import React from "react";
import LanguageControlPanel, {
  currentLanguage,
} from '@jusda-tools/language-control-panel';

const App = () => {
  const languageSwitch = (locale: string) => {
    // ...
  };

  return (
    <div>
      <LanguageControlPanel locale="zh-CN" onClick={languageSwitch} />
    </div>
  );
};

export default App;
```

## 使用方法

```bash
$ npm install --save @jusda-tools/language-control-panel --registry http://nexus.jusda.int/verdaccio/
```

## API

| 属性    | 说明         | 类型             | 默认值  | 版本 |
| ------- | ------------ | ---------------- | ------- | ---- |
| onClick | 切换时的回调 | (locale) => void | -       | -    |
| theme   | 主题         | string           | light   | -    |
| locale  | 默认激活语言 | string           | 'en-US' | -    |

