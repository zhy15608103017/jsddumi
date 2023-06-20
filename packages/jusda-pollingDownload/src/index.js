import request from "@jusda-tools/web-api-client";
import locales from "./locale/index.js";
import { params } from "./config";
import { mpApiUrl } from "@jusda-tools/url-config";

const getFileBlob = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
};

const saveAsFile = (blob, filename) => {
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href); // 释放URL 对象
};

const loadFileWithName = (file) => {
  getFileBlob(file.url).then((blob) => {
    saveAsFile(blob, file.name);
  });
};

const getBffUrl = () => {
  if (window.jusdaBaseConfig.isIntranet) {
    // 内网
    return "juslink-data-export-service-idc";
  }
  return "juslink-data-export-service";
};

const exportFn = (id, options = {}, downloadBaseUrl = "") => {
  const {
    localeKey = params.localeKey,
    locale,
    duration = 2000,
    shouldManualDownload = false,
    fileName,
  } = options;
  let defaultLocale = localStorage.getItem(localeKey) || "zh-CN";
  if (locale) {
    defaultLocale = locale;
  }
  const currentLocale = locales[defaultLocale];
  if (!id || !(typeof id == "string" || typeof id == "number")) {
    return Promise.reject(currentLocale?.wrongTaskId);
  }
  // 创建一个递归，在无限请求函数
  return new Promise((resolve) => {
    const fetchExport = (taskId) => {
      const domain =
        downloadBaseUrl ||
        mpApiUrl;
      const url = domain + `/${getBffUrl()}/v2/exportTask/${taskId}/downloadDetail`;

      request(url, {
        method: "get",
        errorHandler: (error) => {
          return Promise.reject(error);
        },
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            //请求成功
            if (data.status === "UPLOAD_COMPLETE" && data.address) {
              //手动处理下载数据
              if (shouldManualDownload) {
                resolve(res);
                return;
              }
              //自动下载并处理跨域下载修改文件名
              if (fileName) {
                loadFileWithName({ url: data.address, name: fileName });
                resolve(res);
                return;
              }
              //自动下载
              const elink = document.createElement("a");
              elink.style.display = "none";
              elink.href = data.address;
              elink.click();
              URL.revokeObjectURL(elink.href); // 释放URL 对象

              resolve(res);
            } else if (data.status !== "ERROR") {
              // 只要不为error 就再次请求
              setTimeout(() => {
                return fetchExport(taskId);
              }, duration);
            } else {
              resolve(res);
            }
          } else {
            resolve(res);
          }
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    };
    fetchExport(id);
  });
};

export default exportFn;
