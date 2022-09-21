
// @ts-ignore
import zhCnConfig from './zh-cn/main.json';
// @ts-ignore
import enConfig from './en/main.json';
// @ts-ignore
import zhHkConfig from './zh-hk/main.json';

/**
 * 语言map
 */
const langMap = {
  'zh-hk': zhHkConfig,
  'zh-cn': zhCnConfig,
  en: enConfig,
};


export function tmpI18n(key: string, lang = 'en') {
  return langMap[lang][key] || '';
}
