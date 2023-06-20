import * as React from 'react';
import dayjs from 'dayjs';
import { Row, Col, Divider, Spin, Badge, Empty } from 'antd';
import './index.less';
import getLocale from '../../locale';
import { currentLanguage } from '@jusda-tools/language-control-panel';
interface Props {
    visible: boolean;
    taskId: React.Key;
    getTaskDetails: (value: React.Key) => Promise<any>;
    locale?:any
}

interface Data {
    taskId: number;
    status: 'FAIL' | 'INIT' | 'SUCCESS';
    taskName: string;
    productInfo: ProductInfo;
    tenant: ProductInfo;
    audit: Audit;
    endTime: number;
    inputFile: InputFile;
    outPutFile?: InputFile;
}

interface InputFile {
    id: number;
    name: string;
    url: string;
}

interface Audit {
    createdBy: string;
    createdByName: string;
    createdTime: number;
    lastModifiedBy: string;
    lastModifiedByName?: any;
    lastModifiedTime: number;
}

interface ProductInfo {
    id: string;
    code: string;
    name: string;
}


const TaskDetails: React.FC<Props> = props => {
    const { taskId, getTaskDetails, visible,locale } = props;
    const [loading, setLoading] = React.useState(false);
    const [info, setInfo] = React.useState<Data | null>();
    const currentLocale: any = getLocale(currentLanguage());
    const TaskStatusOdj = {
        FAIL: {
            label: currentLocale['abnormal'],
            msg: currentLocale['taskabnormal'],
            color: '#FF5500',
        },
        INIT: {
            label: currentLocale['running'],
            msg: currentLocale['taskexecuted'],
            color: '#108EE9',
        },
        SUCCESS: {
            label: currentLocale['success'],
            msg: currentLocale['taskcomplete'],
            color: '#87D068',
        },
    };
    const initData = async () => {
        setLoading(true);
        const res = await getTaskDetails(taskId);
        if (!res.success) {
            setInfo(null);
            setLoading(false);
            return;
        }
        setInfo(res.data);
        setLoading(false);
    };

    React.useEffect(() => {
        visible && initData();
    }, [visible]);

    return (
        <div className="taskDetails">
            <Spin spinning={loading}>
                {info ? (
                    <>
                        <p className="taskName">
                            <span>{`${info?.taskName || '--'}`}</span>
                            <span style={{ float: 'right' }}>{`${currentLocale['Code']}：${info?.taskId || '--'}`}</span>
                        </p>
                        <p className="State">
                            <span>{`${currentLocale['State']}：`} </span>
                            <Badge
                                color={
                                    TaskStatusOdj[info?.status || 'FAIL'].color
                                }
                            />
                            <span style={{ marginRight: 12 }}>
                                {TaskStatusOdj[info?.status || 'FAIL'].label}
                            </span>
                            {info?.status !== 'INIT' && (
                                <span className="taskEndTime">
                                    {`${currentLocale['taskEndTime']}： ${dayjs(
                                        Number(info?.endTime),
                                    ).format('YYYY-MM-DD HH:mm:ss')}`}
                                </span>
                            )}
                        </p>
                        {info?.outPutFile && (
                            <div className="item">
                                <span className="content">
                                    <a href={info?.outPutFile?.url}>
                                        <span
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {currentLocale['download']}
                                        </span>
                                    </a>
                                </span>
                            </div>
                        )}

                        <p className="msg">
                            {info?.status === 'FAIL' && !info?.outPutFile
                                ? ''
                                : TaskStatusOdj[info?.status || 'FAIL'].msg}
                        </p>

                        <Divider />
                        <Row gutter={[16, 24]}>
                            <Col span={12}>
                                <div>
                                    <span>{`${currentLocale['belongProduct']}：${info
                                        ?.productInfo.name || '--'}`}</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="item">
                                    <span className="label">{`${currentLocale['Sourcefile']}：`}</span>
                                    <span className="content">
                                        <a href={info?.inputFile.url}>
                                            <span
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                {info?.inputFile.name
                                                    ? currentLocale['download']
                                                    : '--'}
                                            </span>
                                        </a>
                                    </span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <span>{`${currentLocale['creator']}：${info
                                        ?.audit?.createdByName || '--'}`}</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <span>{`${currentLocale['createdTime']}：${dayjs(
                                        Number(info?.audit?.createdTime),
                                    ).format('YYYY-MM-DD HH:mm:ss')}`}</span>
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Empty />
                )}
            </Spin>
        </div>
    );
};
export default TaskDetails;
