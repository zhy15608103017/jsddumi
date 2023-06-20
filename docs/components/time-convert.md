---
title: time-convert组件.
nav: 组件
toc: content
group: 
  title: UI组件
  order: 2
---  
## 1.yarn add @jusda-tools/time-convert
## 代码演示
<code iframe="600" src="../../demo/time-convert/time-convert.tsx"></code>

## API及参数说明
组件属性:
* initialValue:默认显示时间
* onOk:点击确定的回调函数，返回时间与时区
* convertConfig:可选，配置返回的格式，具体配置同convertByTimezone传参
convertByTimezone(time,[originTimezone],[format],[withTimezone])
* time，需要转换的时间，传入时间格式。
* originTimezone,可选,需要转换到哪个时区 传入格式为UTC+8，UTC+7.5等，不传则返回当前时区信息，且返回值字符串不带时区
* format 可选 需要转换的时间格式，默认格式为YYYY-MM-DD HH:mm:ss
* withTimezone 可选 返回时间字符串是否需要携带时区信息，默认为true
|名称|描述|类型|可选值|默认值|
|:-:|:-:|:-:|:-:|:-:|
|time|需要转换的时间|Date|-|当前时间|
|originTimezone|需要转到到的时区|string|UTC+8,UTC+7.5等|当前所在地区时区|
|format|返回的日期格式|string|符合dayjs日期格式|YYYY-MM-DD HH:mm:ss|
|withTimezone|是否需要携带时区信息|boolean|true、false|true|
