<template>
  <div class="login-body">
    <slot name="header">
      <aside class="slot-header"></aside>
    </slot>
    <div class="login-wrap comm-flex-box">
      <div class="login-image">
        <img class="dashboard-img"
             v-if="dashboardImg"
             :src="dashboardImg"
             alt="dashboard img">
      </div>
      <div class="login-container">
        <div class="login-head comm-flex-box">
          <h4 class="login-title">欢迎使用高露洁受众管理平台！</h4>
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
                maxlength="4">
            </el-input>
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
    <slot name="footer">
      <aside class="slot-footer"></aside>
    </slot>
  </div>
</template>
<style lang="scss">
  @media screen and (max-width: $screen-sm-max) {
    .login-image {
      display: none;
    }
  }

  .login-body {
    background-color: $tertiary;
    height: 100vh;
    display: flex;
    flex-flow: column;
  }

  .login-wrap {
    flex: auto;
    padding: 0 6vw;
    display: flex;
  }

  .slot-header, .slot-footer {
    background-color: $white;
    height: 100px;
    border: 1px red solid;
  }

  .login-image {
    max-width: 40vw;
    margin-right: 6vw;
  }

  .dashboard-img {
    width: 100%;
  }

  .login-container {
    border-radius: 9px;
    width: 370px;
    height: 500px;
    background: $white;
    flex: none;
    box-shadow: -2px 2px 20px 5px rgba(0, 0, 0, 0.25);
  }

  .login-head {
    height: 100px;
    font-weight: $font-weight-bold;
    color: $primary;
  }

  .login-title {
    font-weight: $font-weight-bold;
    color: $primary;
  }

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
      font-size: $font-size-x-large;
    }
  }

  .verify-code {
  }
</style>
<script>
import ImageVerify from '../image-verify/index';

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