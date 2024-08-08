import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getThirdToken} from './utils';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IReportType {
    reportUrl: string;
    styleObj: { [key: string]: string };
}
export default function ReportPermissionIframe(props: IReportType) {
    const [token, setToken] = useState('');
    const [src, setSrc] =  useState('');
    const [url, setUrl] = useState(props?.reportUrl);

    const sendMessageFn = (url) => {
        setTimeout(() => {
            const iframe = document.getElementById('myIframe');
            // @ts-ignore
            iframe?.contentWindow?.postMessage(url, '*');
        }, 10000);
    };

    const preCheckFn = async (token) => {
        const newUrl =  `${url}&ssoToken=${token}`;
        sendMessageFn(newUrl);
        const filterArr = ['重新登陆', '进入决策平台', '登陆超时'];
        const res = await axios.get(newUrl);
        if (filterArr.some(field => (res?.data || []).includes(field))) {
            console.log('字符串包含指定的字段之一',res,  window.location.hostname);
            // @ts-ignore
            setSrc(`https://${window.location.hostname}/third-part-redirct/#/report`);
        } else {
            setSrc(token ? newUrl : '');
        }
    };

    const getToken = async (url) => {
        url ? setUrl(url) : null;
        let token = await getThirdToken();
        setToken(token);
        await preCheckFn(token);
    };


    useEffect(() => {
        getToken(props?.reportUrl);
        (window as any).getTokenFn = getToken;
    }, []);


    return (
        <>
            <iframe id={'myIframe'} width={'100%'} height={'100%'} {...props.styleObj} src={src} />
        </>
    );
}
