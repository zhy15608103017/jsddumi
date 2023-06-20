/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { showMetaDateTitle, transportModeIcon } from '../../utils/fn';
import { timeFormat } from '../../utils/fn';
import language from '../../locales/index';
import TPM_SEA from '../../assets/img/TPM_SEA.svg';
import TPM_AIR from '../../assets/img/TPM_AIR.svg';
import TPM_EXPRESS from '../../assets/img/TPM_EXPRESS.svg';
import TPM_RAIL from '../../assets/img/TPM_RAIL.svg';
import TPM_ROAD from '../../assets/img/TPM_ROAD.svg';
import './index.less';

export default ({ routings = [], modeCode, isWaybill, scrollHight,metaDataPropertyList}: any) => {
    const timeDisplay = (date: any, type: string) => {
        if (!date) {
            return "--/--/--"
        }
        if (typeof date === 'object' && !date?.time) {
            return "--/--/--"
        }
        else {
            return timeFormat(date, type)
        }
    };
    let columns = [
        {
            title: language['serialNo'],
            align: 'center',
            width: '50px',
            dataIndex: 'id',
            ellipsis: true,
        },
        {
            title: language['transitSection'],
            align: 'center',
            metaKey:'originCityCode',
            dataIndex: 'originCityName',
            ellipsis: true,
            render: (_, record) => {
                return <div className='judmap-table-hidden'>{`${record.originCityName || "--"} → ${record.destinationCityName || "--"}`}</div>;
            },
        },
        // 陆运==> 要求xx时间 / 其他 预计xx时间
        {
            
            title: <div>
                {modeCode === 'TPM_ROAD' ? showMetaDateTitle(language['deliveryTime'], 'etd', metaDataPropertyList): showMetaDateTitle(language['deliveryTimePredict'], 'etd', metaDataPropertyList)}
                /{showMetaDateTitle(language['deliveryOnTime'], 'atd', metaDataPropertyList)}
            </div>,
            align: 'center',
            dataIndex: 'ata',
            metaKey:'_',
            ellipsis: true,
            render: (_, record) => (
                <div className='judmap-table-hidden' title={`${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.etd, 'day') : timeDisplay(record?.etd, 'hour')}/${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.atd, 'day') : timeDisplay(record?.atd, 'hour')}`}>

                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.etd, 'day')
                            : timeDisplay(record?.etd, 'hour')}
                    </div>
                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.atd, 'day')
                            : timeDisplay(record?.atd, 'hour')}
                    </div>

                </div>
            ),
        },
        // 陆运==> 要求xx时间 / 其他 预计xx时间
        {
            title: <div>
            {modeCode === 'TPM_ROAD' ? showMetaDateTitle(language['arrivalTime'], 'eta', metaDataPropertyList): showMetaDateTitle(language['arrivalTimePredict'], 'eta', metaDataPropertyList)}
            /{showMetaDateTitle(language['arrivalOnTime'], 'ata', metaDataPropertyList)}
        </div>,
            align: 'center',
            dataIndex: 'eta',
            metaKey:'_',
            ellipsis: true,
            render: (_, record) => (
                <div className='judmap-table-hidden' title={`${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.eta, 'day') : timeDisplay(record?.eta, 'hour')}/${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.ata, 'day') : timeDisplay(record?.ata, 'hour')}`}>
                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.eta, 'day')
                            : timeDisplay(record?.eta, 'hour')}
                    </div>
                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.ata, 'day')
                            : timeDisplay(record?.ata, 'hour')}
                    </div>
                </div>
            ),
        },
        {
            title: language['shippingMode'],
            align: 'center',
            width: '80px',
            dataIndex: 'transportModeCode',
            metaKey:'transportModeCode',
            ellipsis: true,
            render: (_: any, record: any) => {
                let icon: any
                switch (record.transportModeCode) {
                    case 'TPM_ROAD':
                        icon = TPM_ROAD
                        break;
                    case 'TPM_RAIL':
                        icon = TPM_RAIL
                        break;
                    case 'TPM_EXPRESS':
                        icon = TPM_EXPRESS
                        break;
                    case 'TPM_AIR':
                        icon = TPM_AIR
                        break;
                    case 'TPM_SEA':
                        icon = TPM_SEA
                        break;
                    default:
                        break;
                }
                return icon ? <img className={'transportMode'} src={icon} alt="" /> : "--"

            },
        },

        {
            title: language['transportToolNum'],
            width: '100px',
            align: 'center',
            dataIndex: 'transportNo',
            metaKey:'transportNo',
            ellipsis: true,
            render: (text) => {
                return <div className='judmap-table-hidden'>{text || '--'}</div>;
            },
        },
        {
            title: language['carrier'],
            width: '100px',
            align: 'center',
            dataIndex: 'carrier',
            metaKey:'carrierCode',
            ellipsis: true,
            render: (text) => <div className='judmap-table-hidden'>{text || '--'}</div>,
        },
        {
            title: language['status'],
            align: 'center',
            dataIndex: 'status',
            metaKey:'status',
            width: '80px',
            ellipsis: true,
            render: (text) => (
                <span>
                    {text === 'COMPLETED' ? language['completed'] : text === 'NO_START' ? language['notStart'] : language['pending']}
                </span>
            ),
        },
    ];
    columns = columns.map(column => ({
        ...column,
        title: <div className='ellipsis' title={`${showMetaDateTitle(column.title, column.metaKey || column.dataIndex, metaDataPropertyList) || ''}`}>{showMetaDateTitle(column.title, column.metaKey || column.dataIndex, metaDataPropertyList)}</div>
    }));
    let columnsWaybill = [
        {
            title: language['serialNo'],
            align: 'center',
            width: '50px',
            dataIndex: 'id',
            ellipsis: true,
        },
        {
            title: language['logisticOrderId'],
            align: 'center',
            dataIndex: 'waybillNo',
            ellipsis: true,
            metaKey:'waybillNo',
            render: (text, record) => {
                return text || '--';
            },
        },
        {
            title: language['originTodestination'],
            align: 'center',
            dataIndex: 'originCityName',
            metaKey:'originCityCode',
            ellipsis: true,
            render: (text, record) => {
                return <div className='judmap-table-hidden'>{`${record.originCityName || "--"} → ${record.destinationCityName || "--"}`}</div>;
            },
        },
        // 陆运==> 要求xx时间 / 其他 预计xx时间
        {
            title: <div>
                {showMetaDateTitle(language['deliveryTime'], 'requiredTimeOfDeparture', metaDataPropertyList)}/{showMetaDateTitle(language['deliveryOnTime'], 'atd', metaDataPropertyList)}
            </div>,
            align: 'center',
            dataIndex: 'ata',
            metaKey:'_',
            ellipsis: true,
            render: (text, record) => (
                <div className='judmap-table-hidden' title={`${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.requiredTimeOfArrival, 'day') : timeDisplay(record?.requiredTimeOfArrival, 'hour')}/${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.atd, 'day') : timeDisplay(record?.atd, 'hour')}`}>
                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.requiredTimeOfDeparture, 'day')
                            : timeDisplay(record?.requiredTimeOfDeparture, 'hour')}

                    </div>
                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.atd, 'day')
                            : timeDisplay(record?.atd, 'hour')}
                    </div>
                </div>
            ),
        },
        // 陆运==> 要求xx时间 / 其他 预计xx时间
        {
            title: <div>
            {showMetaDateTitle(language['arrivalTime'], 'requiredTimeOfArrival', metaDataPropertyList)}/{showMetaDateTitle(language['arrivalOnTime'], 'ata', metaDataPropertyList)}
        </div>,
          
            align: 'center',
            dataIndex: 'eta',
            metaKey:'_',
            ellipsis: true,
            render: (text, record) => (
                <div className='judmap-table-hidden' title={`${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.requiredTimeOfDeparture, 'day') : timeDisplay(record?.requiredTimeOfDeparture, 'hour')}/${record?.transportModeCode === 'TPM_SEA' ? timeDisplay(record?.ata, 'day') : timeDisplay(record?.ata, 'hour')}`}>
                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.requiredTimeOfArrival, 'day')
                            : timeDisplay(record?.requiredTimeOfArrival, 'hour')}
                    </div>
                    <div>
                        {record?.transportModeCode === 'TPM_SEA'
                            ? timeDisplay(record?.ata, 'day')
                            : timeDisplay(record?.ata, 'hour')}
                    </div>
                </div>
            ),
        },
        {
            title: language['shippingMode'],
            align: 'center',
            width: '80px',
            dataIndex: 'transportModeCode',
            metaKey:'transportModeCode',
            ellipsis: true,
            render: (text: any, record: any) => {
                let icon: any
                switch (record.transportModeCode) {
                    case 'TPM_ROAD':
                        icon = TPM_ROAD
                        break;
                    case 'TPM_RAIL':
                        icon = TPM_RAIL
                        break;
                    case 'TPM_EXPRESS':
                        icon = TPM_EXPRESS
                        break;
                    case 'TPM_AIR':
                        icon = TPM_AIR
                        break;
                    case 'TPM_SEA':
                        icon = TPM_SEA
                        break;
                    default:
                        break;
                }
                return icon ? <img className={'transportMode'} src={icon} alt="" /> : "--"

            },
        },

        {
            title: language['transportToolNum'],
            width: '100px',
            align: 'center',
            dataIndex: 'transportNo',
            metaKey:'transportNo',
            ellipsis: true,
            render: (text, record) => {
                return <div className='judmap-table-hidden'>{text || '--'}</div>;
            },
        },
        {
            title: language['carrier'],
            width: '100px',
            align: 'center',
            dataIndex: 'carrier',
            metaKey:'carrier',
            ellipsis: true,
            render: (text) => <span>{text || '--'}</span>,
        },
        {
            title: language['status'],
            align: 'center',
            dataIndex: 'status',
            metaKey:'status',
            width: '80px',
            ellipsis: true,
            render: (text) => (
                <div className='judmap-table-hidden'>
                    {text === 'COMPLETED' ? language['updateReady'] : language['waitUpdate']}
                </div>
            ),
        },
    ];
    columnsWaybill = columnsWaybill.map(column => ({
        ...column,
        title: <div className='ellipsis' title={`${showMetaDateTitle(column.title, column.metaKey || column.dataIndex, metaDataPropertyList) || ''}`}>{showMetaDateTitle(column.title, column.metaKey || column.dataIndex, metaDataPropertyList)}</div>
    }));
    const routesArr = routings.map((item: any, index: number) => {
        return {
            ...item,
            id: index + 1,
        };
    });

    return (
        <div className={'routeComp'}>
            <Table
                rowClassName={'rowClass'}
                columns={(isWaybill ? columnsWaybill : columns) as any}
                pagination={false}
                dataSource={routesArr}
                rowKey="id"
                scroll={{ y: scrollHight }}
            />
        </div>
    );
};
