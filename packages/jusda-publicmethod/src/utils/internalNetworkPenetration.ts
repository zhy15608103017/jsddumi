/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface ConvertPropsType {
    type: string;
    replaceEx: string;
}

const convert = (originString: string, replaceExs: ConvertPropsType[]) => {
    let result = originString;
    replaceExs.forEach((item) => {
        const { type, replaceEx } = item;
        if (typeof originString === 'string' && originString?.indexOf(type) > -1) {
            result = result?.replace(type, replaceEx);
        }
    });
    return result;
};

const convertJuslinkDomainToFoxconnDomain = <T>(
    jusLinkData: T,
    replaceExs: ConvertPropsType[] = [
        { type: '.jus-link.', replaceEx: '.foxconn.' },
        { type: '//uat.', replaceEx: '//juslinkuat.' },
        { type: '//www.', replaceEx: '//juslink.' },
    ],
): T => {
    const jusdaBaseConfig = (window as any).jusdaBaseConfig;
    if (!jusdaBaseConfig?.isIntranet) {
    // 判断下 如果是内网环境则不进行数据转换直接返回原有的值.
        return jusLinkData;
    }

    const recursiveMerge = (data: any) => {
        let mark: any[] & object & any;
        if (Array.isArray(data)) {
            mark = [];
            data.forEach((item: any) => {
                if (typeof item === 'object') {
                    mark.push(recursiveMerge(item));
                } else {
                    mark.push(convert(item, replaceExs));
                }
            });
        } else {
            mark = {};
            const keys = Object.keys(data);
            keys.forEach((ele: any) => {
                if (data[ele] && typeof data[ele] === 'object') {
                    mark[ele] = recursiveMerge(data[ele]);
                } else {
                    mark[ele] = convert(data[ele], replaceExs);
                }
            });
            return mark;
        }
        return mark;
    };

    const result: T = recursiveMerge(jusLinkData);
    return result;
};
export { convertJuslinkDomainToFoxconnDomain };
