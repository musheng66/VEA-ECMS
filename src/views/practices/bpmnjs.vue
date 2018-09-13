<template>
  <div class="bpmnjs-practice">
    <section class="page">
      <h1>bpmn-js Base</h1>
      <bpmnjs-base class="bpmnjs-base"></bpmnjs-base>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  import bpmnjsBase from '@/components/Bpmnjs/base'

  export default{
    name: 'bpmnjsPractice',

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
      bpmnjsBase
    },

    methods: {

    },

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .bpmnjs-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;
      h1 {
        margin-bottom: $appmain-padding;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .bpmnjs-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .bpmnjs-practice {

      section.page {

      }
    }
  }
</style>

<style rel="stylesheet" lang="scss">
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .bpmnjs-practice {
    section.page {
      .bpmnjs-base {
        position: relative;
        width: calc(100vw - #{$sidebar-width} - #{$appmain-padding * 4});
        height: 600px;
      }
    }
  }

  .hideSidebar {
    .bpmnjs-practice {
      section.page {
        .bpmnjs-base {
          width: calc(100vw - #{$sidebar-hide-width} - #{$appmain-padding * 4});
        }
      }
    }
  }
</style>
