<template>
  <div class="list">
    <section class="page">
      <div class="table-area">
        <el-table v-loading="loading" :data="tableData" border @sort-change="handleSortChange" style="width: 100%;">
          <el-table-column prop="id" label="路径ID" width="80"></el-table-column>
          <el-table-column prop="domainurl" label="域名地址" width=""></el-table-column>
          <el-table-column prop="physicalurl" label="物理地址" width=""></el-table-column>
          <el-table-column prop="dealtype" label="处理类型" width="" :formatter="typeFormat"></el-table-column>
          <el-table-column prop="addtime" label="添加时间" width="180" sortable="custom" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="updtime" label="更新时间" width="180" sortable="custom" :formatter="dateFormat"></el-table-column>
          <el-table-column fixed="right" label="操作" width="125">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="small" icon="el-icon-edit"></el-button>
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

  export default {
    name: 'StatUrlsList',

    data() {
      return {
        tableData: [],
        params: {
          page: 1,
          page_num: 10,
          total: 0,
          updsort: '',
          addsort: ''
        },
        loading: false,
      }
    },

    computed: {},

    created() {

      scrollTop();

      this.getList();
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
      getList() {
        let that = this;
        that.loading = true;
        that.$store.dispatch('GetProUrlList', that.params).then(function(res) {
          try {
            that.tableData = res.data.result.listarr;
            that.params.total = Number(res.data.result.count);
          } catch (e) { }
          that.loading = false;
        }, function (err) {
          that.loading = false;
        });
      },

      // 排序
      handleSortChange(column) {
        let order = '';
        this.params.addsort = '';
        this.params.updsort = '';
        if (column.order === 'ascending') order = 'asc';
        if (column.order === 'descending') order = 'desc';
        if (column.prop === 'addtime') this.params.addsort = order;
        if (column.prop === 'updtime') this.params.updsort = order;
        this.getList();
      },

      // 分页
      handleCurrentChange(val) {
        this.params.page = val;
        this.getList();
      },

      //时间格式化
      dateFormat(row, column) {
        let date = '';
        if (column.property === 'addtime') date = row.addtime;
        if (column.property === 'updtime') date = row.updtime;
        if (!date || date == '') {
          return '';
        }
        return dateConvert(Number(date) * 1000);
      },

      // 类型格式化
      typeFormat(row, column) {
        switch (String(row.dealtype)) {
          case '1':
            return '不统计';
          case '2':
            return '不统计第一版本';
          case '3':
            return '直接统计';
          default:
            return '';
        }
      },

      // 编辑
      handleEdit(row) {
        this.$router.push('/lines1000/staturls/edit/' + row.id);
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

      .func-area {
        padding-bottom: 15px;
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
