import { useState, useEffect } from "react";
import zh_CN from "./locale/zh_CN";
import en_US from "./locale/en_US";

const useAddressIntl = () => {
    const [currentLocale, setCurrentLocale] = useState(
        localStorage.address_locale || "zh-CN"
    );
    const locale: any = {
        "zh-CN": zh_CN,
        "en-US": en_US
    };
    const formatMessage = ({ id }: { id: string }) => {
        const data = locale?.[currentLocale]?.[id];
        if (data) {
            return data;
        } else {
            // console.warn("没有找到该语言");
            return id;
        }
    };

    useEffect(() => {
        localStorage.address_locale = currentLocale;
    }, [currentLocale]);

    return { formatMessage, setCurrentLocale, currentLocale };
};

export { useAddressIntl };
