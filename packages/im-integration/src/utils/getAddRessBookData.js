import request from '@jusda-tools/web-api-client';
import envConfig from '../envConfig.js';

// 获取通讯录列表
async function getAddRessBookFun() {
    if (!addRessBooK.getCallBackList() || addRessBooK.getCallBackList().size === 0) return;
    const { imApiUrl } = envConfig;
    const addressBookState = await request.get(`${imApiUrl}/addressBook`);
    const { success, errorCode } = addressBookState;
    if (success === true) {
        addRessBooK.setData(addressBookState.data);
    }
    if (['403'].includes(errorCode)) { // 403 清空timer
        clearTimeout(addRessBooK.getAddRessBookTimeOut);
    }
}

var fn = function (arr) {
    var addRessBookData = arr;
    var callBackList = new Map();

    return {
        addCallBack: function (callBack) {
            callBackList.set(callBack.key, callBack.fun);
            getAddRessBookFun();
            callBack.fun(addRessBookData);
        },
        removeCallBack: function (callBack) {
            callBackList.delete(callBack.key);
        },
        setData: function (data) {
            addRessBookData = data;
            for (let value of callBackList.values()) {
                value(addRessBookData);
            }
        },
        getData: function () {
            return addRessBookData;
        },
        getCallBackList: function () {
            return callBackList;
        },
    };
};


var addRessBookData = [];

var addRessBooK = fn(addRessBookData);

if (!addRessBooK.getAddRessBookTimeOut) {
    addRessBooK.getAddRessBookTimeOut = setInterval(getAddRessBookFun, 10000);
}

export default addRessBooK;
