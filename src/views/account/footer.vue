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
<style lang="scss" scoped>
  .footer {
    height: 160px;
    background-color: $gray-400;
    text-align: center;
  }

  .copyright {
    height: 100px;
    background-color: $white;
    line-height: 100px;
    color: $gray-800;
    font-size: $font-size-base;
  }
</style>