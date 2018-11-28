<template>
  <div class="header">
    <img class="logo-login" :src="logoSrc" alt="logo page">
    <div class="lang">
      <el-button class="lang-btn" size="small" @click="changeLangEvent">{{$t('lang.lang')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeLangEvent() {
      const langKeys = Object.keys(this.$i18n.messages);
      const currentLang = this.$i18n.locale;

      const nextLangIndex = langKeys.length - (langKeys.indexOf(currentLang) + 1);

      this.$i18n.locale = langKeys[nextLangIndex];
    },
  },
  computed: {
    logoSrc: function () {
      return require('Assets/images/home/logo_login.' + (this.$i18n.locale || 'zh_CN') + '.png');
    },
  },
};
</script>

<style lang="scss" scoped>
  .header {
    background-color: $white;
    display: flex;
    height: 65px;
    align-items: center;
    padding: 0 6vw;
  }

  .lang {
    flex: auto;
    text-align: right;
  }

  .lang-btn {
    background-color: $themeColor;
    color: $white;
    min-width: 7em;
  }

  .logo-login {
    height: 60%;
    min-width: 12em;
  }

  @media screen and (max-width: $screen-xs-max) {
    .logo-login {
      display: none;
    }
  }
</style>