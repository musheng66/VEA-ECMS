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
        // Cesium.BingMapsApi.defaultKey = 'AsarFiDvISunWhi137V7l5Bu80baB73npU98oTyjqKOb7NbrkiuBPZfDxgXTrGtQ'
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNTRkYzYyMi1jNWQ0LTQ5YTMtOWI2Yi1mYmVjZGMzNDZiMjQiLCJpZCI6NDY2NCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MTM5NDcwMH0.krxIfU86Ni50sGk7aqobc2LBP09yKNEG5hqK94ae8yA'
        console.log('cesium start ...')
        let viewer = new Cesium.Viewer('cesiumContainer')
        console.log(viewer, 'cesium created ...')

        let wyoming = viewer.entities.add({
          name : 'Wyoming',
          polygon : {
            hierarchy : Cesium.Cartesian3.fromDegreesArray([
              -109.080842,45.002073,
              -105.91517,45.002073,
              -104.058488,44.996596,
              -104.053011,43.002989,
              -104.053011,41.003906,
              -105.728954,40.998429,
              -107.919731,41.003906,
              -109.04798,40.998429,
              -111.047063,40.998429,
              -111.047063,42.000709,
              -111.047063,44.476286,
              -111.05254,45.002073]),
            height : 0,
            material : Cesium.Color.RED.withAlpha(0.5),
            outline : true,
            outlineColor : Cesium.Color.BLACK
          }
        })
        viewer.zoomTo(wyoming)

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
