<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <lang-select class="international right-menu-item"></lang-select>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="https://github.com/musheng66/VEA-ECMS">
            <el-dropdown-item>
              {{$t('navbar.github')}}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../styles/variables";
  @import "../../../styles/mixin";

  #app .navbar {
    height: $navbar-height;
    line-height: $navbar-height;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: $navbar-height;
      float: left;
      padding: 0 10px;

      position: absolute;
      left: calc(#{$sidebar-width} - #{$sidebar-hide-width});
      background: #f5f7fa;
      @include transition-common(left, 0.28s);
    }
    .app-breadcrumb.el-breadcrumb {

    }

    .breadcrumb-container{
      float: left;
      width: calc(100vw - 10px - 40px - 160px - 66px);
      overflow: hidden;
      height: $navbar-height;
      white-space: nowrap;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      position: absolute;
      right: 0;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }

  #app .hideSidebar {
    .hamburger-container {
      position: relative;
      left: 0;
      background: none;
    }

    .app-breadcrumb.el-breadcrumb {

    }
  }

  @media (min-width: 768px) {

    #app {
      // 主体区域
      .main-container {
        margin-left: $sidebar-width;

        .hamburger-container {
          position: relative;
          left: 0;
          background: none;
        }
      }

      .hideSidebar {
        .sidebar-container,.sidebar-container .el-menu {
          width: $sidebar-hide-width!important;
          // overflow: inherit;
        }
        .main-container {
          margin-left: $sidebar-hide-width;
        }
      }
    }
  }
</style>
