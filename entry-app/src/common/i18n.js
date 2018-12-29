import VueI18n from 'vue-i18n';
import Vue from 'vue';

import zh from '@/assets/lang/zh';
import en from '@/assets/lang/en';

Vue.use(VueI18n);

const langMap = {
  'zh_CN': zh,
  'en_US': en,
};

const locationLang = (navigator.language in langMap)
  ? navigator.language
  : 'zh_CN';

const lang = sessionStorage.lang || locationLang;

sessionStorage.lang = lang;

export default new VueI18n({
  locale: lang,
  messages: langMap,
});
