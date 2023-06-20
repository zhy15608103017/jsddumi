import moment from 'moment';

export const timeFormat = (time: any, format = 'day') => {
    if (format === 'day') {
        return time?.time
            ? moment(time?.time)?.utcOffset(time?.zone)?.format('YYYY-MM-DD HH:mm')
            : moment(time)?.format('YYYY-MM-DD HH:mm');
    }
    return time?.time
        ? moment(time?.time)?.utcOffset(time?.zone)?.format('YYYY-MM-DD HH:mm')
        : moment(time)?.format('YYYY-MM-DD HH:mm');
};
export const checkInSource = (sourceArr: string[], includes: string): boolean => {
    if (sourceArr.includes(includes)) {
        return true;
    }
    return false;
};
export const transitionTime = (time: any) => {
    // eslint-disable-next-line no-empty
    let localUtc = moment().utcOffset()
    let newTime: any = 0
    if (time === null) {
        newTime = 0
    }
    else if (typeof time === 'object' && !time?.time) {
        newTime = 0
    }
    else if (typeof time === 'object' && time?.zone) {
        const zone = +time.zone.split(":")[0]
        newTime = time?.time - (localUtc - zone * 60) * 60 * 1000
    }
    else{
        newTime = time
    }
    newTime -= newTime % (60 * 1000);
    return newTime;
};

export function timeZone(milestones: any) {
    // eslint-disable-next-line no-empty
    const _milestones = milestones.map((item: any) => {
        const _item = JSON.parse(JSON.stringify(item));
        if (item?.est && typeof item?.est === 'object') {
            _item.est = moment(item?.est?.time).utcOffset(item?.est?.zone);
        }
        if (item?.act && typeof item?.act === 'object') {
            _item.act = moment(item?.act?.time).utcOffset(item?.act?.zone);
        }
        if (item?.cutoff && typeof item?.cutoff === 'object') {
            _item.cutoff = moment(item?.cutoff?.time).utcOffset(item?.cutoff?.zone);
        }
        return _item;
    });
    return _milestones;
}
