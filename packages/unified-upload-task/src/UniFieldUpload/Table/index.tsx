import * as React from 'react';
//@ts-ignore
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
import './index.less'
import { currentLanguage } from '@jusda-tools/language-control-panel';
import getLocale from 'src/locale';
interface Props {
    request: any;
    Pagination?: any;
    params?: any;
    [key: string]: any;
}

interface ActionType {
    reload: (resetPageIndex?: boolean) => void;
    reloadAndRest: () => void;
    reset: () => void;
    clearSelected?: () => void;
    startEditable: (rowKey: React.Key) => boolean;
    cancelEditable: (rowKey: React.Key) => boolean;
}

const initPagintion = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true

}
const Table: React.FC<Props> = props => {
    const ref = React.useRef<ActionType>();
    const currentLocale: any = getLocale(currentLanguage());
    const [pagintion, setPagintion] = React.useState<any>(initPagintion)
    const { request, params, ...otherTableProps } = props;
    React.useEffect(() => {
        (ref.current as any)?.reload();
    },
        [params])
    const requestApi = async (
        params: {
            pageSize: number;
            current: number;
        },
        sort: any,
        filter: any,
    ) => {
        const sorts = Object.keys(sort).map(sortItem => {
            return `${sortItem},${sort[sortItem] === 'ascend' ? 'asc' : 'desc'}`;
        });
        const msg = await request({ params, sorts, filter });
        const listData =
            msg?.data?.data || msg?.data?.content || msg?.data || [];
        return {
            data: listData,
            success: msg?.success,
            total: msg?.data?.totalElements,
        };
    };
    return (
        <div className='ProTable'>
            <ProTable
                actionRef={ref}
                request={requestApi}
                params={params}
                search={false}
                pagination={{
                    ...pagintion,
                    onChange: (page: string, pageSize: string) => { setPagintion({ ...pagintion, pageSize }) },
                    showTotal: (total: number) => `${currentLocale['Total']} ${total}`
                }}
                {...otherTableProps}
            />
        </div>
    );
};
export default Table;
