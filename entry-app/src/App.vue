<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import loaderMixin from '@/loader-mixin';

import * as types from '@/store/types/login-types';
import Home from '@/views/home/';

export default {
  name: 'EntryApp',

  mixins: [loaderMixin],

  components: {
    Home,
  },

  created() {
    if (this.$route.name === 'login') return false;
    this.$store.dispatch(`${types.GET_LOGIN_INFO_REQUEST}`);
  },
};
</script>

<style lang="scss">
</style>
