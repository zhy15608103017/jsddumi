/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { loadMicroApp} from "qiankun";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { CustomProps } from "single-spa";
import actions from "../../shared/actions";

// // loadMicroApp的实例对象
type MicroAppProps = {
    unmount: any;
    mount?: () => Promise<null>;
    update?: ((customProps: CustomProps) => Promise<any>) | undefined;
    getStatus?: () =>
        | "NOT_LOADED"
        | "LOADING_SOURCE_CODE"
        | "NOT_BOOTSTRAPPED"
        | "BOOTSTRAPPING"
        | "NOT_MOUNTED"
        | "MOUNTING"
        | "MOUNTED"
        | "UPDATING"
        | "UNMOUNTING"
        | "UNLOADING"
        | "SKIP_BECAUSE_BROKEN"
        | "LOAD_ERROR";
    loadPromise?: Promise<null>;
    bootstrapPromise?: Promise<null>;
    mountPromise?: Promise<null>;
    unmountPromise?: Promise<null>;
};


export type LoadChildWidgetAppProps<T> = {
    [K in keyof T]: T[K];
} & {
    name?: string;
    entry?: string;
}

export const LoadChildWidgetApp = (
    props: LoadChildWidgetAppProps<any>
): React.ReactElement => {
    // const containerRef = React.createRef();
    const [loading, setLoading] = useState(true);
    const [microApp, setMicroApp] = useState<MicroAppProps | null>(null);

    const { name, entry, restData, ...rest } = props;
    useEffect(() => {
        setLoading(true);
        let newMicroApp = null as any;
        if (name && entry) {
            microApp?.unmount();
            // 初始化 state
            // actions.onGlobalStateChange((state, prev) => {
            //   // state: 变更后的状态; prev 变更前的状态
            //   console.log(state, prev);
            // });
            console.log('manager render LoadChildWidgetApp',rest );
            
            newMicroApp = loadMicroApp(
                {
                    name,
                    entry,
                    container: "#container",
                    props: {...restData,...rest, actions},
                },
                {
                    // strictStyleIsolation:false ,取消样式隔离，图标才会显示。
                    sandbox: { strictStyleIsolation: false },
                    singular: false,
                    autoStart: true,
                },
                {
                    // @ts-ignore
                    beforeLoad: () => {
                        return console.log("beforeLoad111");
                    },
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    afterMount: () => {
                        setLoading(false);
                        actions.setGlobalState(rest);
                        return console.log("afterMount222");
                    },
                }
            );
            setMicroApp(newMicroApp);
        }
        return () => newMicroApp?.unmount();
    }, [name, entry]);

    return (
        <Spin spinning={loading} size="large">
            <div id="container" />
        </Spin>
    );
};
