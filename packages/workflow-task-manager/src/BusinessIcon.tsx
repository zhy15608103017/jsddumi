import React, { LegacyRef, useRef, useState } from "react";
import TodoIcon from "./assets/icon/todo.svg";
import { ReactSVG } from 'react-svg';
import BusinessManager, { BUSINESS_TABLE_WIDTH } from "./BusinessManager";
import "./BusinessIcon.less";
import { ModalProps } from "antd/lib/modal";


interface BusinessIconProps {
    theme?: "light" | "dark"; // 主题
    modalProps?: Omit<ModalProps, "visible">; // 弹窗的属性
    locale?: string;
}

function BusinessIcon(props: BusinessIconProps): React.ReactElement {
    const { theme = "light", modalProps, locale } = props;
    const [showDetail, setShowDetail] = useState(false);
    const iconRef = useRef<HTMLSpanElement | null>(null);
    function handleClick(): void {
        setShowDetail(!showDetail);
    }

    const { left = 0 } =
        iconRef.current?.getBoundingClientRect() || ({} as any);
    const styles = {
        display: showDetail ? "block" : "none",
    } as any;
    if (window.innerWidth - left > BUSINESS_TABLE_WIDTH) {
        styles.left = 0;
    } else {
        styles.right = 0;
    }
    return (
        <div
            className={`iconBox-${theme === "dark" ? theme : "light"} iconBox`}
        >
            <span ref={iconRef} className="icon" onClick={handleClick}>
                <ReactSVG src={TodoIcon} />
                {/* <TodoIcon /> */}
            </span>
            <div style={styles} className="managerBox">
                {showDetail?<BusinessManager modalProps={modalProps} locale={locale}/>:false}
            </div>
        </div>
    );
}

export default BusinessIcon;


