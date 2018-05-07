<template>
  <div class="active-export">
    <section class="page" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="fulltext">
      <div class="func-area">
        <el-date-picker
          class="func-picker"
          v-model="exportPickerValue"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary" class="func-btn" @click="exportResult()" icon="el-icon-download">导出激活设备列表</el-button>

        <div class="use-info">
          <h5>使用说明</h5>
          <hr>
          <ul>
            <li>1、设定需要导出的设备激活信息的时间段</li>
            <li>2、点击「导出激活设备列表」按钮，等待列表生成后自动下载</li>
            <li>补充：如果不选择时间段而直接进行导出操作，将会导出所有激活数据，由于激活信息数据量较大，可能导致客户端崩溃，故请尽量先选择时间段再行导出。</li>
          </ul>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
  import { scrollTop, dateConvert } from '@/utils/ebenUtils'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default{
    name: 'ActiveExport',

    data () {
      return {
        loading: false,
        exportParams: {
          authkey: 'ebenauthkeyforexcel2018_srtweddd',
          starttime: '',
          endtime: '',
          totalnum: 'all'
        },
        exportPickerValue: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近90天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '说明：左侧可进行日期快捷选择；右侧两栏可进行跨月日期选择，若不需跨月请在两栏左侧部分点选日期'
          }]
        },
        roleCheck: false,
        fullscreenLoading: false,
        fulltext: '正在生成 Excel，请稍候...',
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

    },

    methods: {

      // 导出方法
      exportResult () {
        let that = this;
        if (that.exportPickerValue == null || that.exportPickerValue.length == 0) {
//          that.$message({
//            type: 'error',
//            message: '请先选择要导出记录的时间段'
//          });
//          return;
        }
        that.exportParams.starttime = that.exportPickerValue[0];
        that.exportParams.endtime = that.exportPickerValue[1];
        that.fullscreenLoading = true;
        // 发送请求获取要导出的条目
        that.$store.dispatch('ExportActivateDevice', that.exportParams).then(function (res) {
          let aoa = [];
          aoa.push(['机身编号', '姓名', '用户昵称', '手机号', '机器类型', '邮箱', '首次激活时间', '最后激活时间', '地区', '余额', 'device', 'branch', 'uid', 'amounttype']); // 表头
          // 循环放入数据
          for (let val of res.data.result) {
            let aoa_simple = [];
            aoa_simple.push(val.serial_no ? val.serial_no : '');
            aoa_simple.push(val.truename ? val.truename : '');
            aoa_simple.push(val.nickname ? val.nickname : '');
            aoa_simple.push(val.mobile ? val.mobile : '');
            aoa_simple.push(val.devicetype ? val.devicetype : '');
            aoa_simple.push(val.email ? val.email : '');
            aoa_simple.push(val.created_at ? val.created_at : '');
            aoa_simple.push(val.updated_at ? val.updated_at : '');
            aoa_simple.push(val.area_name ? val.area_name : '');
            aoa_simple.push(val.amount ? val.amount : '');
            aoa_simple.push(val.device ? val.device : '');
            aoa_simple.push(val.branch ? val.branch : '');
            aoa_simple.push(val.uid ? val.uid : '');
            aoa_simple.push(val.amounttype ? val.amounttype : '');
            // 存入一条数据
            aoa.push(aoa_simple);
          }
          // 调用类库导出为 excel 文件
          let ws = XLSX.utils.aoa_to_sheet(aoa);
          let wb = XLSX.utils.book_new();
          wb.SheetNames.push('sheet1');
          wb.Sheets['sheet1'] = ws;
          /* get binary string as output */
          let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
          try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }

          that.fullscreenLoading = false;
          return wbout;
        }, function (err) {
          that.fullscreenLoading = false;
        });
      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .active-export {

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

    .active-export {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .active-export {

      section {

      }

      section.page {

      }
    }
  }
</style>
