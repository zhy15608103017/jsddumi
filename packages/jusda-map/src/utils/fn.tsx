import moment from 'moment';
import { currentLanguage } from '@jusda-tools/language-control-panel';

export const timeFormat = (data: any, format = 'day') => {
  if (data && typeof data === 'number') {
    if (format === 'day') {
      return moment(data)?.format('YYYY-MM-DD');
    }
    return moment(data)?.format('YYYY-MM-DD HH:mm');
  }
  if (data && typeof data === 'object') {
    if (format === 'day') {
      return moment(data?.time)?.zone(data?.zone).format('YYYY-MM-DD');
    }
    return moment(data?.time)?.zone(data?.zone).format('YYYY-MM-DD HH:mm');
  }

};

export const getLocaleFn = () => {
  let lang = currentLanguage() || localStorage.getItem('umi_locale');
  if (lang) {
    return lang.indexOf('zh') >= 0 ? 'zh-CN' : 'en-US';
  }
  const bowserLang = (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage
  ).toLowerCase();
  // const currentLocale = lang || bowserLang;
  if (bowserLang.indexOf('zh') >= 0) {
    return 'zh-CN';
  } else {
    // 假如浏览器语言是其它语言,默认为英文
    return 'en-US';
  }
};

export function transportModeIcon() {
  const list = [
    {
      icon: 'icon-B_luyuncemian-',
      key: 'TPM_ROAD',
    },
    {
      icon: 'icon-B_haiyuncemian-',
      key: 'TPM_SEA',
    },
    {
      icon: 'icon-B_kongyuncemian-',
      key: 'TPM_AIR',
    },
    {
      icon: 'icon-B_tieyuncemian-',
      key: 'TPM_RAIL',
    },
    {
      icon: 'icon-B_yunshucemian-',
      key: 'TPM_EXPRESS',
    },
  ];
  return list;
}

// 秒数换算成小时和
export const toHourMinute = (time: number) => {
  return {
    hour: Math.floor((time % 86400) / 3600),
    minutes: Math.floor(((time % 86400) % 3600) % 60)
  };
};
export function showMetaDateTitle(defaultTitle: any, key: string, propertyList: Array<any>) {
  let metaData = propertyList?.find(item => item.propertyName === key)
  if (!metaData?.label) {
      return typeof defaultTitle == 'function' ? defaultTitle() : defaultTitle
  }
  return metaData.label
}