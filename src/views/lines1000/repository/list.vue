<template>
  <div class="list">
    <section class="page">
      <div class="func-area">
        <el-button type="primary" class="" @click="addRepository()">新增代码库</el-button>
      </div>
      <div class="table-area">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="项目ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="项目名称"
            width="">
          </el-table-column>
          <el-table-column
            prop="url"
            label="项目地址"
            width="">
          </el-table-column>
          <el-table-column
            prop="urltype"
            label="地址类型"
            width="100"
            :formatter="typeFormat">
          </el-table-column>
          <el-table-column
            prop="addtime"
            label="添加时间"
            width="180"
            :formatter="dateFormat">
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
          @current-change="handleCurrentChange"
          :total="params.total">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
  import { scrollTop, dateConvert } from '@/utils/ebenUtils'
  import { repositoryQuery, repositoryDelete } from '@/api/lines1000'

  export default {
    name: 'RepositoryList',

    data () {
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

    created () {

      scrollTop();

      this.getRepository();

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

      addRepository() {
        this.$router.push('/lines1000/repository/add');
      },

      // 编辑
      handleEdit(row) {
        this.$router.push('/lines1000/repository/edit/' + row.id);
      },

      getRepository() {
        let that = this;
        that.loading = true;
        repositoryQuery(that.params).then(function (res) {
          try {
            that.tableData = res.data.result.listarr;
            that.params.total = Number(res.data.result.count);
          } catch (e) {
            console.log(e);
          }
          that.loading = false;
        }, function (err) {
          that.loading = false;
        });

      },

      handleCurrentChange(val) {
        this.params.page = val;
        this.getRepository();
      },

      //时间格式化
      dateFormat(row, column) {
        let date = row.addtime;
        if (!date || date == '') {
          return "";
        }
        return dateConvert(Number(date) * 1000);
      },

      // 地址类型格式化
      typeFormat(row, column) {
        switch (row.urltype) {
          case '1':
            return 'svn';
            break;
          case 1:
            return 'svn';
            break;
          case '2':
            return 'git';
            break;
          case 2:
            return 'git';
            break;
          default:
            return '';
        }
      },

      // 删除
      handleDelete(row) {
        let that = this;
        that.$confirm('此操作将删除该代码库, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          repositoryDelete({ id: row.id }).then(function (res) {
            if (res.data && res.data.status == 200) {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.getRepository();
            }
          });
        }).catch(() => {

        });
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
