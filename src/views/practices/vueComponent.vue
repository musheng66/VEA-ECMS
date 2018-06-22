<template>
  <div class="vuecomponent-practice">
    <section class="page">
      <p>题目：</p>
      <p>组件拖拽动态添加</p>

    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'

  export default{
    name: 'vueComponentPractice',

    data () {
      return {
        input: '',
        sequence: ''
      }
    },

    computed: {},

    created () {
      scrollTop();

    },

    mounted () {

    },

    props: {

    },

    watch: {

    },

    components: {

    },

    methods: {


    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .vuecomponent-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;

    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .vuecomponent-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .vuecomponent-practice {

      section.page {

      }
    }
  }
</style>
