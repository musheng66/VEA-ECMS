<template>
  <div class="cesium">
    <div id="cesiumContainer" class="cesium-outer"></div>
  </div>
</template>
<script>
  import Cesium from 'cesium/Cesium'
  import widgets from 'cesium/Widgets/widgets.css'
  export default{
    name: 'cesium',
    data () {
      return {

      }
    },
    computed: {},
    created () {

    },
    mounted () {
      this.initCesium();

    },
    props: {

    },
    watch: {

    },
    components: {

    },
    methods: {

      // 初始化cesium
      initCesium() {
        Cesium.BingMapsApi.defaultKey = 'AsarFiDvISunWhi137V7l5Bu80baB73npU98oTyjqKOb7NbrkiuBPZfDxgXTrGtQ'
        console.log('cesium start ...')
        let viewer = new Cesium.Viewer('cesiumContainer')
        console.log(viewer, 'cesium created ...')
      }
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
