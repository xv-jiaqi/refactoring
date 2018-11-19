<template>
  <div
    @click='init'
    class="img-verify-box"
  >
    <img class="verify-img" :src="imageSrc">
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
    // eslint-disable-next-line
    this.$addDS('mock', require('./ds/mock.js'));

    this.init();
  },
};
</script>
<style lang="less" scoped>
.img-verify-box {
  cursor: pointer;
  display: inline-block;
  width: 135px;
  height: 40px;
  vertical-align: top;
}
.verify-img {
  width: 100%;
  height: 100%;
}
</style>