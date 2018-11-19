<template>
  <section class="footer">
    <p class="copyright">©2018 [m]PLATFORM Mobile 京ICP备16022547号</p>
  </section>
</template>
<script>
export default {
  name: 'footer',
};
</script>
<style lang="less" scoped>
  @import "~Style/variables";
  .footer {
    height: 160px;
    background-color: @assistColorGray;
    text-align: center;
  }

  .copyright {
    height: 100px;
    background-color: @assistColorWhite;
    line-height: 100px;
    color: @assistColorDarkGray;
    font-size: @fontSizeNormal;
  }
</style>