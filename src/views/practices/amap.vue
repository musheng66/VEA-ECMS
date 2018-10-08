<template>
  <div class="amap-practice">
    <section class="page">
      <h1 class="title">高德地图API：</h1>
      <div class="amap-wrapper">
        <el-amap class="amap-box" :vid="'amapContainer'" :amap-manager="amapManager" :events="events" :center="center"></el-amap>
      </div>
      <div class="btns">
        <el-button class="btn" type="success" @click="drawLines">绘制路线</el-button>
      </div>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  import Vue from 'vue'
  import VueAMap from 'vue-amap'
  import { AMapManager } from 'vue-amap'

  Vue.use(VueAMap)

  // 初始化高德地图的 key 和插件
  VueAMap.initAMapApiLoader({
    key: '14a31216b6783604966a072fb0b3c428',
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
    uiVersion: '1.0', // ui库版本，不配置不加载,
    v: '1.4.4'
  })

  let amapManager = new VueAMap.AMapManager()

  export default{
    name: 'AmapPractice',

    data () {
      return {
        input: '',
        sequence: '',
        center: [121.59996, 31.197646],
        amapManager,
        events: {
          init(o) {
            let marker = new AMap.Marker({
              position: [121.59996, 31.197646]
            })
            marker.setMap(o)
          }
        }
      }
    },

    computed: {},

    created () {
      scrollTop()

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

      drawLines () {
        let path2 = [
          [116.2929710000, 39.8230900000],
          [114.5147930000, 38.0422250000],
          [121.4736580000, 31.2303780000]
        ]
        let polyline2 = new AMap.Polyline({
          path: path2,            // 设置线覆盖物路径
          showDir:true,
          dirColor:'pink',
          strokeColor: '#336688',   // 线颜色
          strokeWeight: 10           // 线宽
        })
        let map = this.amapManager.getMap()
        map.add([polyline2])
        map.setFitView()
      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .amap-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;
      .title {
        padding: $appmain-padding 0;
      }
      .amap-wrapper {
        width: calc(100vw - #{$sidebar-width} - #{$appmain-padding * 4});
        height: 500px;
      }
      .btns {
        padding: $appmain-padding 0;
      }
    }
  }

  .hideSidebar {
    .amap-practice {
      section.page {
        .amap-wrapper {
          width: calc(100vw - #{$sidebar-hide-width} - #{$appmain-padding * 4});
        }
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .amap-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .amap-practice {

      section.page {

      }
    }
  }
</style>
