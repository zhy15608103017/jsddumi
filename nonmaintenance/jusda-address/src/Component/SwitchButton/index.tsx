import React from "react";
import "./index.less";
import { SwitchIcon } from "../../assets/SvgIcon";
const SwitchButton = ({
    handleClick = () => {},
    label = "切换为手动模式"
}: {
    handleClick: () => void;
    label: string;
}) => {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between"
            }}
        >
            <div
                className={"search-address-content-container"}
                onClick={handleClick}
            >
                <span
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <SwitchIcon />
                </span>
                {label}
            </div>
        </div>
    );
};

export default SwitchButton;
