/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ConfigProvider, Drawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import React, { useEffect } from 'react';
import ValuateTable, { ValuateTableProps } from '../ValuateTable';
import localeStore from '../../locale';

type Union = DrawerProps & ValuateTableProps;

interface TableDrawerProps extends Omit<Union, 'title'> {
    valuateTableRef?: any;
    autoUpdateFollowVisible?: boolean; // Drawer每打开一次就会更新一次表格数据
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const TableDrawer = (props: TableDrawerProps) => {
    const {
        params,
        locale,
        localeKey = 'umi_locale',
        valuateTableRef,
        visible,
        autoUpdateFollowVisible,
        ...rest
    } = props;

    let defaultLocale = localStorage.getItem(localeKey) || 'zh-CN';
    if (locale) {
        defaultLocale = locale;
    }
    const currentLocale = localeStore[defaultLocale];

    useEffect(() => {
        if (visible && autoUpdateFollowVisible) {
            valuateTableRef?.current?.updateValuation();
        }
    }, [visible]);

    return (
        <ConfigProvider prefixCls="juslink">
            <Drawer
                visible={visible}
                {...rest}
                title={currentLocale['previewValuate']}
            >
                <ValuateTable
                    ref={valuateTableRef}
                    params={params}
                    locale={locale}
                    localeKey={localeKey}
                />
            </Drawer>
        </ConfigProvider>
    );
};

export default TableDrawer;
