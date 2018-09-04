<template>
  <div class="mxgraph-practice">
    <section class="page">
      <h1>mxGraph</h1>
      <MxGraph></MxGraph>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  import MxGraph from '@/components/MxGraph'

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
      MxGraph
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
        position: absolute;
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
