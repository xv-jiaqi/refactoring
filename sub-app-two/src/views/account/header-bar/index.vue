<template>
  <div class="header">
    <img class="logo-login" src="~Assets/images/home/logo_login.zh_CN.png" alt="logo page">
    <div class="lang">
      <el-button class="lang-btn" size="small">ENGLISH</el-button>
    </div>
  </div>
</template>

<script>
export default {

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
  }

  .logo-login {
    height: 60%;
  }

  @media screen and (max-width: $screen-xs-max) {
    .logo-login {
      display: none;
    }
  }
</style>