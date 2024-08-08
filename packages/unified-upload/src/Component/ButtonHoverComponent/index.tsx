import React from 'react';
import { Button, Dropdown } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import getLocale from '../../locale';
import { ButtonHoverPropertiesProps } from '../../UniFieldUpload/types';

const ButtonHoverComponent = ({
    templateButtonClick,
    templateButtonLoading,
    buttonDescribe,
    locale,
    buttonHoverProperties,
}: {
    templateButtonClick: any;
    templateButtonLoading: boolean;
    buttonDescribe: string;
    locale: 'zh-CN' | 'en-US';
    buttonHoverProperties?: ButtonHoverPropertiesProps;
}) => {
    const currentLocale: any = getLocale(locale);

    const items = buttonHoverProperties?.items.map(
        (item: { label: string; key?: string }) => {
            return {
                key: item.key || item.label,
                label: item.label,
                onClick: (menuProps: any) =>
                    buttonHoverProperties?.menuItemOnClick?.(menuProps),
            };
        },
    );

    return (
        <div>
            {/* 是否禁用按钮的展开效果,老版默认禁用.新版交互需要有Hover效果,方便用户选择对应格式模板 */}
            {buttonHoverProperties ? (
                <Dropdown.Button
                    loading={templateButtonLoading}
                    className={'download-button-container'}
                    menu={{
                        items,
                    }}
                    placement="bottomLeft"
                >
                    <div
                        onClick={(e) => templateButtonClick(e)}
                        className={'download-button'}
                    >
                        <DownloadOutlined />
                        {buttonDescribe || currentLocale['Download']}
                    </div>
                </Dropdown.Button>
            ) : (
                <Button
                    onClick={(e) => {
                        templateButtonClick(e);
                    }}
                    loading={templateButtonLoading}
                    className={'download-button'}
                    icon={<DownloadOutlined />}
                >
                    {buttonDescribe || currentLocale['Download']}
                </Button>
            )}
        </div>
    );
};

export default ButtonHoverComponent;
