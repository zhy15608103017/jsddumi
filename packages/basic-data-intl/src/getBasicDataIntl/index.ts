/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-empty */

import { getBasicDataIntlFetch } from '../service';
interface paramsType {
    code: string;
    type: string;
    item: any;
    nameAfterConversion: string;
}

interface fetchParamsType {
    codeEq: string;
    typeEq: string;
    key: string;
    nameAfterConversion: string;
}

interface SearchResponseType {
    code: string;
    language: string;
    name: string;
    type: string;
}

const getBasicDataIntl = async (dataSource, props?: any) => {
    try {
        const currentDataSource = { data: dataSource };

        const dataToBeTransferred: fetchParamsType[] = [];

        const GetInternationalizationParametersInDepth = (data, params) => {
            let mark;
            if (Array.isArray(data)) {
                mark = [];
                data.forEach((item: any) => {
                    if (typeof item === 'object') {
                        mark.push(GetInternationalizationParametersInDepth(item, params));
                        return;
                    }
                    mark.push(item);
                });
            } else {
                mark = {};
                const back = Object.keys(data);

                back.forEach((item) => {
                    if (data?.[item] && typeof data?.[item] === 'object') {
                        mark[item] = GetInternationalizationParametersInDepth(
                            data[item],
                            params,
                        );
                        return;
                    }
                    params?.forEach((ele: paramsType) => {
                        if (item === ele.code && data[item]) {
                            dataToBeTransferred.push({
                                codeEq: data[item],
                                typeEq: ele.type,
                                key: item,
                                nameAfterConversion: ele.nameAfterConversion,
                            });
                        }
                    });
                    mark[item] = data[item];
                });
            }

            return mark;
        };

        const newDataSource = GetInternationalizationParametersInDepth(
            currentDataSource,
            props,
        );

        const basicIntlDataResult = await getBasicDataIntlFetch(
            dataToBeTransferred,
        );

        const basicIntlData = basicIntlDataResult?.data?.content || [];

        const fillInInternationalization = (data, params) => {
            let mark;
            if (Array.isArray(data)) {
                mark = [];
                data.forEach((item: any) => {
                    if (typeof item === 'object') {
                        mark.push(fillInInternationalization(item, params));
                        return;
                    }
                    mark.push(item);
                });
            } else {
                mark = {};
                const back = Object.keys(data);
                back.forEach((item) => {
                    if (data?.[item] && typeof data?.[item] === 'object') {
                        mark[item] = fillInInternationalization(data[item], params);
                        // return;
                    }

                    basicIntlData?.forEach((ele: SearchResponseType) => {
                        if (data[item] === ele.code) {
                            dataToBeTransferred.forEach((element: fetchParamsType) => {
                                if (element.key === item) {
                                    data[element.nameAfterConversion] = ele.name;
                                }
                            });
                        }
                    });
                    mark[item] = data[item];
                });
            }

            return mark;
        };

        const result = fillInInternationalization(newDataSource, props);
        return new Promise((resolve) => {
            resolve(result?.data);
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(`JUSDA-BASIC获取国际化函数内部出现错误,请排查:${error}`);
        });
    }
};

export { getBasicDataIntl };
