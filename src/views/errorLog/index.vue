<template>
  <div class="errPage-container">
    <!-- $t is vue-i18n global function to translate lang -->
    <h3>{{$t('errorLog.tips')}}</h3>
    <code>
      {{$t('errorLog.description')}}
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/#/error?id=%e4%bb%a3%e7%a0%81">
        {{$t('errorLog.documentation')}}
      </a>
    </code>
    <div class="img">
      <img src='https://wpimg.wallstcn.com/360e4842-4db5-42d0-b078-f9a84a825546.gif'>
    </div>
  </div>
</template>

<script>
export default {
  name: 'errorLog',
  components: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {

    .img {

      img {
        width: 100%;
      }
    }
  }
</style>
