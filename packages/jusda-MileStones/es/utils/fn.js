import moment from 'moment';
export const timeFormat = (time, format = 'day') => {
    var _a, _b, _c, _d, _e, _f;
    if (format === 'day') {
        return (time === null || time === void 0 ? void 0 : time.time)
            ? (_b = (_a = moment(time === null || time === void 0 ? void 0 : time.time)) === null || _a === void 0 ? void 0 : _a.utcOffset(time === null || time === void 0 ? void 0 : time.zone)) === null || _b === void 0 ? void 0 : _b.format('YYYY-MM-DD HH:mm')
            : (_c = moment(time)) === null || _c === void 0 ? void 0 : _c.format('YYYY-MM-DD HH:mm');
    }
    return (time === null || time === void 0 ? void 0 : time.time)
        ? (_e = (_d = moment(time === null || time === void 0 ? void 0 : time.time)) === null || _d === void 0 ? void 0 : _d.utcOffset(time === null || time === void 0 ? void 0 : time.zone)) === null || _e === void 0 ? void 0 : _e.format('YYYY-MM-DD HH:mm')
        : (_f = moment(time)) === null || _f === void 0 ? void 0 : _f.format('YYYY-MM-DD HH:mm');
};
export const checkInSource = (sourceArr, includes) => {
    if (sourceArr.includes(includes)) {
        return true;
    }
    return false;
};
export const transitionTime = (time) => {
    // eslint-disable-next-line no-empty
    let localUtc = moment().utcOffset();
    let newTime = 0;
    if (time === null) {
        newTime = 0;
    }
    else if (typeof time === 'object' && !(time === null || time === void 0 ? void 0 : time.time)) {
        newTime = 0;
    }
    else if (typeof time === 'object' && (time === null || time === void 0 ? void 0 : time.zone)) {
        const zone = +time.zone.split(":")[0];
        newTime = (time === null || time === void 0 ? void 0 : time.time) - (localUtc - zone * 60) * 60 * 1000;
    }
    else {
        newTime = time;
    }
    newTime -= newTime % (60 * 1000);
    return newTime;
};
export function timeZone(milestones) {
    // eslint-disable-next-line no-empty
    const _milestones = milestones.map((item) => {
        var _a, _b, _c, _d, _e, _f;
        const _item = JSON.parse(JSON.stringify(item));
        if ((item === null || item === void 0 ? void 0 : item.est) && typeof (item === null || item === void 0 ? void 0 : item.est) === 'object') {
            _item.est = moment((_a = item === null || item === void 0 ? void 0 : item.est) === null || _a === void 0 ? void 0 : _a.time).utcOffset((_b = item === null || item === void 0 ? void 0 : item.est) === null || _b === void 0 ? void 0 : _b.zone);
        }
        if ((item === null || item === void 0 ? void 0 : item.act) && typeof (item === null || item === void 0 ? void 0 : item.act) === 'object') {
            _item.act = moment((_c = item === null || item === void 0 ? void 0 : item.act) === null || _c === void 0 ? void 0 : _c.time).utcOffset((_d = item === null || item === void 0 ? void 0 : item.act) === null || _d === void 0 ? void 0 : _d.zone);
        }
        if ((item === null || item === void 0 ? void 0 : item.cutoff) && typeof (item === null || item === void 0 ? void 0 : item.cutoff) === 'object') {
            _item.cutoff = moment((_e = item === null || item === void 0 ? void 0 : item.cutoff) === null || _e === void 0 ? void 0 : _e.time).utcOffset((_f = item === null || item === void 0 ? void 0 : item.cutoff) === null || _f === void 0 ? void 0 : _f.zone);
        }
        return _item;
    });
    return _milestones;
}
