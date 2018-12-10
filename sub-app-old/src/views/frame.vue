<template>
  <div class="sub-app-old">
    <section class="frame">
      <iframe id="old-frame"
          style="width: 100vw; height: 100vh;"
          src='http://localhost:17081/colgate.html#/crowdManage/customCrowdPack/list?params={"page":1,"count":20}'
          frameborder="0">
      </iframe>
    </section>
  </div>
</template>

<script>
export default {
  name: 'frame',
};
</script>

<style scoped>
.frame {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
