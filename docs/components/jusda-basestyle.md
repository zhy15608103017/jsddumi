---
title: basestyle 表格公共样式
nav: 组件
toc: content
group: 
  title: UI组件
  order: 2
---
## 1.yarn add @jusda-tools/jusda-base-style

## 2.主文件处引入css文件

`import '@jusda-tools/jusda-base-style/dist/jusda-baseStyle.css';`

## 3.按照约定的 HTML与CLASS类名  h1进行排版  只进行排版 样式

# 示例页面1.内嵌表格

## 代码演示

<code iframe="600" src="../../demo/jusda-base-style/nested.jsx"></code>

```javascript
<div className="jusda-main-container">
    {/* 搜索部分 */}
    <div className="jusda-search-container">
        <div className="jusda-search-contents">
            <div className="jusda-search-wrapper">
                {/* 以此类推,一排四个. */}
                <div className="jusda-search-item" />
                <div className="jusda-search-item" />
                <div className="jusda-search-item" />
                <div className="jusda-search-item" />
            </div>
            <div className="jusda-search-buttons-wrapper">
                <Button className="jusda-search-btn jusda-search-btn-normal" />
                <Button className="jusda-search-btn" type="primary" />
            </div>
        </div>
        {/* '展开更多' '可选' 自行添加需要的图标   */}
        <div className="jusda-search-switch" />
    </div>
    {/* 表格部分 普通表格 */}
    <div className="jusda-table-container"></div>
     {/* 表格部分 有嵌套内容的 */}
     <div className="jusda-nested-table-container"></div>
    {/* tabs 部分 */}
    <div className="jusda-tabs-container"></div>
</div>

// 只可在table-container内使用 修改图标颜色 .jusda-table-icon-color = color: #ea9000;
