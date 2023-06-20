import SparkMD5 from 'spark-md5';
import JScookies from 'js-cookie';
import axios from 'axios';
import CryptoJS from 'crypto-js/crypto-js';
import { sort_ascii } from './utils';
import { mpApiUrl } from '@jusda-tools/url-config';
import { JUSDATOKEN } from '@jusda-tools/jusda-publicmethod';


const JSONbigString = require('json-bigint')({ storeAsString: true });
const urlencode = require('urlencode');

interface Params {
  objectName?: string;
  bucketName: string;
  file?: any;
  id?: number | string;
}

axios.defaults.transformResponse = [
  (data) => {
    if (data) {
      const res = JSONbigString.parse(data);
      return res;
    } else {
      return data;
    }
  },
];

// 根据传入文件获取md5
const getFileMd5 = (file: any, callback: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      spark.append((e as any).target.result); // Append array buffer
      const md5 = spark.end(); // 得到md5
      spark.destroy(); // 释放缓存
      callback(md5);
      resolve(md5);
    };
    reader.onerror = () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('oops, something went wrong.');
    };
  });
};
//获取接口地址
const getBaseUrl = (
    isJuslink: boolean,
    juslinkPath: string,
    noJuslinkPath: string
) => {
  if (!isJuslink) {
    //判断是否是juslink用户
    return noJuslinkPath;
  }

  if ((window as any).jusdaBaseConfig.isIntranet) {
    //是否内网
    return `${mpApiUrl}/oss-idc/${juslinkPath}`;
  }
  return `${mpApiUrl}/oss/${juslinkPath}`;
};
// 上传到文件服务
const fileUpload = (
    url: string,
    data: any,
    fileId: number | string,
    signFn: { clientId: any; authorization: string } | any,
    interior
) => {
  return axios
      .put(url, data)
      .then((response) => {
        if (response.status === 200) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          return notifyServer(fileId, signFn, interior);
        }
        return new Promise((resolve) => resolve({ success: false }));
      })
      .catch((error) => {
        console.log('文件上传失败1', error);
      });
};

// 上传成功通知服务端
const notifyServer = (
    fileId: number | string,
    signFn: { clientId: any; authorization: string } | any,
    interior
) => {
  const data = {
    id: fileId,
    status: 'COMPLETE',
  };
  const singObj = signFn('/oss/objects/upload-state', {}, data);
  const url = getBaseUrl(
      interior,
      'objects/upload-state',
      `${singObj.region}open-api/oss/objects/upload-state?clientId=${
          singObj.clientId
      }&timestamp=${singObj.timestamp}&sign=${!interior && singObj.sign}`
  );
  return axios
      .put(url, data, { headers: singObj?.headers })
      .then((response) => {
        if (response?.data?.success) {
          return new Promise((resolve) =>
              resolve({ success: true, data: { fileId } })
          );
        }
        return new Promise((resolve) =>
            resolve({ success: false, ...response.data, data: { fileId } })
        );
      })
      .catch((error) => {
        console.log('状态更新失败', error);
      });
};

// 调用服务接口,获取文件上传地址
const createFileUpload = (
    params: Params,
    md5: string,
    signFn: { clientId: any; authorization: string } | any,
    interior
) => {
  const data = {
    bucketName: params.bucketName,
    md5,
    objectName: params?.objectName,
  };
  const singObj = signFn('/oss/objects/upload-url', {}, data);
  const url = getBaseUrl(
      interior,
      'objects/upload-url',
      `${singObj.region}open-api/oss/objects/upload-url?clientId=${
          singObj.clientId
      }&timestamp=${singObj.timestamp}&sign=${!interior && singObj.sign}`
  );

  return axios.post(url, data, { headers: singObj?.headers }).then((res) => {
    if (res?.data?.success) {
      // 状态 = COMPLETE 说明文件md5重复，文件服务已经存在这个文件，直接返回文件id
      if (res?.data?.data?.status === 'COMPLETE') {
        return new Promise((resolve) =>
            resolve({ success: true, data: { fileId: res?.data?.data?.id } })
        );
      }
      return fileUpload(
          res?.data?.data?.url,
          params?.file,
          res?.data?.data?.id,
          signFn,
          interior
      );
    }
    return new Promise((resolve) => resolve(res?.data));
  });
};

// 调用服务接口,获取文件下载地址
const createFileDownload = (id: string, signFn: any, interior) => {
  const singObj = signFn(`/oss/objects/${id}/download-url`);
  const url = getBaseUrl(
      interior,
      `objects/${id}/download-url`,
      `${singObj.region}open-api/oss/objects/${id}/download-url?clientId=${
          singObj.clientId
      }&timestamp=${singObj.timestamp}&sign=${!interior && singObj.sign}`
  );
  return axios.get(url, { headers: singObj?.headers }).then((res) => {
    if (res?.data?.success) {
      // window.open(res?.data?.data);
      const downloadElement = document.createElement('a');
      downloadElement.href = res?.data?.data;
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      URL.revokeObjectURL(downloadElement.href); // 释放URL 对象
      document.body.removeChild(downloadElement); // 下载完成移除元素

      return new Promise((resolve) => resolve({ success: true }));
    }
    return new Promise((resolve) => resolve(res?.data));
  });
};

// 调用接口获取并返回一个永久有效的下载地址链接
const getImmutableFileUrl = (id: string, signFn: any, interior) => {
  const singObj = signFn(`/oss/objects/${id}/url`);
  const url = getBaseUrl(
      interior,
      `objects/${id}/url`,
      `${singObj.region}open-api/oss/objects/${id}/url?clientId=${
          singObj.clientId
      }&timestamp=${singObj.timestamp}&sign=${!interior && singObj.sign}`
  );
  return axios.get(url, { headers: singObj?.headers }).then((res) => {
    if (res?.data?.success) {
      return new Promise((resolve) =>
          resolve({ success: true, data: { url: res?.data?.data } })
      );
    }
    return new Promise((resolve) => resolve(res?.data));
  });
};

export class InitUpload {
  accessKeyId?: string;

  accessKeySecret?: string;

  bucketName?: string;

  region?: string;

  // 根据clientId和token判断是否内部使用true || false
  private interior: boolean =
      !!(window as any).jusdaBaseConfig?.clientId &&
      !!JScookies.get(JUSDATOKEN);

  constructor(obj: {
    accessKeyId?: string;
    accessKeySecret?: string;
    bucketName?: string;
    region?: string;
  }) {
    this.accessKeyId = obj?.accessKeyId;
    this.accessKeySecret = obj?.accessKeySecret;
    this.bucketName = obj?.bucketName;
    this.region = obj?.region;
  }

  /**
   * interfaceName: 签名时api的完整地址
   * queryParams： 接口上的query参数
   * postData: body参数
   */
  private getSign(interfaceName?: string, queryParams?: {}, postData?: {}) {
    const clientId = (window as any)?.jusdaBaseConfig?.clientId;
    if (this.interior) {
      // 内部调用
      return {
        sign: '',
        headers: {
          clientId,
          authorization: `Bearer ${JScookies.get(JUSDATOKEN)}`,
        },
      };
    } else {
      // 外部调用
      const timestamp = new Date().getTime();
      const signStr = CryptoJS.HmacSHA256(
          `${this.region}open-api${interfaceName}|${sort_ascii({
            ...queryParams,
            clientId: this.accessKeyId,
            timestamp: timestamp,
          })}${postData ? `|${JSON.stringify(postData)}` : ''}`,
          this.accessKeySecret
      );
      const hash = urlencode(CryptoJS.enc.Base64.stringify(signStr), 'utf-8');
      return {
        sign: hash,
        headers: {},
        region: this.region,
        clientId: this.accessKeyId,
        timestamp: timestamp,
      };
    }
  }

  initFileUploadFn(file: any, bucketName: string, objectName: string) {
    // @ts-ignore
    return getFileMd5(file, () => {}).then((result: string) => {
      if (result) {
        return createFileUpload(
            {
              bucketName: bucketName || this.bucketName,
              objectName,
              file,
            },
            result,
            this.getSign.bind(this),
            this.interior
        )
            .then((res) => {
              return new Promise((resolve) => resolve(res));
            })
            .catch((error: any) => {
              return new Promise((resolve, reject) => reject(error));
            });
      }
      return new Promise((resolve) =>
          resolve({ success: false, message: '文件md5转换错误' })
      );
    });
  }

  initFileDownloadFn(fileId: string) {
    return createFileDownload(fileId, this.getSign.bind(this), this.interior)
        .then((res) => {
          return new Promise((resolve) => resolve(res));
        })
        .catch((error: any) => {
          return new Promise((resolve, reject) => reject(error));
        });
  }

  getImmutableFileUrlFn(fileId: string) {
    return getImmutableFileUrl(fileId, this.getSign.bind(this), this.interior)
        .then((res) => {
          return new Promise((resolve) => resolve(res));
        })
        .catch((error: any) => {
          return new Promise((resolve, reject) => reject(error));
        });
  }
}
