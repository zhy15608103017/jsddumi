import dayjs from "dayjs";
import GotoIcon from "./assets/icon/goto.svg";
import CheckIcon from "./assets/icon/check.svg";
import React from "react";
import { Button, Tooltip } from "antd";

const baseColumns = [
    {
        title: "事项",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        width: 160,
    },
    {
        title: "业务域",
        dataIndex: "businessDomainName",
        key: "businessDomainName",
        ellipsis: true,
    },
    {
        title: "业务场景",
        dataIndex: "businessStageName",
        key: "businessStageName",
        ellipsis: true,
    },
];


function genBaseColumns (porps:any, localeLibrary: any){
    return [
        {
            title: localeLibrary?.column_name,
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            width: 160,
        },
        {
            title: localeLibrary?.column_domain ,
            dataIndex: "businessDomainName",
            key: "businessDomainName",
            ellipsis: true,
        },
        {
            title: localeLibrary?.column_stage,
            dataIndex: "businessStageName",
            key: "businessStageName",
            ellipsis: true,
        },
    ]

}

export function genTodoColumns(props, localeLibrary: any): any[] {
    return [
        ...genBaseColumns(props, localeLibrary),
        {
            title: localeLibrary?.column_time,
            dataIndex: "createTime",
            align: "center",
            key: "createTime",
            render(createTime: string) {
                return createTime
                    ? dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
                    : "-";
            },
            width: 160,
            ellipsis: true,
        },
        {
            title: localeLibrary?.column_action,
            align: "center",
            width: 98,
            render(_: any, item: any) {
                return (
                    <Tooltip title={localeLibrary.edit}>
                        <span
                            className="operate_icon"
                            onClick={() => {
                                props?.editDetail(item);
                            }}
                        >
                            <GotoIcon />
                        </span>
                    </Tooltip>
                );
            },
        },
    ];
}

export function genDoneColumns(props): any[] {
    return [
        ...baseColumns,
        {
            title: "时间",
            dataIndex: "endTime",
            key: "endTime",
            render(endTime: string) {
                return endTime
                    ? dayjs(endTime).format("YYYY-MM-DD HH:mm:ss")
                    : "-";
            },
            ellipsis: true,
        },
        {
            title: "操作",
            align: "center",
            width: 80,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            render(_: any, item: any) {
                return (
                    <Tooltip title={"查看"}>
                        <Button
                            type="link"
                            icon={
                                <span className="operate_icon">
                                    <CheckIcon />
                                </span>
                            }
                            onClick={() => {
                                props?.showDetail(item);
                            }}
                        />
                    </Tooltip>
                );
            },
        },
    ];
}
