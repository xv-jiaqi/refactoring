<template>
  <gt-login :ds="dataSource" v-bind="config">
    <template slot="header">
      <header-bar></header-bar>
    </template>
    <template slot="footer">
      <footer-bar></footer-bar>
    </template>
  </gt-login>
</template>
<script>
import GtLogin from '@/components/gt-login/';
import FooterBar from './footer-bar';
import HeaderBar from './header-bar';
import * as types from '@/store/types/account-types';
import md5 from 'md5';

export default {
  components: {
    GtLogin,
    FooterBar,
    HeaderBar,
  },
  data() {
    return {
      dataSource: {
        login: this.login,
        getVcode: this.getVcode,
      },
      config: {
        register: false,
        dashboardImg: require('Assets/images/account/login_banner_pic.png'),
        vcode: true,
      },
    };
  },

  methods: {
    login(formData) {
      const {
        username,
        password,
        pid,
        code,
      } = formData;
      return this.$store.dispatch(types.LOGIN_REQUEST, {
        username,
        password: md5(`${password}${username}`),
        platform: 'cgtdesk',
        dog_info: {},
        pid,
        code,
      }).then(() => {
        this.$store.dispatch(types.GET_LOGIN_INFO_REQUEST);
        this.$router.push('/home');
      });
    },
    getVcode() {
      return this.$store.dispatch(types.GET_VCODE_REQUEST).then(res => ({
        pid: res.data.pid,
        img: res.data.img,
      }), () => {
        this.$message({
          message: '验证码服务暂时不可用',
          type: 'info',
        });
      });
    },
  },
};
</script>