<template>
  <div @click='init' class="img-verify-box">
    <img class="verify-img" :src="imageSrc" alt="verify img">
  </div>
</template>
<script>
export default {
  data() {
    return {
      pid: '',
      imageSrc: '',
      getImageSrc: false, // status
    };
  },
  methods: {
    // init image
    init() {
      if (this.getImageSrc) return false;

      this.pid = '';
      this.getImageSrc = true;
      this.$DS.getVcode().then((res = {}) => {
        this.imageSrc = res.img || '';
        this.pid = res.pid || '';
        this.getImageSrc = false;

        this.$emit('pid-change', res.pid);
      }, (err) => {
        console.error('get image src error :', err);
        this.imageSrc = '';
        this.getImageSrc = false;
      });
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.img-verify-box {
  cursor: pointer;
  display: inline-block;
  width: 50%;
  height: 40px;
}
.verify-img {
  width: 100%;
  height: 100%;
  border: 1px $gray-300 solid;
  border-radius: 3px;
}
</style>
