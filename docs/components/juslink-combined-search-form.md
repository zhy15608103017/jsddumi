---
title: juslink-combined-search-form 技术中台单/多条件搜索组件
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# @jusda-tools/juslink-combined-search-form
## 技术中台单/多条件搜索组件

### 该组件为受控组件。完成单一或多个搜索条件的更新和渲染。提供两种模式：
1. single：单条件搜索，使用input输入框接受搜索条件的输入和变更，回车及点击重置按钮触发搜索条件变更事件，即onChange事件
2. multiple：多条件搜索。默认使用Tag进行多条件的渲染。Tag删除及点击重置按钮触发搜索条件变更事件，即onChange事件

## 代码演示

<code iframe="true" src="../../demo/juslink-combined-search-form/juslink-combined-search-form.jsx"></code>

<!-- 提取MD -->
### 参数列表：
| 参数                 | 说明                | 类型      | 默认    | 备注 |
| -------------------- | ------------------- | --------- | ------- | ---- |
| mode     | 模式   |       'single'&#124;'multiple'    | 'single |      |     |
| value      | 条件传参     | SubParamItem[]                      | -   | -    |
| defaultValue | 默认条件传参 | SubParamItem[]   | []     | -    |
| onChange | ‘single’模式下输入框回车触发，‘multiple’模式下删除Tag触发，点击重置触发 | (nextValue: SubParamItem[]) => void;   | -     | -    |
| addFilterButtonRender | 'multiple'模式下自定义添加条件按钮渲染方法 | (defaultNode: any, addCondfunc: (data: SubParamItem) => void) => void;  | -   | -    |
| loading | loading状态，控制重置按钮loading，Tag可删除状态等 | boolean  | false   | -    |
| searchInputProps | single模式下Input除‘value’、'onChange'、'onPressEnter'、'bordered'外其他参数 | Omit<InputProps, 'value' &#124; 'onChange' &#124; 'onPressEnter' &#124; 'bordered'>  | -    | -    |
| valueRender | multiple模式下，单个条件的渲染方法| (item: SubParamItem)=>ReactNode  | -   | -    |
| singleSearchFilterKey | single模式下input框onPressEnter触发后条件key的传参| string| ‘’  | -    |

<!-- end提取MD -->

该组件使用antd 5.x版本