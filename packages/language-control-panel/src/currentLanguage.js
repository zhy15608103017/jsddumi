import { CookieTools, JUSDA_LANGUAGE } from '@jusda-tools/jusda-publicmethod';

export default function currentLanguage() {
    const LANGS = ['en-US', 'zh-CN'];
    const cookieLang = new CookieTools().get(JUSDA_LANGUAGE);
    if(LANGS.includes(cookieLang)){
        return cookieLang;
    }
    const isNavigatorLanguageValid = typeof navigator !== 'undefined' && typeof navigator.language === 'string';
    if(isNavigatorLanguageValid){
        const [browserLangPrefix] = navigator.language.split('-');
        return browserLangPrefix === 'zh' ? 'zh-CN' : 'en-US';
    }
}
// the package done
