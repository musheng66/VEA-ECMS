<template>
  <div class="view">
    <section class="page">
      <h4 class="title">
        <span v-if="calcType == 'current'">统计本月Bug率</span>
        <span v-if="calcType == 'prev'">统计上月Bug率</span>
        <span v-if="calcType == 'period'">按时间段统计Bug率</span>
        <el-tooltip placement="right">
          <div slot="content">
            统计方法：<br/>
            <br/>
            选中需要统计的人员，填写此人员出现的 Bug 数量，点击确认提交即可开始统计。<br/>
            由于运算量大，请务必确认要统计的人员选择和填写的 Bug 数量无误后再行提交。<br/>
            注意：如为按时间段统计方式则需要选择时间段后再进行提交。
          </div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </h4>
      <hr>
      <div class="datepicker-area" v-if="calcType == 'period'">
        <el-date-picker
          class="func-picker"
          v-model="statPickerValue"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <i>（请选择时间段）</i>
      </div>
      <div class="table-area" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="fulltext">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed=""
            prop="id"
            label="人员ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="cnname"
            label="人员名称"
            width="">
          </el-table-column>
          <el-table-column label="Bug数" width="">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row['bug_num']" placeholder="请输入Bug数"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="func-area">
        <el-button type="primary" class="" @click="bugSubmit()">确认提交</el-button>
      </div>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'

  export default{
    name: 'bugcalcView',

    data () {
      return {
        calcType: this.$route.params.type,
        tableData: [],
        multipleSelection: [],
        params: {
          page: 1,
          page_num: 100,
          total: 0,
        },
        loading: false,
        fullscreenLoading: false,
        fulltext: '正在统计，请稍候...',
        statPickerValue: '',
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
      }
    },

    computed: { },

    created () {

      scrollTop();

      this.getPersonList();

    },

    mounted () { },

    props: { },

    watch: { },

    components: { },

    methods: {

      // 获取人员
      getPersonList() {
        let that = this;
        that.loading = true;
        that.$store.dispatch('GetProOperallUserList', that.params).then(function (res) {
          try {
            that.tableData = res.data.result.listarr;
            that.params.total = Number(res.data.result.count);
          } catch (e) { }
          that.loading = false;
        });
      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 提交统计bug数
      bugSubmit() {
        let that = this;
        let blk = 0;
        let idbugnum = '';  // 拼接参数，id&&bugnum,
        if (that.multipleSelection.length <= 0) {
          that.$message({
            type: 'error',
            message: '请至少选择统计一位成员的 Bug 率'
          });
          return;
        }
        // 判断是否有未填写的bug数，拼接参数
        for (let row of that.multipleSelection) {
          if (!row.bug_num || row.bug_num == '') {
            blk += 1;
            break;
          }
          idbugnum += row.id + '&&' + row.bug_num + ',';
        }
        if (blk > 0) {
          that.$message({
            type: 'error',
            message: '请确认所有被选人员的 Bug 数量均已填写'
          });
          return;
        }
        if (idbugnum.endsWith(',')) idbugnum = idbugnum.substr(0, idbugnum.length - 1); // 切割最后一个,号
        let params = {
          compare_type: that.calcType,
          oper_uname: idbugnum
        };
        if (that.$route.params.type == 'period') {  // 判断为按时间段统计，获取时间段参数
          if (that.statPickerValue.length == 0) {
            that.$message({
              type: 'error',
              message: '当前为按时间段统计模式，请确认已选择时间段'
            });
            return;
          }
          params.starttime = that.statPickerValue[0];
          params.endtime = that.statPickerValue[1];
        }
        that.fullscreenLoading = true;
        // 提交
        that.$store.dispatch('Forv4Stat', params).then(function (res) {
          that.fullscreenLoading = false;
          if (res.data && res.data.status == 200) {
            that.$alert('操作成功，点击确定返回列表页', '提示信息', {
              confirmButtonText: '确定',
              callback: (action) => {
                that.$router.push('/lines1000/bugcalc/list');
              }
            });
          }
        }, function (err) {
          that.fullscreenLoading = false;
        });
      },

    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../styles/variables";
  @import "../../../styles/mixin";

  .view {

    section.page {
      margin: 0 auto;

      .title {

      }

      hr {
        margin: 15px 0;
      }

      .datepicker-area {
        padding: 0 0 15px 0;
      }

      .table-area {

      }

      .func-area {
        text-align: center;
        padding: 15px;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .view {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .view {

      section {

      }

      section.page {

      }
    }
  }
</style>
