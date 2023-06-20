/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

export enum ValuationUnitType {
    VOLUME = 'VOLUME',
    GROSSWEIGHT = 'GROSSWEIGHT',
    NETWEIGHT = 'NETWEIGHT',
    CHARGEABLEWEIGHT = 'CHARGEABLEWEIGHT',
    CONTAINERQTY = 'CONTAINERQTY',
    TRUCKQTY = 'TRUCKQTY',
}

const UnitTypeMap = {
    [ValuationUnitType.VOLUME]: 'volume',
    [ValuationUnitType.GROSSWEIGHT]: 'grossWeight',
    [ValuationUnitType.NETWEIGHT]: 'netWeight',
    [ValuationUnitType.CHARGEABLEWEIGHT]: 'chargeableWeight',
};

export default function getColumns(props: {
    currentLocale: any;
    containerInfos: any[];
    truckCateInfos: any[];
    truckSizeInfos: any[];
}): any[] {
    const {
        currentLocale,
        containerInfos,
        truckCateInfos,
        truckSizeInfos,
    } = props;
    return [
        {
            title: currentLocale.valuationItemName,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: currentLocale.taxRate,
            dataIndex: 'taxRate',
            key: 'taxRate',
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            render(taxRate: string) {
                if (!taxRate && typeof taxRate !== 'number') return '--';
                return <span>{taxRate}%</span>;
            },
        },
        {
            title: currentLocale.currencyType,
            dataIndex: 'currencyCode',
            key: 'currencyCode',
        },
        {
            title: currentLocale.unitPrice,
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: currentLocale.valuationUnitType,
            dataIndex: 'valuationUnitType',
            key: 'valuationUnitType',
            render(value, record): string {
                if (
                    [
                        ValuationUnitType.VOLUME,
                        ValuationUnitType.GROSSWEIGHT,
                        ValuationUnitType.CHARGEABLEWEIGHT,
                        ValuationUnitType.NETWEIGHT,
                    ].includes(value)
                ) {
                    return currentLocale[UnitTypeMap[value]];
                }
                if (value === ValuationUnitType.CONTAINERQTY) {
                    return containerInfos?.find(
                        (ele) => ele.generalCode === record.containerSizeCode,
                    )?.name;
                }
                if (value === ValuationUnitType.TRUCKQTY) {
                    const str = `${
                        truckCateInfos?.find((ele) => ele.generalCode === record.truckCategoryCode)
                            ?.name || '--'
                    }-${truckSizeInfos?.find((ele) => ele.generalCode === record.truckSizeCode)?.name || '--'}`;
                    return str;
                }
                return '--';
            },
        },
        {
            title: currentLocale.quantity,
            dataIndex: 'quantity',
            key: 'quantity',
            render(value, record): string {
                if(record.valuationRuleType === 'FLAT')
                {
                    return '--';
                }
                return value;
            },
        },
        {
            title: currentLocale.minAmount,
            dataIndex: 'minAmount',
            key: 'minAmount',
        },
        {
            title: currentLocale.amount,
            dataIndex: 'amount',
            key: 'amount',
        },
    ];
}
