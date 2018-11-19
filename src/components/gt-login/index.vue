<template>
  <div class="login-body">
    <!-- <top-bar-menu></top-bar-menu> -->
    <slot name="header" class="header-slot"></slot>
    <div class="login-wrap">
      <img class="login-image"
        v-show="dashboardImg"
        :src="dashboardImg"
        alt="dashboard-img"
      >
      <div class="login-container">
        <img class="light light1"
             src="./images/login_light.png">
        <img class="light light2"
             src="./images/login_light.png">
        <img class="light light3"
             src="./images/login_light2.png">
        <img class="light light4"
             src="./images/login_light2.png">
        <div class="login-head">
          <h3 class="login-title">登录</h3>
          <span class="register-title" v-show="register" @click="registerEmit">立即注册</span>
          <span v-show="register">没有账号?</span>
        </div>
        <el-form ref="loginForm" :model="formData" class="login-form">
          <el-form-item>
            <el-input
              v-model="formData.username"
              placeholder="请输入用户名"
              prefix-icon="user-name-icon"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formData.password"
              :type="showPwd ? 'text' : 'password'"
              placeholder="请输入密码"
              prefix-icon="user-pwd-icon"
              @click.native="togglePwdShow"
              :suffix-icon="showPwd ? 'hide-pwd-icon' : 'show-pwd-icon'"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="vcode">
            <el-input
              v-model="formData.code"
              class="code-input"
              placeholder="验证码"
              maxlength="4"
            ></el-input>
            <image-verify @pid-change="pidChange" :ds="dataSource"></image-verify>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="confirmLogin" :disabled="loading || formInvalid">
              登&nbsp;&nbsp;录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import ImageVerify from '../image-verify/index.vue';

export default {
  components: { ImageVerify, },

  props: {
    vcode: {
      type: Boolean,
      default: () => true,
    },
    register: {
      type: Boolean,
      default: () => true,
    },
    dashboardImg: {
      type: String,
      default: () => null,
    },
  },

  data() {
    return {
      formData: {
        username: '',
        password: '',
        code: '',
        pid: '',
      },
      showPwd: false,
      loading: false,
      dataSource: {},
    };
  },

  computed: {
    formInvalid() {
      const {
        // eslint-disable-next-line
        username, password, code, pid,
      } = this.formData;

      if (!this.vcode) {
        return Boolean(!username || !password);
      }
      return Boolean(!username || !password || !code);
    },
  },

  methods: {
    registerEmit() {
      this.$emit('register-action');
    },

    pidChange(pid) {
      this.formData.pid = pid;
    },

    togglePwdShow(e) {
      const classList = Array.prototype.slice.call(e.target.classList);
      console.log(classList, 11);
      if (classList.indexOf('hide-pwd-icon') >= 0) {
        this.showPwd = false;
      }
      if (classList.indexOf('show-pwd-icon') >= 0) {
        this.showPwd = true;
      }
    },

    confirmLogin() {
      if (this.formInvalid) return false;
      this.loading = true;
      this.$DS.login(this.formData).then(
        () => {
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this.$notify.error({
            title: '错误',
            message: err || '登录失败',
          });
        }
      );
    },
  },

  created() {
    // eslint-disable-next-line
    this.$addDS('mock', require('./ds/mock.js'));

    this.dataSource.getVcode = this.$DS.getVcode;
  },
};
</script>
<style lang="less">
.login-body {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background: linear-gradient(90deg, #7bcff6, #3190e4);

  .header-slot {
    height: 65px;
    overflow: hidden;
  }

  .login-wrap {
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 14px;
    line-height: 1;

    // 左侧图像
    .login-image {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -500px;
      margin-top: -236px;
      width: 482px;
      height: 473px;
    }

    // 登录的盒子（包括几根亮线）
    .login-container {
      width: 341px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      position: absolute;
      z-index: 100;
      display: inline-block;
      top: 50%;
      margin-top: -162.5px;
      right: 50%;
      margin-right: -393px;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
      border: 0px solid rgba(255, 255, 255, 0.27);
      &.slide {
        margin-top: -200px;
      }
      .light {
        position: absolute;
        &.light1 {
          left: 0;
          top: 79px;
        }
        &.light2 {
          right: 0;
          top: 79px;
        }
        &.light3 {
          left: 84px;
          top: 0;
        }
        &.light4 {
          left: 84px;
          bottom: 0;
        }
      }
    }

    // 头部
    .login-head {
      zoom: 1;

      &::after {
        content: '';
        display: block;
        clear: both;
      }
      .login-title {
        font-size: 24px;
        float: left;
        margin: 22px 0 30px 35px;
      }
      .register-title {
        background: none;
        border: none;
        color: #ffffff;
        float: right;
        margin: 30px 22px 0 0;
        text-decoration: underline;
        cursor: pointer;
      }
      span {
        float: right;
        margin: 30px 0 0 0;
      }
    }

    // 登录表单
    .login-form {
      padding: 0 25px;

      .user-name-icon,
      .user-pwd-icon,
      .hide-pwd-icon,
      .show-pwd-icon {
        width: 16px;
        height: 16px;
        margin: 12px 6px;
        background-size: 100%;
        display: inline-block;
      }

      .el-input--prefix .el-input__inner {
        padding-left: 35px;
      }

      .user-name-icon {
        background-image: url('./images/user-name-icon.png');
      }

      .user-pwd-icon {
        background-image: url('./images/user-pwd-icon.png');
      }

      .show-pwd-icon {
        background-image: url('./images/show-pwd-icon.png');
        cursor: pointer;
      }

      .hide-pwd-icon {
        background-image: url('./images/hide-pwd-icon.png');
        cursor: pointer;
      }

      .code-input {
        width: 134px;
        margin-right: 21px;
      }

      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
