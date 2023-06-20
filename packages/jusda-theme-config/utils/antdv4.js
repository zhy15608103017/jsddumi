import { isFoxconn } from '@jusda-tools/business-env-checker';

const juslinkTheme = {
    primaryColor: '#ffc500',
    infoColor: '#ffc500',
    successColor: '#ffc500',
    processingColor: '#ffc500',
    errorColor: '#ffc500',
    warningColor: '#ffc500',
};

const foxconnTheme = {
    primaryColor: '#4096ff',
    infoColor: '#4096ff',
    successColor: '#4096ff',
    processingColor: '#4096ff',
    errorColor: '#4096ff',
    warningColor: '#4096ff',
};

export default function getAntdTheme() {
    const antdTheme = isFoxconn() ? foxconnTheme: juslinkTheme;
    return antdTheme;
}
