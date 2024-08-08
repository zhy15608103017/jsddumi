import { Form, FormInstance, FormProps } from "antd";
import React from "react";
import TermItem from './TermItem';
import { SearchTermOption } from "../../constant";
import {LanguageType} from '../../constant';

interface SearchAreaProps extends FormProps {
    configs:(SearchTermOption & {onPressSearch?: (value: string) => void})[];
    form: FormInstance;
    className?: string;
    locale?: LanguageType,
    extraButton?: React.ReactNode
}

const SearchArea: React.FC<SearchAreaProps> = (props) => {
    const { configs, form, className ,locale,extraButton, ...rest} = props
    return <Form {...rest} form={form} layout="inline" className={className}>
        {configs.map(config => <Form.Item name={config.key}>
            <TermItem config={config} locale={locale} />
        </Form.Item>
        )}
        {extraButton}
    </Form>
}

export default SearchArea