<template>
  <div class="list">
    <section class="page">
      <div class="func-area">
        <el-button type="primary" class="" @click="toBugCalc('current')">新增统计</el-button>
        <el-button type="info" class="" style="display: none;" @click="toBugCalc('prev')">新增上月统计</el-button>
        <el-button type="warning" class="" style="display: none;" @click="toBugCalc('period')">按时间段统计</el-button>
      </div>
      <div class="table-area">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <div class="down-title">
                <h5>详细信息</h5>
              </div>
              <div class="down-table">
                <div class="flex-row">
                  <div class="flex-cell cell-1">人员名称</div>
                  <div class="flex-cell cell-2">总修改行数</div>
                  <div class="flex-cell cell-3">Bug数</div>
                  <div class="flex-cell cell-4">Bug率</div>
                  <div class="flex-cell cell-5">操作</div>
                </div>
                <div class="flex-row" v-for="(val, index) in props.row.statdata">
                  <div class="flex-cell cell-1">{{ val.cnname }}</div>
                  <div class="flex-cell cell-2">{{ val.tj_tln_sum }}</div>
                  <div class="flex-cell cell-3">
                    <el-input type="number" v-model="val.bug_num" placeholder="请输入Bug数"></el-input>
                  </div>
                  <div class="flex-cell cell-4 green">{{ bugCalc(val) }}</div>
                  <div class="flex-cell cell-5"><el-button type="success" size="small" @click="updatePersonBug(val)">更新</el-button></div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="addtime" label="统计时间" width="" :formatter="dateFormat"></el-table-column>
          <!--<el-table-column prop="tj_type" label="统计类型" width="" :formatter="typeFormat"></el-table-column>-->
          <el-table-column prop="" label="操作" width="275px">
            <template slot-scope="scope">
              <el-button @click="exportExcel(scope.row)" type="primary" size="small" plain>导出为 Excel 表</el-button>
              <el-button style="" @click="downloadLogs(scope.row)" type="warning" size="small" plain>统计日志下载</el-button>
            </template>
          </el-table-column>
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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import JSZip from 'jszip'

  export default {
    name: 'bugcalcList',

    data() {
      return {
        tableData: [],
        params: {
          page: 1,
          page_num: 10,
          total: 0,
          url_type: 1
        },
        loading: false,
        fullscreenLoading: false,
        fulltext: '',
      }
    },

    computed: {},

    created() {

      scrollTop();

      this.getBugCount();
    },

    mounted() {

    },

    props: {

    },

    watch: {

    },

    components: {

    },

    methods: {

      // 列表
      getBugCount() {
        let that = this;
        that.loading = true;
        that.$store.dispatch('GetProOperallCbuList', that.params).then(function (res) {
          try {
            if (res.data.result && res.data.result.length != 0) {
              that.tableData = res.data.result.listarr;
              that.params.total = Number(res.data.result.count);
            }
          } catch (e) { }
          that.loading = false;
        }, function (err) {
          that.loading = false;
        });
      },

      // 分页
      handleCurrentChange(val) {
        this.params.page = val;
        this.getBugCount();
      },

      // 时间格式化
      dateFormat(row, column) {
        let date = row.addtime;
        if (!date || date == '') {
          return "";
        }
        return dateConvert(Number(date) * 1000);
      },

      // 类型格式化
      typeFormat(row, column) {
        let tj_type = '';
        switch (row.tj_type) {
          case 'current':
            tj_type = '本月';
            break;
          case 'prev':
            tj_type = '上月';
            break;
          case 'period':
            tj_type = '时间段（' + row.starttime + ' 至 ' + row.endtime + '）';  // 按时间段统计
            break;
          default:
            break;
        }
        return tj_type;
      },

      // bug率计算
      bugCalc(row, column) {
        let sum = Number(row.tj_tln_sum) ? Number(row.tj_tln_sum) : 0;
        let bug = Number(row.bug_num) ? Number(row.bug_num) : 0;
        let percent = ((bug/sum) * 1000).toFixed(2);
        if (isNaN(percent) || percent.toString() === 'Infinity' || percent.toString() === '-Infinity') return '';
        return percent + '‰';
      },

      // 跳转到新增统计页面
      toBugCalc(type) {
        this.$router.push('/lines1000/bugcalc/calc/' + type);
      },

      // 导出为 Excel 表（查询服务器数据）
      exportExcel(row) {
        let that = this;
        that.fulltext = '正在生成 Excel，请稍候...';
        that.fullscreenLoading = true;
        let aoa = [];
        aoa.push(['人员名称', '总修改行数', 'bug数', 'bug率', '统计时间', '统计类型']); // 表头
        let tj_type = '';
        switch (row.tj_type) {
          case 'current':
            tj_type = '本月';
            break;
          case 'prev':
            tj_type = '上月';
            break;
          case 'period':
            tj_type = row.starttime + ' 至 ' + row.endtime;  // 按时间段统计
            break;
          default:
            break;
        }
        let addtime = '';
        if (row.addtime && row.addtime != '') {
          addtime = dateConvert(Number(row.addtime) * 1000);
        }
        that.$store.dispatch('GetProOperallCbuListForexcel', { addtime: row.addtime }).then(function (res) {
          // 循环放入数据
          for (let val of res.data.result) {
            let aoa_simple = [];
            aoa_simple.push(val.cnname);
            aoa_simple.push(val.tj_tln_sum);
            // bug 数量
            aoa_simple.push(val.bug_num);
            // 计算 bug 率
            let bug_calc = '';
            let sum = Number(val.tj_tln_sum) ? Number(val.tj_tln_sum) : 0;
            let bug = Number(val.bug_num) ? Number(val.bug_num) : 0;
            let percent = ((bug/sum) * 1000).toFixed(2);
            if (isNaN(percent) || percent.toString() === 'Infinity' || percent.toString() === '-Infinity') bug_calc = '∞';
            bug_calc = percent + '‰';
            aoa_simple.push(bug_calc);
            // 格式化时间
            aoa_simple.push(addtime);
            // 统计类型
            aoa_simple.push(tj_type);
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
          that.fullscreenLoading = false;
          try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout;
        }, function (err) {
          that.fullscreenLoading = false;
        });
      },

      // 下载日志
      downloadLogs(row) {
        let that = this;
        that.fulltext = '正在获取文件';
        that.fullscreenLoading = true;
        // 获取下载地址
        that.$store.dispatch('Forv4DownSummarizelog', {stataddtime: row.addtime}).then(function (res) {
          let urlData = res.data.result.listarr;
          let zip = new JSZip();
          let cache = {};
          let promises = [];
          try {
            // 获取文件并打包
            for(let item of urlData) {
              let promise = that.$store.dispatch('DownloadSummarizelog', { url: item.downurl });
              promise.then(function (value) {
                zip.file(item.type + '__' + item.filename, value, { binary: true }); // 逐个添加文件
                cache[item.filename] = value;
              }, function (err) {
                console.log(err)
              });
              promises.push(promise);
            }
          } catch (e) {
            console.log(e);
          }
          // 下载
          Promise.all(promises).then(function (valall) {
            zip.generateAsync({type:"blob"}).then(content => { // 生成二进制流
              FileSaver.saveAs(content, "统计日志.zip");  // 利用file-saver保存文件
            });
            that.fullscreenLoading = false;
          }, function (errall) {
            console.log(errall);
            that.fullscreenLoading = false;
          });
        }, function (err) {
          that.fullscreenLoading = false;
          that.$message({
            type: 'error',
            message: err.statusText
          });
        });
      },

      // 更新个人bug数量
      updatePersonBug(row) {
        let that = this;
        // 获取下载地址
        that.$store.dispatch('Forv4UpdProOperallCbu', { id: row.id, bug_num: row.bug_num }).then(function (res) {
          that.$message({
            type: 'success',
            message: res.data.message
          });
        }, function (err) { });
      },

    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../styles/variables";
  @import "../../../styles/mixin";

  .list {

    section.page {
      margin: 0 auto;
    }

    .func-area {
      padding-bottom: 15px;
    }

    .table-area {

      .down-title {
        border-bottom: 1px solid #ccc;
        text-align: center;
        padding-bottom: 15px;
      }

      .down-table {
        width: 100%;

        .flex-row {
          @include flex();
          @include flex-direction();
          @include justify-content();

          .flex-cell {
            padding: 10px;
            line-height: 40px;
          }

          .flex-cell.cell-1 { width: 150px; }
          .flex-cell.cell-2 { width: 150px; }
          .flex-cell.cell-3 { width: 220px; }
          .flex-cell.cell-4 { width: 150px; overflow-x: auto; }
          .flex-cell.cell-4.green { color: green; }
          .flex-cell.cell-5 { width: 120px; }

        }
      }

      .down-func {
        text-align: center;
        border-top: 1px solid #ccc;
        padding-top: 15px;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .list {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .list {

      section {

      }

      section.page {

      }
    }
  }
</style>
