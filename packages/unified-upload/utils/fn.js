// 获取语言标识;
export function getLocale() {
    // support SSR
    const { g_langSeparator = '-', g_lang } = window;
    const lang = typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_locale') : '';
    const isNavigatorLanguageValid =
      typeof navigator !== 'undefined' && typeof navigator.language === 'string';
    const browserLang = isNavigatorLanguageValid
      ? navigator.language.split('-').join(g_langSeparator)
      : '';
    return lang || g_lang || browserLang;
  }
