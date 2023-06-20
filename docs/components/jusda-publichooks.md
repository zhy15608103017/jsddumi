---
title: jusda-publichooks hooks方法
nav: 组件
toc: content
group: 
  title: React-Hook
  order: 0
---

# jusda-publichooks
 
# Installation

> 注: 外网需换成内网地址

```bash
npm install --save @jusda-tools/jusda-publichooks --registry=http://nexus.jusda.int/verdaccio/
```

# 使用案例

## useRequest 

> 接口请求时增加一个loading状态

```tsx | pure

const [valiLoading, runValiSql] = useRequest(postPreview);

function fetchData() {
	// ...  组装参数params
	const resp = await runValiSql(params);
	// ...
}

return <Button onClick={fetchData} loading={valiLoading}>提交</Button>

```

## useSafeGetState

> React useState的封装，能获取到最新的state值，setState的时候判断了页面是否卸载，防止内存溢出

```tsx | pure
import { useEffect, useState } from 'react';
import { useSafeGetState } from '@jusda-tools/jusda-publichooks'


const Child = () => {
    const [value, setValue] = useSafeGetState<string>();

    useEffect(() => {
        setTimeout(() => {
            // 异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏
            setValue('data loaded from server');
        }, 5000);
    }, []);

    const text = value || 'Loading...';

    return <div>{text}</div>;
};

const Demo = () => {
    const [visible, setVisible] = useState(true);
    const [count, setCount, getCount] = useSafeGetState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // 增加了一个 getter 方法，以获取当前最新值
            console.log('useSafeGetState', count, getCount());
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <>
            <button onClick={() => setCount((count) => count + 1)}>count: {count}</button>
            <button onClick={() => setVisible(false)}>Unmount</button>
            {visible && <Child />}
        </>
    )
}

export default Demo

```
