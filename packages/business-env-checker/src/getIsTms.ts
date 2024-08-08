/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * 判断是否是Tms环境(项目终止了)
 */
export default function isTms() {
    // @ts-ignore
    const { isTms } = window.jusdaBaseConfig;
    return isTms;
}
  