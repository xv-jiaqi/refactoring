import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'zh_CN',
  messages: {
    'zh_CN': require('../assets/lang/zh'),
    'en_US': require('../assets/lang/en'),
  },
});
