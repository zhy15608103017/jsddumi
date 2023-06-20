export function mergeRequestHeaderOptions(
    defaultOptions = {},
    customOptions = {},
) {
    return { ...defaultOptions, ...customOptions };
}

export function judgeIsItAxios(axiosInstance) {
    if(axiosInstance && axiosInstance.defaults) {
        return true;
    }
}
