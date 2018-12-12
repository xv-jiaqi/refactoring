<template>
  <section class="frame"></section>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'frame',

  mounted: function() {
    const frame = Vue.prototype.frame;
    frame.style.width = '100%';
    frame.style.height = '100%';
    this.$el.appendChild(frame);
  },
};
</script>

<style scoped>
.frame {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
