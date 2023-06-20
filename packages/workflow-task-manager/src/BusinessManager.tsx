/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ModalProps } from "antd/lib/modal";
import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { genTodoColumns } from "./BussinessColumns";
import VirtualTable from "./components/VirtualTable";
import useRequest from "./hooks/useRequest";
import { fetchTodo } from "./services";
import WidgetModal from "./WidgetModal";
import {LOCALE_KEY} from '../utils/utils';
import LocaleLibrary from './locale';

type BusinessManagerProps = {
    // type?: "whole" | "part";
    modalProps?: Omit<ModalProps, "visible">; // 弹窗的属性
    locale?: string;
};

type TableData = any[];

export const BUSINESS_TABLE_WIDTH = 684;

function BusinessManager(
    props: BusinessManagerProps, ref?: ForwardedRef<any>
): React.ReactElement {

    let defaultLocale = localStorage.getItem(LOCALE_KEY) || "zh-CN";
    if (props?.locale) {
        defaultLocale = props?.locale;
    }
    const localeLibrary  = LocaleLibrary[defaultLocale]?LocaleLibrary[defaultLocale]:LocaleLibrary["zh-CN"];

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const { modalProps = { title: localeLibrary.modelTitle, footer: false } as ModalProps } = props;
    const { onCancel } = modalProps;
    const [todoData, setTododata] = useState<TableData | undefined>();
    const [todoLoading, runFetchToto] = useRequest(fetchTodo);
    const [data4Show, setData4Show] = useState<any | null>(null);


    const editDetail = (item: any) => {
        setData4Show(item);
    };

    const handler = {
        editDetail,
    };

    const _handleCancel = (e) => {
        setData4Show(null);
        typeof onCancel === "function" && onCancel(e);
    };

    async function initData(
        fetchFunc: (params?: any) => Promise<any>,
        setData: (data: any) => void
    ): Promise<void> {
        const resp = await fetchFunc();
        const { success, data } = resp || {};
        if (!success) return;
        setData(data);
    }

    useImperativeHandle(ref, ()=>({
        updateTableData:()=> {
            if(todoLoading)return;
            initData(runFetchToto, setTododata);
        }
    }),[todoLoading, runFetchToto, setTododata]);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    useEffect(() => {
        initData(runFetchToto, setTododata);
    }, [data4Show]);
    return (
        <>
            <VirtualTable
                className="businessTable"
                columns={genTodoColumns(handler,localeLibrary)}
                loading={todoLoading}
                dataSource={todoData}
                scroll={{ y: 311 - 48 - 64 }}
            />
            <WidgetModal
                width={1000}
                {...(modalProps || {})}
                visible={!!data4Show}
                onCancel={_handleCancel}
                businessData={data4Show}
                closeCallback={() => {
                    setData4Show(null);
                }}
            />
        </>
    );
}

export default forwardRef(BusinessManager);