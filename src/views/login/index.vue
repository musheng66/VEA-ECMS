<template>
  <div class="login-container">
    <div class="take-place"> </div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">{{$t('login.title')}}</h3>
      </div>
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="$t('login.usernamePlaceholder')">
          <svg-icon slot="prefix" icon-class="user_login" class="el-input__icon"/>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" :placeholder="$t('login.passwordPlaceholder')">
          <svg-icon slot="prefix" icon-class="user_password" class="el-input__icon"/>
          <i slot="suffix" class="el-icon-view el-input__icon" @click="showPwd()"></i>
        </el-input>
      </el-form-item>

      <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

    </el-form>
    <div class="footer-info">
      <p>{{$t('siteInfo.copyright')}}</p>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  components: {},
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度应大于 6 位'))
      } else {
        callback()
      }
    };

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false
        }
      })
    }
  },
  created() {

  },
  destroyed() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/variables";
  @import "../../styles/mixin";

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 48px;
      input {
        height: 48px;
        padding-left: 35px;
      }
      .el-input__prefix {
        padding: 0 10px;
        left: 0;

        .el-input__icon.svg-icon {
          height: 48px;
          width: 20px;
          vertical-align: middle;
        }
      }
      .el-input__suffix {

        .el-input__suffix-inner {

          .el-icon-view:before {
            line-height: 48px;
          }
        }

        .el-input__suffix-inner:hover {
          cursor: pointer;
        }
      }
    }

    .el-form-item {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 5px;
      color: $main-font-color;

      .el-form-item__content {
        min-width: 300px;
      }
    }
  }

  /* custom set */
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    @include flex();
    @include flex-direction(column);
    @include justify-content(space-between);
    background: #333;

    :after {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: url("../../assets/images/mainbg.jpg") center no-repeat;
      background-size: cover;
      @include filter-blur(5px);
    }

    .login-form {
      width: 420px;
      padding: 30px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      box-shadow: 1px 1px 5px #777;

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
          font-size: 20px;
        }
      }
      .title-container {
        position: relative;
        .title {
          margin: 15px auto 30px auto;
          text-align: center;
          color: #333;
        }
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }

      .login-btn {
        width: 100%;
        height: 44px;
        margin: 15px 0;
      }
    }

    .footer-info {
      color: $light_gray;
      text-align: center;
    }
  }
</style>
