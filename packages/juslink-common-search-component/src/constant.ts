import { DatePickerProps, InputProps, SelectProps } from "antd"
import { DatePickerType } from "antd/es/date-picker"

export enum TermType {
    INPUT,
    SELECT,
    MULTI_SELECT,
    DATETIME,
}

export type LanguageType =  'zh-CN' | 'en-US';

type BaseTermOption = {
    key: string,
    widget?: TermType,
    label?: string,
    sticky?: boolean,
    disableAutoSearch?: boolean,
}

interface InputOption extends BaseTermOption, InputProps {
    widget?: TermType.INPUT
}
interface SelectOption extends BaseTermOption, SelectProps {
    widget: TermType.SELECT,
    model: undefined,
}
interface MultiSelectOption extends BaseTermOption, SelectProps {
    widget: TermType.MULTI_SELECT,
    model: 'multiple',
    searchPlaceholder:string,
}
interface DatetimeOption extends BaseTermOption, DatePickerType {
    widget: TermType.DATETIME,
}


export type SearchTermOption = InputOption | SelectOption | MultiSelectOption | DatetimeOption
//  {
//     key: string,
//     type?: TermType,
//     label?: string,
//     sticky?: boolean,
//     options?: {label:string , value: any}[],
// }

export const classNamePrefix = "juslink-common-search-component"