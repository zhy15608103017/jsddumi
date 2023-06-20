import * as sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import dayjs from 'dayjs';
/**
 * @description sentry 初始化配置
 * @param {*} option
 */
export const sentryInit = () => {
    //@ts-ignore
    const { jusdaBaseConfig = {} } = window;
    let enable =
        jusdaBaseConfig?.cfgType !== 'dev' ? true : jusdaBaseConfig?.sentry?.enable || false;
    if (enable) {
        const sentyData = jusdaBaseConfig?.sentry;
        const release = dayjs().format('YYYY-MM-DD');
        sentry.init({
            tracesSampleRate: 0.75,
            release: release, //版本
            integrations: [new BrowserTracing()],
            environment: jusdaBaseConfig.cfgType, // 环境
            ...sentyData,
        });
    }
};

/**
 * @description 接口|⾃动报告(try/catch)|未捕获的异常错误上报
 * @param {*} option
 */
export const captureException = response => {
    const { status = null, url = null } = response;
    const newResponse = JSON.stringify(response);
    response.url && typeof response === 'object'
        ? sentry.captureException(
              `"错误类型":${status},"路径":${url},"数据":${newResponse || null}`
          )
        : sentry.captureException(response);
};
/**
 * @description 捕获裸消息
 * @param {*} option
 */
export const captureMessage = option => {
    sentry.captureMessage(option);
};

export const Sentry = sentry;
