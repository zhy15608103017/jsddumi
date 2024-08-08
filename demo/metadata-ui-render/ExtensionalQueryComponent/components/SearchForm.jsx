import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import FilterForm from './FilterForm';
import CombinedForm, { OperatorType } from '@jusda-tools/juslink-combined-search-form'
import { Popconfirm, Tag } from 'antd';
import { useForm } from '@jusda-tools/metadata-ui-render';
import moment from 'moment';
import { OperatorTypeLabelMap } from '../utils/enums';
import useSafeUpdate  from '../hooks/useSafeUpdate';
// import styles from './index.less';

function SearchForm(props, ref) {
  const { subFilterConfigurations, onSearch, mode, formDefaultValue, widgets, ...rest } = props;

  const [searchInfo, setSearchInfo] = useSafeUpdate([]);
  const [canConfirm, setCanConfirm] = useState(false);
  const form = useForm();

  useImperativeHandle(ref, () => ({
    getSearchInfo() {
      return searchInfo
    },
  }), [searchInfo])

  useEffect(() => {
    updateSearchInfoNSearch([])
  }, [subFilterConfigurations])

  useEffect(()=>{
    onSearch(handleValue(searchInfo))
  },[searchInfo])

  const getDefaultByType = (dataElement, value) => {
    const { type, formatStrategy } = dataElement;
    if (type === 'BOOLEAN') return !!value;
    if (type === 'STRING' || type === 'FLOAT') return `${value}`;
    if (type === 'INTEGER') return Number(value);
    if (type === 'DATETIME') {
      try {
        return moment(value).format(formatStrategy.pattern) //, formatStrategy.pattern
      } catch (e) {
        return moment(value);
      }
    };
  }

  const getDefaultValue = (dataElement, operatorConfs) => {
    if (!operatorConfs || !operatorConfs.defaultValueEnabled) return undefined;
    const { defaultValue, endDefaultValue, value } = operatorConfs;
    if (value === 'BETWEEN') {
      if (!dataElement) return [defaultValue, endDefaultValue];
      const result = [getDefaultByType(dataElement, defaultValue), getDefaultByType(dataElement, endDefaultValue)];
      return result;
    }
    if (!dataElement) return defaultValue;
    return getDefaultByType(dataElement, defaultValue);

  }


  const getInitFormRenderProps = (targetConditionConf, changedValues) => {
    // if (subFilterConfigurations) return subFilterConfigurations;
    const paramKeys = Object.keys(subFilterConfigurations || {});
    const filterNameOptions = [];
    const customWidgets = { ...widgets };
    paramKeys.forEach(key => {
      const itemConf = (subFilterConfigurations || {})[key];
      filterNameOptions.push({ label: itemConf.label, value: key });
    });
    const { operators, label, valueFormItemOptions, getWidget, getProps, props, ...rest } = targetConditionConf || {};
    const operatorOptions = operators || Object.keys(OperatorType).map(label => ({ label, value: OperatorType[label] }));

    const calculateWidget = () => {
      const { getWidget, widget } = valueFormItemOptions;
      if (typeof getWidget === 'function') {
        const result = getWidget(changedValues?.operator?.value);
        if (typeof result.widget === 'function') return { placeholder: '请输入', ...result, widget: result.name };
        return { placeholder: '请输入', ...result };
      }
      return { placeholder: '请输入', ...valueFormItemOptions, widget: typeof widget === 'function' ? widget.name : widget || 'input' };
    }


    const result = {
      widgets: customWidgets,
      schema: {
        type: 'object',
        column: 2,
        displayType: 'column',
        properties: {
          conditionName: {
            title: '条件',
            type: 'string',
            widget: 'select',
            props: {
              options: filterNameOptions,
              labelInValue: true,
              placeholder: '选择搜索条件'
            }
          },
          operator: {
            title: '操作',
            type: 'string',
            widget: 'select',
            disabled: !targetConditionConf || operatorOptions?.length === 1,
            props: {
              options: operatorOptions,
              labelInValue: true,
              placeholder: '选择操作'
            }
          },
        }
      }
    }

    if (targetConditionConf || formDefaultValue) {
      result.schema.properties.conditionValue = {
        ...rest,
        title: '值',
        type: 'string',
        cellSpan: 2,
        disabled: !targetConditionConf && !formDefaultValue,
        ...calculateWidget()
      }
    }

    return result
  }

  const getPopoverContent = () => {
    const formRenderOptions = getInitFormRenderProps();

    return <FilterForm
      maxWidth={420}
      watch={{
        '#': (allValues, changedValue) => { // '#': () => {} 等同于 onValuesChange
          const { conditionName, operator } = changedValue || {};
          if (conditionName) {
            //  搜索条件更新后，操作和值需要重新计算配置和重置
            const paramsConf = subFilterConfigurations ? subFilterConfigurations[conditionName.value] : {};
            const newOperatorOptions = paramsConf.operators || [];
            const newDefaultValue = getDefaultValue(paramsConf.dataElement, newOperatorOptions?.length === 1 ? newOperatorOptions[0] : undefined)
            const newSchema = getInitFormRenderProps(paramsConf, {
              ...changedValue, operator: newOperatorOptions?.length === 1 ? newOperatorOptions[0] : undefined,
              conditionValue: newDefaultValue
            });
            form.setSchema(newSchema.schema, true);
            form.setValues({
              operator: newOperatorOptions?.length === 1 ? newOperatorOptions[0] : undefined,
              conditionValue: newDefaultValue
            })
            setCanConfirm(!!newDefaultValue);
            return;
          }
          if (operator) {
            //  操作条件更新后，值需要重新计算配置和重置
            const { conditionName: targetConditionName } = allValues;
            const targetParamsConf = subFilterConfigurations ? subFilterConfigurations[targetConditionName.value] : {};
            const curOperator = targetParamsConf.operators?.find(ele => ele.value === operator.value);
            const defaultConditionValue = getDefaultValue(targetParamsConf.dataElement, curOperator);
            const newSchemaByOperator = getInitFormRenderProps(targetParamsConf, {
              ...changedValue, operator: curOperator ? curOperator : undefined,
              conditionValue: defaultConditionValue
            });
            form.setSchema(newSchemaByOperator.schema, true);
            form.setValues({
              conditionValue: defaultConditionValue,
            })
            setCanConfirm(!!defaultConditionValue);
            return;
          }
          if (['conditionName', 'conditionValue', 'operator'].every(key => {
            if (Array.isArray(allValues[key])) return !!allValues[key].length;
            if (typeof allValues[key] === 'object') return allValues[key].value;
            return allValues[key];
          })) {
            setCanConfirm(true);
          } else {
            setCanConfirm(false);
          }
        },
      }}
      {...formRenderOptions}
      form={form}
    />
  }
  const handleValue = (conditions) => {
    return conditions?.reduce((pre, cur) => {
      const { conditionName, conditionValue, operator } = cur;
      const propertyName = conditionName?.value || conditionName;
      const conditionConf = subFilterConfigurations?.[propertyName];
      const item = {
        dataType: conditionConf?.dataElement?.type,
        propertyName,
        operator: operator?.value === "BETWEEN" ? conditionConf?.operators?.find(ele => ele.value === operator.value)?.startOperator : operator.value,
        value: Array.isArray(conditionValue) ? conditionValue[0] : conditionValue
      }
      pre.push(item);
      if (operator?.value === 'BETWEEN') {
        const endItem = {
          dataType: conditionConf?.dataElement?.type,
          propertyName,
          operator: operator?.value === "BETWEEN" ? conditionConf?.operators?.find(ele => ele.value === operator.value)?.endOperator : '',
          value: Array.isArray(conditionValue) ? conditionValue[1] : conditionValue
        }
        pre.push(endItem)
      }
      return pre
    }, [])
  }

  const updateSearchInfoNSearch = (newValue) => {
    setSearchInfo(newValue);
  }

  const getItemContent = (item) => {
    const { conditionName, conditionValue, operator } = item;
    const nameLabel = conditionName?.label || conditionName;
    if (Array.isArray(conditionValue) && operator?.value === 'BETWEEN') {
      const propertyName = conditionName?.value || conditionName;
      const startOperator = subFilterConfigurations[propertyName].operators?.find(ele => ele.value === operator.value)?.startOperator;
      const endOperator = subFilterConfigurations[propertyName].operators?.find(ele => ele.value === operator.value)?.endOperator;
      return `${nameLabel} ${OperatorTypeLabelMap[startOperator]} ${conditionValue[0]} ${OperatorTypeLabelMap[endOperator]} ${conditionValue[1]}`
    }
    return `${nameLabel} ${OperatorTypeLabelMap[operator?.value]} ${conditionValue?.value || conditionValue}`
  }

  const deleteCondition = (item) => {
    const { conditionName } = item;
    const index = searchInfo.findIndex(ele => ele.conditionName == conditionName);
    if (index >= 0) {
      searchInfo.splice(index, 1);
      updateSearchInfoNSearch([...searchInfo]);
    }
  }



  return (
    <CombinedForm
      {...rest}
      style={{marginBottom: 8}}
      mode={mode}
      onChange={(newValue) => {
        updateSearchInfoNSearch(newValue);
      }}
      value={searchInfo}
      valueRender={(item) => {
        return <Tag
          style={{
            maxWidth: 'calc(100% - 8px)',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
          }}
          closable
          onClose={() => deleteCondition(item)}
          key={item.conditionName?.value || item.conditionName}>{getItemContent(item)}</Tag>
      }}
      onReset={() => updateSearchInfoNSearch([])}
      addFilterButtonRender={(defaultDom, addFilter) => {
        return <Popconfirm
          // overlayClassName={`${styles['searchForm-popup']}`}
          disabled={rest.loading}
          icon={<></>}
          placement="bottomLeft"
          title={() => getPopoverContent()}
          okButtonProps={{
            disabled: !canConfirm,
            size: 'middle',
            type: 'primary',
          }}
          cancelButtonProps={{
            size: 'middle'
          }}
          okText={'搜索'}
          onConfirm={() => {
            const subConditions = searchInfo;
            const newCondition = form.getValues();
            const targetIndex = subConditions.findIndex(ele => ele.conditionName.value === newCondition.conditionName?.value);
            if (targetIndex < 0) {
              updateSearchInfoNSearch([...subConditions, newCondition]);
              return
            }
            subConditions.splice(targetIndex, 1, newCondition)
            updateSearchInfoNSearch([...subConditions]);
          }}
          onOpenChange={(visible) => {
            if (!visible) {
              form.resetFields();
              form.setSchema(getInitFormRenderProps().schema, true);
              setCanConfirm(false);
            } else {
              form.setValues(formDefaultValue)
            }
          }}
          overlayStyle={{ zIndex: 500 }}
        >
          {defaultDom}
        </Popconfirm>
      }}
    />
  );
}

export default forwardRef(SearchForm);
