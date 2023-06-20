import React, { useEffect, useState } from 'react';
import MetaSelect from './component/metaSelect';
import { ICascaderType } from './type';
// @ts-ignore
import request from '@jusda-tools/web-api-client';
// @ts-ignore
import { mpApiUrl } from '@jusda-tools/url-config';
// @ts-ignore
import { currentLanguage } from '@jusda-tools/language-control-panel';
import { getInterfaceUrl, areaType } from './utils';
import localesConfig from './locales';

const locales = localesConfig.get(currentLanguage().includes('zh')?'zh-CN':'en-US');

function Cascader(props: any) {
    const [value, setValue] = useState(props.value || {
        country: {value: '', label: ''},
        subdivision: {value: '', label: ''},
        city: {value: '', label: ''},
        county: {value: '', label: ''},
    });
    const [isOperation, setIsOperation] = useState(false);

    // 获取国家数据
    const getCounty = async (e?: string): Promise<any> => {
        const result = await request.post(`${mpApiUrl}/${getInterfaceUrl('country')}`, {
            data: {
                languageEq: currentLanguage().replace('-', '_')
            }
        });
        if (result?.data?.content) {
            return result?.data?.content.map((item: { name: string; iso2Code: string }) => { return { name: item.name, code: item.iso2Code };});
        }
        return [];
    };

    /**
     * @param code: 当前操作项 code
     * @param dependencyValue: 当前项的依赖项code的value
     * */
    const fetchData = async (code?: string, dependencyValue?: string) => {
        if (dependencyValue) {
            const result = await request(`${mpApiUrl}/${getInterfaceUrl(code)}`, {
                method: 'POST',
                data: {
                    languageEq: currentLanguage().replace('-', '_'),
                    parentCodeIn: [dependencyValue],
                }
            });
            if (result?.data?.content) {
                const value: areaType = areaType[code as areaType];
                return result?.data?.content.map((item: { [x: string]: { name: string; code: string } }) => { return { name:  item[value]?.name, code: item[value]?.code };});
            }
        }
        return [];
    };

    // 级联配置项
    const cascaderArr: ICascaderType[] = [
        {
            code: 'country',
            // optionData: countyList as any,
            optionDataFn: (code: string, value: string) => getCounty(value),
            value: '',
            ui: {
                placeholder: locales.pleaseSelectCountry,
                disabled: false,
                style: {width: '25%'},
            },
        },
        {
            code: 'subdivision',
            optionDataFn: (code: string, value: string) => fetchData(code, value),
            dependencyCode: 'country',
            value: '',
            ui: {
                placeholder: locales.firstLevelArea,
                disabled: false,
                style: {width: '25%'},
            },
        },
        {
            code: 'city',
            optionDataFn: (code: string, value: string) => fetchData(code, value),
            dependencyCode: 'subdivision',
            value: '',
            ui: {
                placeholder: locales.secondaryLevelArea,
                disabled: false,
                style: {width: '25%'},
            },
        },
        {
            code: 'county',
            optionDataFn: (code: string, value: string) => fetchData(code, value),
            dependencyCode: 'city',
            value: '',
            ui: {
                placeholder: locales.tertiaryLevelArea,
                disabled: false,
                style: {width: '25%'},
            },
        },
    ];

    // useEffect(() => {
    //     getCounty().then(r => null);
    // }, []);

    useEffect(() => {
        setValue(Object.assign({}, value, props.value));
    }, [props.value]);

    const changeValue = (code, valueObj: { value: string | number; label: string }): void => {
        let newValue = Object.assign({}, value, {[`${code}`]: {value: valueObj.value, label: valueObj.label}});
        setIsOperation(true);
        setValue(newValue);
        props?.onChange?.(newValue);
    };

    return (
        <React.Fragment>
            {
                cascaderArr.map((item: ICascaderType, index: number) => {
                    return (
                        <MetaSelect
                            disabled={props.disabled}
                            code={item.code}
                            ui={item?.ui}
                            isOperation={isOperation}
                            value={value?.[`${item.code}`]}
                            dependencyValue={value?.[`${item.dependencyCode}`]}
                            key={item.code}
                            changeValue={changeValue}
                            dependencyCode={item?.dependencyCode}
                            optionData={item?.optionData}
                            optionDataFn={item?.optionDataFn}
                        />
                    );
                })
            }
        </React.Fragment>
    );
}

export default Cascader;

