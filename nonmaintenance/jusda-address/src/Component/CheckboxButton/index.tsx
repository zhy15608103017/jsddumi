import { Button } from "antd";
import "./index.less";
import React, { useState, useEffect } from "react";
import { CheckedIcon } from "../../assets/SvgIcon";

interface checkboxProps {
    onChange?: Function;
    value?: boolean;
    label: string;
}

const CheckboxButton = ({
    onChange = () => {},
    value,
    label
}: checkboxProps) => {
    const [checked, setChecked] = useState(value);
    const handleChange = (value: boolean) => {
        onChange(value);
    };

    useEffect(() => {
        setChecked(value);
    }, [value]);

    return (
        <div
            className={"checkboxContainer"}
            onClick={() => {
                handleChange(!checked);
            }}
        >
            <Button>
                <div
                    className={`${"iconContainer"} ${
                        checked ? "iconContainerSuccess" : ""
                    }`}
                >
                    <CheckedIcon />
                </div>
                <div
                    className={`${"content"} ${
                        checked ? "contentSuccess" : ""
                    }`}
                >
                    {/* {formatMessage({ id: label })} */}
                    {label}
                </div>
            </Button>
        </div>
    );
};

export default CheckboxButton;
