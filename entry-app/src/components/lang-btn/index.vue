<template>
  <el-button class="lang-btn" size="small" @click="changeLangEvent">{{$t('lang')}}</el-button>
</template>

<script>
export default {
  methods: {
    changeLangEvent() {
      const langKeys = Object.keys(this.$i18n.messages);
      const currentLang = this.$i18n.locale;

      const nextLangIndex = langKeys.length - (langKeys.indexOf(currentLang) + 1);

      sessionStorage.lang = langKeys[nextLangIndex];

      this.$i18n.locale = langKeys[nextLangIndex];
    },
  },
};
</script>

<style lang="scss" scoped>
  .lang-btn {
    background-color: $themeColor;
    color: $white;
    width: 84px;
    height: 32px;
    font-weight: bold;
  }
</style>
