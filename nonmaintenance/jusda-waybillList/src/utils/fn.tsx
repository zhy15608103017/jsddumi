import moment from 'moment';
export const timeFormat = (time: moment.MomentInput, format = 'day') => {
  if (format === 'day') {
    return moment(time)?.format('YYYY-MM-DD');
  }
  return moment(time)?.format('YYYY-MM-DD HH:mm');
};
export const checkInSource = (sourceArr: string[], includes: string): boolean => {
  if (sourceArr.includes(includes)) {
    return true;
  }
  return false;
};
export  const transitionTime = (time: string) => {
  const str = time?.toString();
  const num = str?.slice(0, str.length - 3);
  return num;
};