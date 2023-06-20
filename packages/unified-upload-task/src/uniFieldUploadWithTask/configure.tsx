import React from "react";
// @ts-ignore
const isFoxconn = window.jusdaBaseConfig.isIntranet ? 'foxconn' : 'jus-link';
export const cargoTemplate = {
    US: {
        dev:
            `https://ossdev.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%20Cargo%20detail%20template-1.4.0.xlsx`,
        sit:
            `https://osssit.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%20Cargo%20detail%20template-1.4.0.xlsx`,
        uat:
            `https://ossuat.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%20Cargo%20detail%20template-1.4.0.xlsx`,
        prod:
            `https://oss.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%20Cargo%20detail%20template-1.4.0.xlsx`
    },
    CN: {
        dev:
            `https://ossdev.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%E8%B4%A7%E7%89%A9%E6%98%8E%E7%BB%86%E6%A8%A1%E6%9D%BF-1.4.0.xlsx`,
        sit:
            `https://osssit.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%E8%B4%A7%E7%89%A9%E6%98%8E%E7%BB%86%E6%A8%A1%E6%9D%BF-1.4.0.xlsx`,
        uat:
            `https://ossuat.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%E8%B4%A7%E7%89%A9%E6%98%8E%E7%BB%86%E6%A8%A1%E6%9D%BF-1.4.0.xlsx`,
        prod:
            `https://oss.${isFoxconn}.com/4pl-spm/logistics-demand/resource/4PL%E8%B4%A7%E7%89%A9%E6%98%8E%E7%BB%86%E6%A8%A1%E6%9D%BF-1.4.0.xlsx`
    }

}

export const errorColumn = ({ currentLocale }: { currentLocale: any }) => [
    {
        title: currentLocale['item'],
        dataIndex: "rowNo",
        key: "rowNo",
        width: 60,
        align: "center"
    },
    {
        title: currentLocale["error reason"],
        dataIndex: "errors",
        key: "errors",
        render: (value: any) => {
            return value.map((item: any, index: number) => (
                <span style={{ marginRight: 8 }}>
                    {item}
                    {index + 1 === value.length && ","}
                </span>
            ));
        }
    }
];
