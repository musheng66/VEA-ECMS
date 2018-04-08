<template>
  <div class="page-error">
    <div class="box">
      <div class="pic">
        <img src="../../assets/404_images/404.png" alt=""></div>
      <div class="info">
        <h1>404</h1>
        <h4>抱歉，该页面不存在</h4>
        <el-button type="primary" @click.native="back">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  data() {
    return {

    }
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .page-error {
    text-align: center;
    height: 100%;
    @include flex();
    @include flex-direction(column);
    @include justify-content();
    .box {
      @include flex(wrap);
      @include flex-direction();
      @include justify-content();
      .pic {
        padding: 15px;
        img {
          width: 157px;
        }
      }

      .info{
        padding: 15px;
        h1 {
          font-size: 64px;
        }
        h4 {
          font-size: 16px;
          margin-bottom: 20px;
        }
      }
    }

  }
</style>
