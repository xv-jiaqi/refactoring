import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'zh_CN',
  messages: {
    'zh_CN': require('Assets/lang/zh'),
    'en_US': require('Assets/lang/en'),
  },
});
