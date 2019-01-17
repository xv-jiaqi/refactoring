<template>
  <div id="app">
    <router-view name="login"></router-view>
    <Home v-if="mode"></Home>
  </div>
</template>

<script>
import * as types from '@/store/types/login-types';
import Home from '@/views/home/';

export default {
  name: 'EntryApp',

  components: {
    Home,
  },

  computed: {
    mode() {
      return this.$route.name !== 'login';
    },
    m() {
      return true;
    }
  },

  created() {
    if (this.$route.name === 'login') return false;
    this.$store.dispatch(`${types.GET_LOGIN_INFO_REQUEST}`);
  },
};
</script>

<style lang="scss"></style>
