import { isTms } from '@jusda-tools/business-env-checker';

const juslinkTheme = {
    'colorPrimary': '#ffc500',
    'colorPrimaryBg': '#FFF8D9',
    'colorSuccess': '#6fc677',
    'colorError': '#ff6c6c',
    'colorPrimaryHover': '#FFDA39',
    'colorBgLayout': '#F2F2F2',
    'colorPrimaryBorder': '#fcbe5b',
    'colorPrimaryBorderHover': '#fa8c16',
    'colorPrimaryActive': '#FFE366',
    'colorPrimaryBgHover': '#FFDA39',
    'colorInfo': '#ffc500'
};

const foxconnTheme = {
    'colorPrimary': '#2755a6',
    'colorPrimaryBg': '#e1edf4',
    'colorSuccess': '#52c41a',
    'colorError': '#ff3352',
    'colorPrimaryHover': '#1677ff',
    'colorBgLayout': '#EAF0F5',
    'colorPrimaryBorder': '#3e89d4',
    'colorPrimaryBorderHover': '#1677ff',
    'colorPrimaryActive': '#599eff'
};

export default function getAntdTheme() {
    const antdTheme = isTms() ? foxconnTheme: juslinkTheme;
    return antdTheme;
}