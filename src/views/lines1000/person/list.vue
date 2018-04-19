<template>
  <div class="list">
    <section class="page">
      <div class="func-area">
        <el-button type="primary" class="" @click="addPerson()">新增人员</el-button>
      </div>
      <div class="table-area">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          style="width: 100%;">
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
          <el-table-column
            prop="name"
            label="开发用名"
            width="">
          </el-table-column>
          <el-table-column
            prop="aliasname"
            label="开发用别名"
            width="">
          </el-table-column>
          <el-table-column
            label="当前状态"
            width="">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1 || scope.row.status === '1'" style="color: green;">使用中</span>
              <span v-if="scope.row.status === 2 || scope.row.status === '2'" style="color: red;">已删除</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="125">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="small" icon="el-icon-edit"></el-button>
              <el-button @click="handleDelete(scope.row)" type="danger" size="small" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="params.page"
          :page-size="params.page_num"
          @current-change="handleCurrentChange"
          :total="params.total">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
  import { scrollTop, dateConvert } from '@/utils/ebenUtils'
  import { getProOperallUserList, delProOperallUser } from '@/api/lines1000'

  export default {
    name: 'PersonList',

    data() {
      return {
        tableData: [],
        params: {
          page: 1,
          page_num: 10,
          total: 0,
        },
        loading: false,
      }
    },

    computed: {},

    created() {
      scrollTop();
      this.getPersonList();
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

      addPerson() {
        this.$router.push('/lines1000/person/add');
      },

      // 编辑
      handleEdit(row) {
        this.$router.push('/lines1000/person/edit/' + row.id);
      },

      getPersonList() {
        const that = this;
        that.loading = true;
        getProOperallUserList(that.params).then(function(res) {
          try {
            that.tableData = res.data.result.listarr;
            that.params.total = Number(res.data.result.count);
          } catch (e) {
            console.log(e);
          }
          that.loading = false;
        }).catch((error) => {
          console.log(error);
          that.loading = false;
        });
      },

      handleCurrentChange(val) {
        this.params.page = val;
        this.getPersonList();
      },

      // 状态类型格式化
      statusFormat(row, column) {
        switch (row.status) {
          case '1' || 1:
            return '使用中';
          case '2' || 2:
            return '已删除';
          default:
            return '';
        }
      },

      // 状态样式格式化
      styleFormat(row, column, rowIndex, columnIndex) {
        switch (row.status) {
          case '1' || 1:
            return 'color: green;';
          case '2' || 2:
            return 'color: red;';
          default:
            return '';
        }
      },

      // 删除
      handleDelete(row) {
        const that = this;
        that.$confirm('此操作将删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delProOperallUser({ id: row.id }).then(function(res) {
            if (res.data && res.data.status === 200) {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.getPersonList();
            }
          });
        }).catch(() => { });
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
