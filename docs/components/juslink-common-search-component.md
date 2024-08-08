---
title: juslink-common-search-component 统一搜索组件
nav: 组件
toc: content
group: 
  title: 业务组件
  order: 3
---
# juslink-common-search-component

## 背景

业务系统统一搜索组件

## 代码演示

<code iframe="800" src="./../../demo/juslink-common-search-component"></code>

## 使用方法

```bash

$ npm install --save @jusda-tools/juslink-common-search-component --registry http://nexus.jusdaglobal.com/repository/npm-group
```

## API
```bash
    defaultSearchTermKeys: string[], // 默认展示条件key
    searchTermOptions: SearchTermOption[], // 可配置搜索条件
    resetText: string, // 重置按钮文本
    searchText: string, // 搜索按钮文本
    fetchData: (searchParams: any) => Promise<any>, // 搜索操作触发的异步方法
    onSearchClick: (e: Event) => void, // 搜索按钮click事件
    onResetClick: (e: Event) => void, // 重置按钮click事件
    key?:string, // 存储配置条件时使用的组件id
    theme?: { token: any, [key: string]: string }, // 覆盖antd配色
    showSearchButton?: boolean, // 是否显示搜索按钮
    showResetButton?: boolean, // 是否显示重置按钮
    searchButtonProps?: Omit<ButtonProps, 'onClick'>  // 搜索按钮除onClick外的其他传参
    resetButtonProps?: Omit<ButtonProps, 'onClick'> // 重置按钮除onClick外的其他传参
    locale?: 'zh-CN'|'en-US', // 国际化，目前仅支持中英，默认中文
    disableAutoSearch?: boolean, // 禁用所有普通输入类型的输入框回车后的搜索，若字段设置有此值，则以字段设置为准
```

## SearchTermOption

```bash
   type BaseTermOption = {
    key: string,
    widget?: TermType,
    label?: string,
    sticky?: boolean,
    disableAutoSearch?: boolean,
  }

  interface InputOption extends BaseTermOption, InputProps {
      widget?: TermType.INPUT
  }
  interface SelectOption extends BaseTermOption, SelectProps {
      widget: TermType.SELECT,
      model: undefined,
  }
  interface MultiSelectOption extends BaseTermOption, SelectProps {
      widget: TermType.MULTI_SELECT,
      model: 'multiple',
      searchPlaceholder:string,
  }
  interface DatetimeOption extends BaseTermOption, DatePickerType {
      widget: TermType.DATETIME,
  }
  type SearchTermOption = InputOption | SelectOption | MultiSelectOption | DatetimeOption
```

