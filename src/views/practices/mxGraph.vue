<template>
  <div class="mxgraph-practice">
    <section class="page">
      <h1>mxGraph</h1>
      <!--<grapheditor></grapheditor>-->
    </section>
    <section class="page">
      <h1>mxGraph Base</h1>
      <graphbase></graphbase>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  // import grapheditor from '@/components/MxGraph/grapheditor'
  import graphbase from '@/components/MxGraph/base'

  export default{
    name: 'mxGraphPractice',

    data () {
      return {

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
      // grapheditor,
      graphbase
    },

    methods: {

    },

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .mxgraph-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;
      h1 {
        margin-bottom: $appmain-padding;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .mxgraph-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .mxgraph-practice {

      section.page {

      }
    }
  }
</style>

<style rel="stylesheet" lang="scss">
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .mxgraph-practice {
    section.page {
      .mxgraph-outer {
        position: relative;
        width: calc(100vw - #{$sidebar-width} - #{$appmain-padding * 4});
        height: 600px;
      }
    }
  }

  .hideSidebar {
    .mxgraph-practice {
      section.page {
        .mxgraph-outer {
          width: calc(100vw - #{$sidebar-hide-width} - #{$appmain-padding * 4});
        }
      }
    }
  }
</style>
