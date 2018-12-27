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
        <h4 class="login-title">{{$t('login.title')}}</h4>
        <el-form ref="loginForm" :model="formData" class="login-form">
          <el-form-item class="form-item">
            <el-input
                v-model="formData.username"
                :placeholder="$t('login.username')"
                prefix-icon="user-name-icon">
            </el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-input
                v-model="formData.password"
                :type="showPwd ? 'text' : 'password'"
                :placeholder="$t('login.password')"
                prefix-icon="user-pwd-icon"
                @click.native="togglePwdShow"
                :suffix-icon="showPwd ? 'hide-pwd-icon' : 'show-pwd-icon'">
            </el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-input
                v-model="formData.code"
                class="code-input"
                :placeholder="$t('login.verificationCode')"
                maxlength="4">
            </el-input>
            <image-verify class="verify-code" @pid-change="pidChange" :ds="dataSource"></image-verify>
          </el-form-item>
          <el-form-item class="form-item">
            <el-tooltip content="功能暂不开放">
              <el-checkbox v-model="formData.keeping" :disabled="true" title="功能暂不开放">{{$t('login.keeping')}}</el-checkbox>
            </el-tooltip>
          </el-form-item>
          <el-form-item class="form-item">
            <el-button v-btn-click="confirmLogin" type="primary" class="login-btn" :disabled="formInvalid">
              {{$t('login.submit')}}
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
<script>
import ImageVerify from '../image-verify/index';

export default {
  components: { ImageVerify },

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
        keeping: '',
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

      if (pid !== undefined) {
        return Boolean(!username || !password || !code);
      }

      return Boolean(!username || !password);
    },
  },

  methods: {
    pidChange(pid) {
      this.formData.pid = pid;
    },

    togglePwdShow(e) {
      const classList = Array.prototype.slice.call(e.target.classList);
      if (classList.includes('hide-pwd-icon')) {
        this.showPwd = false;
      }
      if (classList.indexOf('show-pwd-icon')) {
        this.showPwd = true;
      }
    },

    confirmLogin() {
      if (this.formInvalid) return false;
      // this.loading = true;
      return this.$DS.login(this.formData).then(
        () => {
          // this.loading = false;
        },
        (err) => {
          // this.loading = false;
          this.$notify.error({
            title: '错误',
            message: err || '登录失败',
          });
        },
      );
    },
  },
  created () {
    this.$addDS('mock', require('./ds/mock.js'));

    this.dataSource.getVcode = this.$DS.getVcode
  }
};
</script>
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
    margin-right: 8vw;
  }

  .dashboard-img {
    width: 100%;
  }

  .login-container {
    display: flex;
    flex-flow: column;
    flex: none;
    padding: 55px 34px;
    width: 380px;
    height: 500px;
    border-radius: 9px;
    background: $white;
    box-shadow: -2px 2px 20px 5px rgba(0, 0, 0, 0.25);
  }

  .login-title {
    font-weight: $font-weight-bold;
    color: $primary;
    text-align: center;
    word-break: break-all;
  }

  .login-form {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    flex: auto;
  }

  .form-item {
    &:first-child {
      margin-top: 40px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

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

  .code-input, .verify-code {
    width: 50%;
    vertical-align: middle;
  }

  .code-input {
    padding-right: 3px;
  }

  .verify-code {
    padding-left: 3px;
  }

  .login-btn {
    height: 55px;
    width: 100%;
    font-size: $font-size-x-large;
  }

  .el-checkbox__input,
  .el-checkbox__label {
    line-height: 0;
    vertical-align: middle;
  }
</style>
