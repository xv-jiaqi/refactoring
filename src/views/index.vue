<template>
  <router-view transition="fade" transition-mode="out-in"></router-view>
</template>
<script>
import * as types from '@/store/types/account-types';

export default {
  created() {
    console.log('index.vue');
    if (this.$route.name === 'login') return false;
    this.$store.dispatch(types.GET_LOGIN_INFO_REQUEST);
  },
};
</script>