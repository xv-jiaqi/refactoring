<template>
  <div class="header">
    <img class="logo-login" src="~Assets/images/account/logo_login.zh_CN.png" alt="logo page">
    <div class="lang">
      <el-button class="lang-btn" size="small">ENGLISH</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
};
</script>

<style lang="less" scoped>
  @import "~Style/variables";
  .header {
    background-color: @assistColorWhite;
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
    background-color: @themeColor;
    color: @assistColorWhite;
  }

  @media screen and (max-width: @screen-sm) {
    .logo-login {
      display: none;
    }
  }
</style>