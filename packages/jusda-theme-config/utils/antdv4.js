import { isTms } from '@jusda-tools/business-env-checker';

const juslinkTheme = {
    primaryColor: '#ffc500',
    infoColor: '#ffc500',
    successColor: '#6fc677',
    errorColor: '#ff6c6c',
    processingColor: '#ffc500',
    warningColor: '#ffc500',
};

const foxconnTheme = {
    primaryColor: '#2755a6',
    infoColor: '#4096ff',
    successColor: '#6fc677',
    errorColor: '#ff6c6c',
    processingColor: '#2755a6',
    warningColor: '#2755a6',
};

export default function getAntdTheme() {
    const antdTheme = isTms() ? foxconnTheme: juslinkTheme;
    return antdTheme;
}
