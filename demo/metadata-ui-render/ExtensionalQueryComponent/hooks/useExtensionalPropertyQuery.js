import { MetadataFunctionContext } from '@jusda-tools/metadata-ui-render';
import { useContext, useMemo } from 'react';
import { OperatorType, OperatorTypeLabelMap } from '../utils/enums';
import FloatRange from '../components/FloatRange';
import IntegerRange from '../components/IntegerRange';

function getWidgetConfs(element) {
    const { type, formatStrategy } = element;
    switch (type) {
        case 'STRING':
            return { widget: 'input' };
        case 'INTEGER':
            return {
                getWidget(curOperator) {
                    if (curOperator === OperatorType.BETWEEN) {
                        return { widget: IntegerRange.name, type: 'range' };
                    }
                    return { widget: 'inputNumber' };
                },
            };
        case 'FLOAT':
            return {
                getWidget(curOperator) {
                    if (curOperator === OperatorType.BETWEEN) {
                        return { widget: FloatRange.name, type: 'range' };
                    }
                    return { widget: 'inputNumber' };
                },
            };
        case 'BOOLEAN':
            return {
                widget: 'radio',
                options: [
                    { value: 'true', label: '是' },
                    { value: 'false', label: '否' },
                ],
            };
        case 'DATETIME':
            return {
                getWidget(curOperator) {
                    if (curOperator === OperatorType.BETWEEN) {
                        return { widget: 'dateRange', type: 'range' };
                    }
                    return { widget: 'datePicker' };
                },
            };
        default:
            return { widget: 'input' };
    }
}

export default function useExtensionalPropertyQuery() {
    const value = useContext(MetadataFunctionContext);
    const {
        modelExtensionalProperty,
        queryExtensionalPropertyConfigs = [],
        queryExtensionalPropertyUiList,
    } = value || {};

    const configurations = useMemo(() => {
        const result = {};

        queryExtensionalPropertyConfigs?.forEach((exProp) => {
            const { modelCode, propertyName, operatorConfigs = [], visible } = exProp;
            if (!visible) return;
            const targetPropertyInfo = modelExtensionalProperty
                ?.find((ele) => ele.standardModelCode === modelCode)
                ?.extensionalProperties?.find((ele) => ele.name === propertyName);
            const targetPropertyUiConf = queryExtensionalPropertyUiList?.find(
                (ele) =>
                    ele.modelCode === modelCode && ele.propertyName === propertyName,
            );

            result[propertyName] = {
                label: targetPropertyUiConf?.label || propertyName,
                dataElement: targetPropertyInfo?.dataElement
                    ? { ...targetPropertyInfo?.dataElement }
                    : undefined,
                operators: operatorConfigs.map(({ operator, ...rest }) => ({
                    label: OperatorTypeLabelMap[operator],
                    value: operator,
                    ...rest,
                })),
                valueFormItemOptions: getWidgetConfs(
                    targetPropertyInfo?.dataElement || {},
                ),
            };
        });

        return result;
    }, [value]);

    return configurations;
}
