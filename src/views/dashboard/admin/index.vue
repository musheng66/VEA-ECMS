<template>
  <div class="dashboard-editor-container">
    <section class="page">
      <article>
        <h1>欢迎</h1>
        <h2>{{ username }}</h2>
        <h5>登录时间： {{ loginTime }}</h5>
      </article>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'dashboard-admin',
    components: {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      // 映射 getters
      ...mapGetters({
        username: 'name',
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
