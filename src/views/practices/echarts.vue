<template>
  <div class="echarts-practice">
    <section class="page">
      <p>题目：</p>
      <p>仿购物车，选择商品后动态显示总价，提交后用echart展示商品购买情况。</p>
      <el-card :body-style="{ padding: '0px' }" v-for="val in list" :key="val.name">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <span>名称：{{ val.name }}</span>
            <span>价格：{{ val.price }} 元</span>
            <el-input-number v-model="val.count" :min="0" @change="handleChange"></el-input-number>
            <span>价格：{{ count(val) }}</span>
          </div>
        </div>
      </el-card>
      <p>总价：{{ total }}</p>
      <el-button type="primary" class="button" @click="sub">提交</el-button>
    </section>

    <section class="page">

      <div class="chart-area" v-loading="loadingTotal">
        <h5>购买情况</h5>
        <hr>
        <div class="charts" id="echart"></div>
      </div>

    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { scrollTop, dateConvert } from '@/utils/ebenUtils'
  import echarts from 'echarts'

  export default{
    name: 'EchartsPractice',

    data () {
      return {
        list: [
          {name: 'a商品', price: 10, count: 0},
          {name: 'b商品', price: 20, count: 0},
          {name: 'c商品', price: 30, count: 0},
        ],
        total: 0,
        loadingTotal: false,
        chartTotal: null,
        optionsTotal: {
          title: {
            text: '总数量'
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show : true,
            feature : {
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
            }
          },
          xAxis: {
            type : 'category',
            data: []
          },
          yAxis: [
            { type : 'value' }
          ],
          animation: {
            animationEasing: 'Linear'
          },
          series: [{
            name: '购买量',
            type: 'bar',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            markPoint : {
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            },
            data: []
          }]
        }
      }
    },

    computed: {
      // 映射 getters
      ...mapGetters({
        xAxisData: 'xAxis',
        seriesData: 'series'
      })
    },

    created () {
      scrollTop();
      //this.getTotal();
    },

    mounted () {
      this.initEchartsTotal();
    },

    props: {

    },

    watch: {

    },

    components: {

    },

    methods: {
      // 映射 actions
      ...mapActions({
        setData: 'SetEChartData'
      }),

      sub(){
        let xAxis = [];
        let series = [];
        for (let val of this.list) {
          xAxis.push(val.name);
          series.push(val.count);
        }
        // 调用 actions
        this.setData({ xAxis: xAxis, series: series });
        this.getTotal();
        this.setOptionsTotal();
      },
      count(val) {
        return Number(val.price) * Number(val.count);
      },
      handleChange() {
        let total = 0;
        for (let val of this.list) {
          total += Number(val.price) * Number(val.count);
        }
        this.total = total;
      },


      initEchartsTotal() {
        this.chartTotal = echarts.init(document.getElementById('echart'));
        this.setOptionsTotal();
      },
      setOptionsTotal() {
        this.chartTotal.setOption(this.optionsTotal);
      },

      // 获取数据
      getTotal() {
        this.optionsTotal.xAxis.data = this.xAxisData;
        this.optionsTotal.series[0].data = this.seriesData;
      },

    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .echarts-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;

      .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
      }

      .chart-area {

        .charts {
          width: 100%;
          height: 50vh;
          min-height: 200px;
        }
      }

    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .echarts-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .echarts-practice {

      section.page {

      }
    }
  }
</style>
