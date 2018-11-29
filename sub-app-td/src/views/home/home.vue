<template>
  <el-container class="wrap-container">
    <nav-menu :logo-src="logoSrc"
              :drop-list="dropList"
              :username="username">
      <template slot="handle">
        <nav-handle></nav-handle>
      </template>
    </nav-menu>
    <el-container>
      <side-menu></side-menu>
      <el-main class="main-container">
        <router-view transition="fade" transition-mode="out-in"></router-view>
        <section>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import * as types from '@/store/types/account-types';
import SideMenu from './side-menu';
import NavMenu from './nav-menu';
import NavHandle from './nav-handle';

export default {
  components: {
    SideMenu,
    NavMenu,
    NavHandle,
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    const dropList = [
      {
        key: 'userInfo',
        text: '个人信息',
        callback() {},
      }, {
        key: 'changePwd',
        text: '修改密码',
        callback() {},
      }, {
        key: 'logout',
        text: '退出账号',
        callback() {
          this.$store.dispatch(types.LOGOUT_REQUEST)
            .finally(() => {
              this.$router.push({ name: 'login', });
            });
        },
      }
    ];

    return {
      tableData: Array(20).fill(item),

      isActive: false,

      dropList,
    };
  },
  computed: {
    username() {
      return this.$store.getters['td/userInfo'].username;
    },
    logoSrc() {
      // eslint-disable-next-line
      return require(`Assets/images/home/logo_page.${this.$i18n.locale}.png`);
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
  }
</style>