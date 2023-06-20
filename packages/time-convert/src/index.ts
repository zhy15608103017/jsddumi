import TimezoneComponent from './TimeConvert';
import dayjs from 'dayjs';
interface TimeConfig {
    time: Date,
    originTimezone?: string,
    format?: string,
    withTimezone?: boolean
}
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

const defaultConfig: TimeConfig = {
    time: new Date(),
    originTimezone: (dayjs as any).tz.guess(),
    format: 'YYYY-MM-DD HH:mm:ss',
    withTimezone: true
}
const convertByTimezone = (config: TimeConfig) => {
    let { time, originTimezone, format, withTimezone } = {
        ...defaultConfig,
        ...config
    };
    // 传入时区
    if(config.originTimezone){
        // 判断时区是否合法
        const [sign,offset] =config.originTimezone.toUpperCase().split("+")
        if(sign == 'UTC' && parseFloat(offset) === parseFloat(offset)){
            let targetOffset = parseFloat(offset)
            // 计算目标时区时间戳
            let targetTime = time.getTime() + time.getTimezoneOffset() * 60 *1000 + targetOffset * 60 * 60 * 1000
            return withTimezone ? targetTime +` ${originTimezone?.toUpperCase()}` : targetTime
        }
        else{
            // 传入格式不对，默认设置为没传
           originTimezone = (dayjs as any).tz.guess()
           config.originTimezone = ''
        } 
    }
    // 默认在时间后面展示时区，如果显示的传入withTimezone为false。或者没有传入originTimezone时区，则不显示时区信息
    return (withTimezone && config.originTimezone) ? (dayjs(time) as any).tz(originTimezone).format(format).getTime() +` ${originTimezone?.toUpperCase()}` :(dayjs(time) as any).tz(originTimezone).format(format).getTime()
    
}
export default {
    TimezoneComponent,
    convertByTimezone
};
