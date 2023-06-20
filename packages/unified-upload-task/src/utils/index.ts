export function sleep(timeout: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null)
        }, timeout * 1000)
    })
}
// 去除字符串前后的所有空格
export function Trim(str: string) {
    if (!str || !(typeof str === 'string')) {
        return str;
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
}