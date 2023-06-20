/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
    forwardRef,
    ReactElement,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import { ConfigProvider, Empty, Table } from 'antd';
import getColumns, { ValuationUnitType } from './columns';
import { useRequest } from '@jusda-tools/jusda-publichooks';
import {
    getValuate,
    searchContainerSize,
    searchTruckSize,
    searchTruckCategories,
} from '../../service';
import localeStore, { Locale } from '../../locale';
import useFetchData from '../../hooks/useFetchData';
import './index.less';

export interface ValuateTableProps {
    params: any;
    locale?: Locale; // 'zh-CN' | 'en-US'
    localeKey?: string;
}

type TruckParams = {
    localeCodeEq: string;
    generalCodeIn: string[];
};

const { Summary } = Table;
const ValuateTable: React.ForwardRefRenderFunction<any, any> = (
    props: ValuateTableProps,
    ref,
) => {
    const [loading, run] = useRequest(getValuate);
    const { params, locale, localeKey = 'umi_locale' } = props;
    const [containerInfos, containerLoading, runContainerInfo] = useFetchData<
    Pick<TruckParams, 'generalCodeIn'>
    >({ fetchFunc: searchContainerSize });
    const [
        truckCateInfos,
        truckCateLoading,
        runTruckCate,
    ] = useFetchData<TruckParams>({ fetchFunc: searchTruckCategories });
    const [
        truckSizeInfos,
        truckSizeLoading,
        runTruckSize,
    ] = useFetchData<TruckParams>({ fetchFunc: searchTruckSize });
    const [tableInfo, setTableInfo] = useState({
        dataSource: [],
        totalAmount: undefined,
    });

    let defaultLocale = localStorage.getItem(localeKey) || 'zh-CN';
    if (locale) {
        defaultLocale = locale;
    }
    const currentLocale = localeStore[defaultLocale];

    const prepareQTYEnum = (data: any[]) => {
        const truckCategoryCodeArr = [] as string[];
        const truckSizeCodeArr = [] as string[];
        const containerSizeCodeArr = [] as string[];
        data.forEach((ele) => {
            if (ele.valuationUnitType === ValuationUnitType.CONTAINERQTY) {
                containerSizeCodeArr.push(ele.containerSizeCode);
            }
            if (ele.valuationUnitType === ValuationUnitType.TRUCKQTY) {
                truckCategoryCodeArr.push(ele.truckCategoryCode);
                truckSizeCodeArr.push(ele.truckSizeCode);
            }
        });
        if (truckCategoryCodeArr.length) {
            runTruckCate({
                localeCodeEq: defaultLocale,
                generalCodeIn: truckCategoryCodeArr,
            });
            runTruckSize({
                localeCodeEq: defaultLocale,
                generalCodeIn: truckSizeCodeArr,
            });
        }
        if (containerSizeCodeArr.length) {
            runContainerInfo({ generalCodeIn: containerSizeCodeArr });
        }
    };

    async function updateValuation(): Promise<any> {
        const resp = await run(params);
        const { data } = resp;
        if (data) {
            const { data: dataSource, totalAmount } = (data || {}) as any;
            prepareQTYEnum(dataSource);
            setTableInfo({
                dataSource,
                totalAmount,
            });
        }
        return resp;
    }

    useImperativeHandle(
        ref,
        (): { updateValuation: () => Promise<any> } => ({
            updateValuation,
        }),
        [updateValuation],
    );

    useEffect(() => {
        if (!params) return;
        updateValuation();
    }, []);

    const columnsProps = {
        currentLocale,
        containerInfos,
        truckCateInfos,
        truckSizeInfos,
    };
    const { dataSource, totalAmount } = tableInfo;
    return (
        <ConfigProvider prefixCls='juslink'>
            <Table
                className="jusda-freight-valuate-report-table"
                components={{
                    body: {
                        row: ({ children, className }) => {
                            if (children.length) {
                                return <tr className={className}>{children}</tr>;
                            }
                            return (
                                <tr className="ant-table-placeholder">
                                    <td colSpan={8}>
                                        <Empty description={currentLocale.noData} />
                                    </td>
                                </tr>
                            );
                        },
                        cell: ({ children, className }): ReactElement<any, any> => {
                            const [, second] = children;
                            return (
                                <td className={className}>
                                    {(typeof second === 'string' && second.length === 0) ||
                  (!second && typeof second !== 'number')
                                        ? '--'
                                        : children}
                                </td>
                            );
                        },
                    },
                }}
                summary={() => (
                    <Summary.Row>
                        <Summary.Cell index={0} colSpan={6}></Summary.Cell>
                        <Summary.Cell index={1}>{currentLocale['total']}</Summary.Cell>
                        <Summary.Cell index={2}>{totalAmount || '--'}</Summary.Cell>
                    </Summary.Row>
                )}
                rowKey={(record: any) =>
                    `${record?.valuationItemName}-${record?.valuationRuleType}`
                }
                loading={loading}
                columns={getColumns(columnsProps)}
                dataSource={dataSource}
                pagination={false}
            />
        </ConfigProvider>
    );
};

export default forwardRef(ValuateTable);
