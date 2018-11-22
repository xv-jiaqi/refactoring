<template>
  <div id="app">
    <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>
<script>
import * as types from '@/store/types/account-types';

export default {
  name: 'app',
  created() {
    if (this.$route.name === 'login') return false;
    this.$store.dispatch(types.GET_LOGIN_INFO_REQUEST);
  },
};
</script>