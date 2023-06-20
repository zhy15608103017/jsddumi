/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function serializeSortParams(params: any, sortPriority?: string[]) {
    const addPrefixFields = ["createdTime", "lastModifiedTime"];
    if (!params) return params;
    let result: string[];
    if (sortPriority && sortPriority.length > 0) {
        result = [];
        sortPriority.forEach((dataIndex) => {
            if (params[dataIndex]) {
                const sort = params[dataIndex] === "ascend" ? "asc" : "desc";
                const dealedSort = addPrefixFields.includes(dataIndex)
                    ? `audit.${dataIndex},${sort}`
                    : `${dataIndex},${sort}`;
                result.push(dealedSort);
            }
        });
        return result;
    }
    result = Object.keys(params).map((key) => {
        const sort = params[key] === "ascend" ? "asc" : "desc";
        return addPrefixFields.includes(key)
            ? `audit.${key},${sort}`
            : `${key},${sort}`;
    });
    return result;
}

export const LOCALE_KEY = "umi_locale";


function setValue(source: any, path: string[], newValue: any) {
    if (!source) return;
    let temp = source;
    for (let i = 0; i < path.length; i++) {
        if (i === path.length - 1) {
            temp[path[i]] = newValue;
            break;
        }
        if (temp?.hasOwnProperty(path[i])) {
            temp = temp[path[i]];
        } else {
            temp[path[i]] = {};
            temp = temp[path[i]];
        }
    }
}

export function deserializeContextData(data: any) {
    if (!data || Object.prototype.toString.call(data) !== "[object Object]") {
        return data;
    }
    const paths = Object.keys(data);
    const result = {};
    paths.forEach((path) => {
        const pathArr = path.split("__");
        if (pathArr[0] === "ProcessBusinessContext") {
            return;
        }
        if (
            pathArr.length === 2 &&
            pathArr[0] === "ProcessGlobalContext" &&
            pathArr[1] === "userContext"
        ) {
            return;
        }
        setValue(result, pathArr, data[path]);
    });
    return result;
}
