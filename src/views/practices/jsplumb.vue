<template>
  <div class="jsplumb-practice">
    <section class="page">
      <h1>bpmn-js Base</h1>
      <jsplumb-base class="jsplumb-base"></jsplumb-base>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  import jsplumbBase from '@/components/Jsplumb/base'

  export default{
    name: 'jsplumbPractice',

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
      jsplumbBase
    },

    methods: {

    },

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .jsplumb-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;
      h1 {
        margin-bottom: $appmain-padding;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .jsplumb-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .jsplumb-practice {

      section.page {

      }
    }
  }
</style>

<style rel="stylesheet" lang="scss">
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .jsplumb-practice {
    section.page {
      .jsplumb-base {
        position: relative;
        width: calc(100vw - #{$sidebar-width} - #{$appmain-padding * 4});
        height: 500px;
      }
    }
  }

  .hideSidebar {
    .jsplumb-practice {
      section.page {
        .jsplumb-base {
          width: calc(100vw - #{$sidebar-hide-width} - #{$appmain-padding * 4});
        }
      }
    }
  }
</style>
