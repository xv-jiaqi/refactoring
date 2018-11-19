<template>
  <div class="body">123</div>
  <gt-login :ds="dataSource" v-bind="config">
    <template slot="header">
      <Header></Header>
    </template>
    <template slot="footer">
      <Footer></Footer>
    </template>
  </gt-login>
</template>
<style lang="scss">
.body {
  border: 1px solid blue;
}
</style>
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
        this.config = {
          ...this.config,
          vcode: false,
        };
      });
    },
  },
};
</script>