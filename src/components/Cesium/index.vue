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

  .cesium {
    width: 100%;
    height: 100%;
    min-width: inherit;
    min-height: inherit;
    .cesium-outer {
      width: inherit;
      height: inherit;
      min-width: inherit;
      min-height: inherit;
    }
  }
</style>
