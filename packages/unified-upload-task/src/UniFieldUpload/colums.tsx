import React from 'react';
import moment from 'moment';
import { Badge, Tooltip, Col, Form, DatePicker, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const { Item } = Form;
const { RangePicker } = DatePicker;
import getLocale from '../locale';

const filterTaskStatusFn = (value: string,currentLocale:any): any => {
    const taskStatusOptions = [
        { value: 'SUCCESS', label: currentLocale['success'], color: '#87D068' },
        {
            value: 'FAIL',
            label: currentLocale['abnormal'],
            color: '#FF5500',
        },
        { value: 'INIT', label:  currentLocale['running'], color: '#108EE9' },
    ];
    const arr = taskStatusOptions?.filter(i => i?.value === value);
    const [filterData] = arr;
    if (filterData) {
        return filterData;
    }
};

const colums = (viewFn: any,currentLocale:any) => [
    {
        title: currentLocale['taskStatus'],
        dataIndex: 'status',
        ellipsis: true,
        width: 80,
        align: 'left',
        renderText: (v: any) => {
            return (
                <Badge
                    color={filterTaskStatusFn(v,currentLocale)?.color}
                    text={filterTaskStatusFn(v,currentLocale)?.label}
                />
            );
        },
    },
    {
        title: currentLocale['createdTime'],
        dataIndex: ['audit.createdTime'],
        ellipsis: true,
        width: 110,
        align: 'center',
        sorter: true,
        render: (_: any, row: any) => {
            return row?.audit?.createdTime
                ? moment(row?.audit?.createdTime).format('YYYY-MM-DD HH:mm:ss')
                : '--';
        },
    },
    {
        title: currentLocale['taskEndTime'],
        ellipsis: true,
        dataIndex: 'endTime',
        width: 110,
        align: 'center',
        sorter: true,
        render: (_: any, row: any) => {
            return row?.endTime
                ? moment(row?.endTime).format('YYYY-MM-DD HH:mm:ss')
                : '--';
        },
    },
    {
        title: currentLocale['creator'],
        dataIndex: ['audit', 'createdByName'],
        ellipsis: true,
        width: 80,
        align: 'center',
        render: (v: string) => v || '--',
    },

    {
        title: currentLocale['operation'],
        width: 80,
        align: 'center',
        key:'operation',
        dataIndex:'operation',
        render: (_: string, row: any) => (
            <span
                className="view"
                style={{
                    color: 'rgb(22, 155, 213)',
                    cursor: 'pointer',
                }}
                onClick={() => viewFn(row?.taskId?.toString())}
            >
                {currentLocale['view']}
            </span>
        ),
    },
];
const tableSearchcfg = (currentLocale:any)=>[
    // {
    //     name: 'taskNameContains',
    //     type: 'Input',
    //     span: 6,
    //     label: currentLocale['taskTitle'],

    //     width: '100%',
    //     placeholder: 'pleaseKeyword',
    //     suffix: (
    //         <Tooltip title={currentLocale['taskMonitorTips1']}>
    //             <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
    //         </Tooltip>
    //     ),
    // },
    {
        name: 'taskStatus',
        type: 'Select',
        span: 8,
        label: currentLocale['taskStatus'],
        width: '170px',
        labelInValue: true,
        options: [
            { label: currentLocale['running'], value: 'INIT' },
            {
                label: currentLocale['abnormal'],
                value: 'FAIL',
            },
            { label: currentLocale['success'], value: 'SUCCESS' },
        ],
        placeholder: 'pleaseState',
    },

    {
        name: 'time',

        customRenderNode: (
            <Col span={12} key="time">
                <span className="lebel">{currentLocale['createdTime']}</span>
                <Item name="time" key="time">
                   {
                    // @ts-ignore
                     <RangePicker
                     placeholder={[currentLocale['startTime'],currentLocale['endTime']]}
                     style={{ width: '100%' }}
                   
                     showTime
                 />
                   }
                </Item>
            </Col>
        ),
    },
];

export { tableSearchcfg, colums };
