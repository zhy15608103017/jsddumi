import React from "react";
import { Button } from "antd";
import { useAddressIntl } from "../../useIntl";
import "./index.less";

const EmptyContent = ({
    contentLabel = "发货方信息",
    onClick = () => {}
}: {
    contentLabel: string;
    onClick: () => void;
}) => {
    const { formatMessage } = useAddressIntl();
    return (
        <div className={"empty-content-container"}>
            <div>
                <div className="empty-content-button">
                    <Button size="small" onClick={onClick}>
                        +{contentLabel}
                    </Button>
                </div>
                <div className="empty-content-tip">
                    (
                    {formatMessage({
                        id: "Please add an address/choose a common address"
                    })}
                    )
                </div>
            </div>
        </div>
    );
};

export default EmptyContent;
