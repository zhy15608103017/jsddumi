let _debounceTimeout: any = null,
	_throttleRunning = false

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const debounce = (fn: Function, delay=500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn: Function, delay=500) => {
	if(_throttleRunning){
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
	    _throttleRunning = false;
	}, delay);
}
export const RegExpStr = {
    integer: /^[1-9][0-9]{0,29}$/,
    floatFour: /^([1-9][0-9]{0,29}(\.[0-9]{1,4})?|0\.(?!0+$)[0-9]{1,4})$/,
    // notChinese: /[\\u4E00-\\u9FFF]+/g
    notChinese: /[\u4e00-\u9fa5]/g,
    isEmail: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  };