import { isFoxconn } from '@jusda-tools/business-env-checker';

const juslinkTheme = {
    colorPrimary: '#ffc500'
};

const foxconnTheme = {
    'colorPrimary': '#0053a6',
    'colorPrimaryBg': '#e1edf4',
    'colorSuccess': '#50cb16',
    'colorError': '#ff3352',
    'colorPrimaryHover': '#2484d8'
};

export default function getAntdTheme() {
    const antdTheme = isFoxconn() ? foxconnTheme: juslinkTheme;
    return antdTheme;
}