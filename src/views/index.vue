<template>
  <router-view transition="fade" transition-mode="out-in"></router-view>
</template>
<script>
/* eslint-disable */
import * as types from '@/store/types/account-types.js'
export default {
  created() {
    console.log('index.vue');
    // this.$store.dispatch(types.GET_LOGIN_INFO_REQUEST)
  },
}
</script>

