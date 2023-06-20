/**
 * code： 当前项的code
 * value：当前项的value
 * optionData: 传入select的option数据
 * optionDataFn： 传入请求select的option数据的方法（在select初试化和监听到dependencyValue变化时都会执行）
 * dependencyCode:  指定依赖项的code
 * dependencyValue： 指定依赖项的value
 * ui: ui样式等
 * */
export interface ICascaderType {
    code: string;
    value: string | number | null;
    optionData?:  [any];
    optionDataFn?: any;
    dependencyCode?: string;
    dependencyValue?: {any}
    ui: {
        placeholder?: string;
        disabled?: boolean,
        suffixIcon?: any;
        style: {[key: string]: any;};
    };
}
