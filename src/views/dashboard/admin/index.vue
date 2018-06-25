<template>
  <div class="dashboard-editor-container">
    <section class="page">
      <article>
        <h1>登录成功！</h1>
        <h2>{{ timeStr }}，{{ name }}</h2>
        <h5>登录时间： {{ loginTime }}</h5>
      </article>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Moment from 'moment'

  Moment.locale('zh-cn', {
    meridiem : function (hour, minute, isLowercase) {
      if (hour < 9) {
        return "早上";
      } else if (hour < 11 && minute < 30) {
        return "上午";
      } else if (hour < 13 && minute < 30) {
        return "中午";
      } else if (hour < 18) {
        return "下午";
      } else {
        return "晚上";
      }
    }
  });

  export default {
    name: 'dashboard-admin',
    components: {

    },
    data() {
      return {
        timeStr: ''
      }
    },
    created() {
      this.initTimeStr()
    },
    methods: {
      initTimeStr() {
        const time = Moment.localeData(this.loginTime);
        this.timeStr = time.meridiem(Moment(this.loginTime).hour(), Moment(this.loginTime, false).minute()) + '好';
      }
    },
    computed: {
      // 映射 getters
      ...mapGetters({
        name: 'name',
        loginTime: 'loginTime'
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {

    section.page {

      article {

        h1,h2,h3,h4,h5 {
          padding: 0 0 15px 0;
        }
      }
    }
  }
</style>
