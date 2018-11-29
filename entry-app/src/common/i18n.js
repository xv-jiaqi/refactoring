import VueI18n from 'vue-i18n';
import Vue from 'vue';

import zh from '@/assets/lang/zh';
import en from '@/assets/lang/en';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'zh_CN',
  messages: {
    zh_CN: zh,
    en_US: en,
  },
});
