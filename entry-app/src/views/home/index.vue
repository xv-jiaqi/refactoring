<template>
  <el-container class="wrap-container">
    <nav-bar :logo-src="logoSrc" :drop-list="dropList" :username="username">
      <template slot="handle">
        <nav-handle></nav-handle>
      </template>
    </nav-bar>
    <el-container>
      <side-menu></side-menu>
      <el-main class="main-container">
        <router-view transition="fade" transition-mode="out-in"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import * as types from '@/store/types/login-types';
import SideMenu from './side-menu';
import NavBar from './nav-bar';
import NavHandle from './nav-handle';

export default {
  components: {
    SideMenu,
    NavBar,
    NavHandle,
  },
  data() {
    const dropList = [
      {
        key: 'userInfo',
        text: '个人信息',
        callback() {},
      },
      {
        key: 'changePwd',
        text: '修改密码',
        callback() {},
      },
      {
        key: 'logout',
        text: '退出账号',
        callback() {
          this.$store.dispatch(types.LOGOUT_REQUEST).finally(() => {
            this.$router.push({ name: 'login' });
          });
        },
      },
    ];

    return {
      isActive: false,
      dropList,
    };
  },
  computed: {
    username() {
      return this.$store.getters['userInfo'].username;
    },
    logoSrc() {
      // eslint-disable-next-line
        return require(`Assets/images/home/logo_page.${this.$i18n.locale}.png`);
    },
    mode() {
      return this.$route.name !== 'login';
    },
  },
  methods: {
    handleCommand(command) {
      if (typeof command === 'function') command.bind(this)();
    },
    dropdownIconChange(isActive) {
      this.isActive = isActive;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap-container {
  display: flex;
  flex-flow: column nowrap;
}

.main-container {
  border-bottom-left-radius: 5px;
  height: calc(100vh - 65px);
  position: relative;
}
</style>
