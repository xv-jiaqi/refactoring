<template>
  <section class="slot">
    <svg-icon iconName="email" class="icon-email"></svg-icon>
    <el-button class="lang-btn" size="small">ENGLISH</el-button>
  </section>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
  .slot {
    flex: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .lang-btn {
    font-weight: bold;
    background-color: #fff;
    color: #0090c8;
    width: 80px;
    height: 30px;
    margin-right: 30px;
  }

  .icon-email {
    margin-right: 30px;
  }

  @media screen and (max-width: $screen-xs-max) {
    .slot {
      justify-content: left;
    }
  }
</style>