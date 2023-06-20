# local-permission

```javaScript
import React from 'react';
import LocalPermissionWrap from '@jusda-tools/local-permission'

function App() {

  return (
    <div>
          <LocalPermissionWrap>
              <div>content</div>
          </LocalPermissionWrap>

    < /div>
  );
}
```
#### 更新记录

| 版本号               | 更新内容                        
| ------------------ | --------------------------- 
| 0.0.01        | 区分内网和外网环境(调用接口不一致)            |