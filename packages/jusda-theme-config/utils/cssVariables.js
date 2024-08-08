import { isTms } from '@jusda-tools/business-env-checker';
import juslinkPackagecssVariables from './juslinkPackagecssVariables.js';
import foxconnPackagecssVariables from './foxconnPackagecssVariables.js';

const juslinkCssVariables = {
    '--jusda-primary-color': '#FFC500',   // 主色
    '--jusda-page-background-color': '#FFFFFF',   // 页面基础背景色
    '--jusda-layout-background-color': '#F2F2F2',   // 布局背景色
    '--jusda-primary-button-color': '#FFC500',   // 主按钮色
    '--jusda-button-highlight-color': '#FFDA39',   // 按钮高亮色
    '--jusda-primary-button-text-color': '#444444', // button①主按钮文字色
    '--jusda-background-white-text-secondary': '#EA9000',   // 白底文字辅助色
    '--jusda-selected-background': '#FFF8D9',   // 选中背景色
    '--jusda-slider-color': '#fcbe5b',   // 滑块色
    '--jusda-slider-handle-color': '#fa8c16',   // 滑块交互
    // '--jusda-ghost-button-hover-color': '#FFAA00',   // 幽灵按钮Hover
    '--jusda-button-click-color': '#FFE366',   // 按钮点击色
    '--jusda-input-box-border-color': '#d9d9d9',   // 一级框边框色（输入）
    '--jusda-input-focus-color': '#FFC500',   // 输入框聚焦色
    '--jusda-outer-box-border-color': '#f0f0f0',   // 二级框边框色（外框）
    '--jusda-tab-ghost-button-click-color': '#FFE366',   // Tab、幽灵按钮点击
    '--jusda-top-border-color': '#CB9C00',   // 顶部线条色
    '--jusda-divider-color': '#E9E9E9',   // 常规分割线条色
    '--jusda-action-icon-color': '#F5AB00',   // 列表内“操作列”icon色
    '--jusda-action-icon-hover-color': '#FFC500',   // 列表内“操作列”icon Hover色
    '--jusda-success-color': '#6FC677',   // 成功色
    '--jusda-warning-color': '#faad14',   // 警戒色
    '--jusda-error-color': '#FF6C6C',   // 错误色
    '--jusda-info-color': '#6294C6',   // 信息色
    '--jusda-table-header-background-color': '#FFFBEA',   // 表格表头背景色
    '--jusda-table-row-background-color': '#F9F9F9',   // 表格间隔背景灰
    '--jusda-menu-collapse-background-color': '#CCCCCC',   // 菜单底部收拉部底色
    '--jusda-secondary-button-hover-color': '#EA9000', // button②次要按钮Hover（灰色幽灵按钮）
    '--jusda-special-ghost-button-color': '#EA9000', // button③特殊幽灵按钮（彩色）
    '--jusda-special-ghost-button-hover-color': '#fcbe5b', // button③特殊幽灵按钮Hover（彩色）
    '--jusda-bottom-overlay-button-color': '#9B9B9B', // button④下方黑色浮层按钮（灰色幽灵）
    '--jusda-bottom-overlay-button-hover-color': '#FFC500', // button④下方黑色浮层按钮Hover（灰色幽灵）
    '--jusda-sidebar-menu-yellow-text-color': '#EA9000', // 左侧菜单黄色文字
    '--jusda-pagination-yellow-color': '#EA9000', // 页码黄色（文字）
    '--jusda-label-title-text-color': '#8D9AAD', // label标题色（文字）
    ...juslinkPackagecssVariables
};

const foxconnCssVariables = {
    '--jusda-primary-color': '#2755a6',   // 主色
    '--jusda-page-background-color': '#FFFFFF',   // 页面基础背景色
    '--jusda-layout-background-color': '#EAF0F5',   // 布局背景色
    '--jusda-primary-button-color': '#2755a6',   // 主按钮色
    '--jusda-button-highlight-color': '#0a71d8',   // 按钮高亮色
    '--jusda-primary-button-text-color': '#FFFFFF', // button①主按钮文字色
    '--jusda-background-white-text-secondary': '#2755a6',   // 白底文字辅助色
    '--jusda-selected-background': '#e1edf4',   // 选中背景色
    '--jusda-slider-color': '#3e89d4',   // 滑块色
    '--jusda-slider-handle-color': '#1677ff',   // 滑块交互
    // '--jusda-ghost-button-hover-color': '#1677ff',   // 幽灵按钮Hover
    '--jusda-button-click-color': '#599eff',   // 按钮点击色
    '--jusda-input-box-border-color': '#d9d9d9',   // 一级框边框色（输入）
    '--jusda-input-focus-color': '#1677ff',   // 输入框聚焦色
    '--jusda-outer-box-border-color': '#f0f0f0',   // 二级框边框色（外框）
    '--jusda-tab-ghost-button-click-color': '#599eff',   // Tab、幽灵按钮点击
    '--jusda-top-border-color': '#7D99C9',   // 顶部线条色
    '--jusda-divider-color': '#E9E9E9',   // 常规分割线条色
    '--jusda-action-icon-color': '#0a71d8',   // 列表内“操作列”icon色
    '--jusda-action-icon-hover-color': '#358DE4',   // 列表内“操作列”icon Hover色
    '--jusda-success-color': '#52c41a',   // 成功色
    '--jusda-warning-color': '#faad14',   // 警戒色
    '--jusda-error-color': '#ff3352',   // 错误色
    '--jusda-info-color': '#1677ff',   // 信息色
    '--jusda-table-header-background-color': '#F6FBFF',   // 表格表头背景色
    '--jusda-table-row-background-color': '#F9F9F9',   // 表格间隔背景灰
    '--jusda-menu-collapse-background-color': '#CCCCCC',   // 菜单底部收拉部底色
    '--jusda-secondary-button-hover-color': '#2755a6', // button②次要按钮Hover（灰色幽灵按钮）
    '--jusda-special-ghost-button-color': '#2755a6', // button③特殊幽灵按钮（彩色）
    '--jusda-special-ghost-button-hover-color': '#0a71d8', // button③特殊幽灵按钮Hover（彩色）
    '--jusda-bottom-overlay-button-color': '9B9B9B', // button④下方黑色浮层按钮（灰色幽灵）
    '--jusda-bottom-overlay-button-hover-color': '#0a71d8', // button④下方黑色浮层按钮Hover（灰色幽灵）
    '--jusda-sidebar-menu-yellow-text-color': '#2755a6', // 左侧菜单黄色文字
    '--jusda-pagination-yellow-color': '#2755a6', // 页码黄色（文字）
    '--jusda-label-title-text-color': '#8D9AAD', // label标题色（文字）
    ...foxconnPackagecssVariables
};

export default function getCssVariables() {
    const cssVariables = isTms() ? foxconnCssVariables: juslinkCssVariables;
    return cssVariables;
}