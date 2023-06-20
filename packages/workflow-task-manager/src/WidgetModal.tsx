/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Modal, Spin } from "antd";
import { ModalProps } from "antd/lib/modal";
import React, { useEffect, useState } from "react";
import { deserializeContextData } from "../utils/utils";
import ErrorBoundaries from "./components/ErrorBoundaries";
import {
    LoadChildWidgetApp,
    LoadChildWidgetAppProps,
} from "./components/LoadChildWidgetApp";
import useRequest from "./hooks/useRequest";
import { fetchDetail } from "./services";
import actions from "./shared/actions";

interface BusinessBrief {
    name: string;
    processInstanceId: string;
    id: string;
    businessDomainName?: string;
    businessKey?: string;
}

interface WidgetModalProps extends ModalProps {
    businessData?: BusinessBrief;
    closeCallback?: () => void;
}

export default function WidgetModal(props: WidgetModalProps) {
    const { businessData, closeCallback, ...rest } = props;
    const [detail, setDetail] = useState<LoadChildWidgetAppProps<any> | null>(null);
    const [loading, runFetch] = useRequest(fetchDetail);

    async function initDetail(curData: BusinessBrief) {
        const { processInstanceId, id } = curData;
        const resp = await runFetch({ processInstanceId, taskId: id });
        const { success, data } = resp || {};
        if (!success) return;
        const { formUrl,  variableMap, ...restData} = data;
        const newVariable = deserializeContextData(variableMap);
        setDetail({ name: restData.id, entry: formUrl, formUrl, taskId: restData.id ,variableMap: newVariable, actions, restData });
    }

    useEffect(() => {
        actions.onGlobalStateChange((state, prevState) => {
            // state: 变更后的状态; prevState: 变更前的状态
            if (state?.shouldForceCloseModal) {
                typeof closeCallback === "function" && closeCallback();
                actions.setGlobalState({ shouldForceCloseModal: false });
            }
        });
        if (!businessData) return;
        initDetail(businessData);
    }, [businessData]);

    return (
        <Modal {...rest}>
            <Spin spinning={loading}>
                <ErrorBoundaries>
                    {detail ? (
                        <LoadChildWidgetApp {...(detail || {})} />
                    ) : (
                        false
                    )}
                </ErrorBoundaries>
            </Spin>
        </Modal>
    );
}
