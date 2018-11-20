<template>
  <gt-login :ds="dataSource" v-bind="config">
    <template slot="header">
      <Header></Header>
    </template>
    <template slot="footer">
      <Footer></Footer>
    </template>
  </gt-login>
</template>
<script>
import GtLogin from '@/components/gt-login/index';
import Footer from './footer';
import Header from './header';
import * as types from '@/store/types/account-types';
import md5 from 'md5';

export default {
  components: {
    GtLogin,
    Footer,
    Header,
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
      return Promise.resolve({
        pid: '12',
        img: 'http://editerupload.eepw.com.c1n/201809/61001537857032.jpg',
      });
      // return this.$store.dispatch(types.GET_VCODE_REQUEST).then(res => ({
      //   pid: res.data.pid,
      //   img: res.data.img,
      // }), () => {
      //   this.$message({
      //     message: '验证码服务暂时不可用',
      //     type: 'info',
      //   });
      // });
    },
  },
};
</script>