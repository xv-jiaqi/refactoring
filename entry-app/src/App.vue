<template>
  <div id="app">
    <router-view transition="fade" transition-mode="out-in" />
  </div>
</template>

<script>
import loaderMixin from '@/loader-mixin';

import * as types from '@/store/types/login-types';

export default {
  name: 'EntryApp',

  mixins: [loaderMixin],

  created() {
    if (this.$route.name === 'login') return false;
    this.$store.dispatch(`${types.GET_LOGIN_INFO_REQUEST}`);
  },
};
</script>

<style lang="scss">
</style>
