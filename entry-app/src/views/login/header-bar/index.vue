<template>
  <div class="header">
    <img class="logo-login" :src="logoSrc" alt="logo page">
    <div class="lang">
      <lang-btn></lang-btn>
    </div>
  </div>
</template>

<script>
import LangBtn from '@/components/lang-btn/';

export default {
  components: {
    LangBtn,
  },
  computed: {
    logoSrc() {
      // eslint-disable-next-line
      return require(`Assets/images/home/logo_login.${this.$i18n.locale}.png`);
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

  .logo-login {
    height: 60%;
    min-width: 10em;
  }

  @media screen and (max-width: $screen-xs-max) {
    .logo-login {
      display: none;
    }
  }
</style>
