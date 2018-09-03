<template>
  <div class="cesium-practice">
    <section class="page">
      <h1>Cesium</h1>
      <Cesium></Cesium>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  import Cesium from '@/components/Cesium'

  export default{
    name: 'cesiumPractice',

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
      Cesium
    },

    methods: {

    },

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .cesium-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;
      h1 {
        margin-bottom: $appmain-padding;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .cesium-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .cesium-practice {

      section.page {

      }
    }
  }
</style>
