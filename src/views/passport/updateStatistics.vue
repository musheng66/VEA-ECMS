<template>
  <div class="update-statistics">
    <section class="page">
      <div class="func-area">
        <el-select v-model="params.deviceType" placeholder="请选择机型">
          <el-option
            v-for="(item, index) in optionsType"
            :key="index"
            :label="item.type"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="params.sysVersion" placeholder="请选择系统版本">
          <el-option
            v-for="(item, index) in optionsVersion"
            :key="index"
            :label="item.version"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" class="func-btn" @click="search()" icon="el-icon-search">查询</el-button>
      </div>
      <div class="table-area">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column prop="type" label="设备类型" width=""></el-table-column>
          <el-table-column prop="version" label="系统版本" width=""></el-table-column>
          <el-table-column prop="rate" label="升级率" width=""></el-table-column>
          <el-table-column prop="rate_success" label="升级成功率" width=""></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="params.page"
          @current-change="handleCurrentChange"
          :total="params.total">
        </el-pagination>
      </div>

    </section>
  </div>
</template>

<script>
  import { scrollTop, dateConvert } from '@/utils/ebenUtils'

  export default{
    name: 'UpdateStatistics',

    data () {
      return {
        loading: false,
        params: {
          deviceType: '',
          sysVersion: '',
          page: 1,
          page_num: 10,
          total: 0,
        },
        optionsType: [],
        optionsVersion: [],
        tableData: []
      }
    },

    computed: {},

    created () {
      scrollTop();

      this.getDeviceType();
      this.getSysVersion();
      this.search();
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

      // 获取设备型号
      getDeviceType() {
        const that = this;
        that.$store.dispatch('GetDeviceType', {}).then(function(res) {
          try {
            that.optionsType = res.data.result;
          } catch (e) {
            console.log(e);
          }
        }).catch(() => { });
      },

      // 获取系统版本
      getSysVersion() {
        const that = this;
        that.$store.dispatch('GetSysVersion', {}).then(function(res) {
          try {
            that.optionsVersion = res.data.result;
          } catch (e) {
            console.log(e);
          }
        }).catch(() => { });
      },

      // 查询方法
      search() {
        const that = this;
        that.loading = true;
        that.$store.dispatch('StatisticsUpgrade', that.params).then(function(res) {
          try {
            that.tableData = res.data.result.listarr;
            that.params.total = Number(res.data.result.count);
          } catch (e) {
            console.log(e);
          }
          that.loading = false;
        }).catch(() => {
          that.loading = false;
        });
      },

      // 分页
      handleCurrentChange(val) {
        this.params.page = val;
        this.search();
      },

    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .update-statistics {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;

      .func-area {
        padding-bottom: 15px;

        .func-picker {
          margin-right: 15px;
        }

        .el-date-editor .el-range-separator {
          width: auto;
        }

        .func-btn {

        }

        .use-info {
          padding-top: 30px;

          ul li {
            line-height: 24px;
          }
        }
      }

    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .update-statistics {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .update-statistics {

      section {

      }

      section.page {

      }
    }
  }
</style>
