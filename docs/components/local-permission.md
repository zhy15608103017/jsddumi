---
title: local-permission 国内外判断
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---
# local-permission

## 方法

### LocalPermissionWrap

组件包裹，如果是国内的话会显示子集，否则不显示
```tsx | pure
<LocalPermissionWrap>
	<div>国内</div>
</LocalPermissionWrap>
```

### localPermissionFn

返回一个bool 类型，标识是否为国内
```tsx | pure
localPermissionFn()
	.then(data => {
		console.log('是否国内:', data);
	})
	.catch(error => {
		console.error('获取是否国内:', error);
	});
```

### getCurrentLocation

返回当前地区code，可用作地区逻辑处理 {"country": "CN"}
```tsx | pure
getCurrentLocation()
	.then(data => {
		console.log('当前地区:', data);
	})
	.catch(error => {
		console.error('获取地区出错:', error);
	});
```


## 代码演示
```jsx
import React,{ useEffect } from 'react';
import LocalPermissionWrap,{ localPermissionFn, getCurrentLocation } from '@jusda-tools/local-permission'

function App() {
	// window.jusdaBaseConfig.cfgType = 'prod';
	// window.jusdaBaseConfig.isIntranet = true;
	useEffect(()=>{
		getCurrentLocation()
		.then(data => {
			console.log('当前地区:', data);
		})
		.catch(error => {
			console.error('获取地区出错:', error);
		});
		localPermissionFn()
		.then(data => {
			console.log('是否国内:', data);
		})
		.catch(error => {
			console.error('获取是否国内:', error);
		});
	},[]);

	return (
		<div>
			<LocalPermissionWrap>
				<div>国内</div>
			</LocalPermissionWrap>

		< /div>
	);
}

export default App;
```

###### 0.0.9 更新内容:
```base
1.判断国内外接口更改，新增一个方法，获取当前地区code
```