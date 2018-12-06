<template>
  <section class="footer">
    <p class="copyright">{{$t('login.copyright')}}</p>
  </section>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
  .footer {
    height: 160px;
    background-color: $gray-100;
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
