import React from 'react';

const columns = () => {
    return [
        {
            title: 'Line',
            dataIndex: 'lineNo',
            key: 'lineNo',
            width: 60,
        },
        {
            title: 'Column Name',
            dataIndex: 'columnName',
            key: 'columnName',
            width: 140,
            render: (text: any, val: any) => {
                const { columnErrorList } = val;
                return (
                    <div>
                        {columnErrorList?.map((item: any) => {
                            return <div key={item?.columnName}>{item?.columnName}</div>;
                        })}
                    </div>
                );
            },
        },
        {
            title: 'Error Reason',
            dataIndex: 'errorReason',
            render: (text: any, val: any) => {
                const { columnErrorList } = val;
                return (
                    <div>
                        {columnErrorList?.map((item: any) => {
                            return <div key={item?.errorReason}>{item?.errorReason}</div>;
                        })}
                    </div>
                );
            },
        },
    ];
};

export { columns };
