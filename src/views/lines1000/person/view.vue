<template>
  <div class="view">
    <section class="page">
      <div class="form-area">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading.fullscreen.lock="fullscreenLoading">
          <el-form-item label="人员名称" prop="cnname">
            <el-input v-model="ruleForm.cnname"></el-input>
          </el-form-item>
          <el-form-item label="开发用名" prop="oper_uname">
            <el-input v-model="ruleForm.oper_uname" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="开发用别名" prop="aliasname">
            <el-input v-model="ruleForm.aliasname" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  import { repositoryQuery, repositoryAdd, repositoryEdit } from '@/api/lines1000'

  export default{
    name: 'RepositoryView',

    data () {
      let checkcnname = (rule, value, callback) => {
        let val = $utils.replaceAll(this.ruleForm.cnname, ' ', '');
        this.ruleForm.cnname = val;
        let params = {
          cnname: val,
          type: this.dotype
        };
        if (this.dotype == 'upd') params.uid = this.id;
        let promise = $apis.lines1000.ccPouCnname(params);
        promise.then(function (value) {
          if (!value.valid || value.valid == 'false') {
            callback(new Error(value.message));
          } else {
            callback();
          }
        }, function (err) {
          callback(new Error(err.statusText));
        });
      };
      let checkoperuname = (rule, value, callback) => {
        let val = $utils.replaceAll(this.ruleForm.oper_uname, ' ', '');
        this.ruleForm.oper_uname = val;
        let params = {
          oper_uname: val,
          type: this.dotype
        };
        if (this.dotype == 'upd') params.uid = this.id;
        let promise = $apis.lines1000.ccPouName(params);
        promise.then(function (value) {
          if (!value.valid || value.valid == 'false') {
            callback(new Error(value.message));
          } else {
            callback();
          }
        }, function (err) {
          callback(new Error(err.statusText));
        });
      };
      let checkaliasname = (rule, value, callback) => {
        let val = $utils.replaceAll(this.ruleForm.aliasname, ' ', '');
        this.ruleForm.aliasname = val;
        let params = {
          aliasname: val,
          type: this.dotype
        };
        if (this.dotype == 'upd') params.uid = this.id;
        // 为空不调用检查接口
        if (val == '') {
          callback();
        } else {
          let promise = $apis.lines1000.ccPouAliasname(params);
          promise.then(function (value) {
            if (!value.valid || value.valid == 'false') {
              callback(new Error(value.message));
            } else {
              callback();
            }
          }, function (err) {
            callback(new Error(err.statusText));
          });
        }
      };
      return {
        loginInfo: $auth.getLoginInfo(),
        ruleForm: {
          cnname: '',
          oper_uname: '',
          aliasname: ''
        },
        rules: {
          cnname: [
            { required: true, message: '请输入人员名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
            { validator: checkcnname, trigger: 'blur' }
          ],
          oper_uname: [
            { required: true, message: '请输入开发用名', trigger: 'blur' },
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' },
            { validator: checkoperuname, trigger: 'blur' }
          ],
          aliasname: [
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' },
            { validator: checkaliasname, trigger: 'blur' }
          ]
        },
        fullscreenLoading: false,
        id: this.$route.params.id,
        dotype: 'add',
        originData: {},
        disable: false
      }
    },

    computed: {
      isEdit() {
        return this.$route.meta.isEdit; // 根据meta判断
        // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
      }
    },

    created () {

      scrollTop();

      if (this.isEdit) {

        this.getPerson();

        this.disable = true;

        this.dotype = 'upd';
      }

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

      submitForm(formName) {
        let that = this;
        that.fullscreenLoading = true;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let res;
            if (that.isEdit) {
              res = $apis.lines1000.updProOperallUser(that.ruleForm);
            } else {
              res = $apis.lines1000.addProOperallUser(that.ruleForm);
            }
            res.then(function (value) {
              that.fullscreenLoading = false;
              if (value && value.status == 200) {
                that.$alert('操作成功，点击确定返回列表页', '提示信息', {
                    confirmButtonText: '确定',
                    callback: (action) => {
                    that.$router.push('/personManage/personList');
              }
              });
              } else {
                that.$message({
                  type: 'error',
                  message: value.message
                });
              }
            }, function (err) {
              that.fullscreenLoading = false;
              that.$message({
                type: 'error',
                message: err.statusText
              });
            });
          } else {
            that.fullscreenLoading = false;
        return false;
      }
      });
      },

      resetForm(formName) {
        if (this.isEdit) {
          this.ruleForm = this.orginData;
        } else {
          this.$refs[formName].resetFields();
        }

      },

      // 获取人员数据
      getPerson() {
        let that = this;
        that.fullscreenLoading = true;
        let res = $apis.lines1000.getProOperallUserList({ page: 1, page_num: 10, id: that.id });
        res.then(function (value) {
          that.fullscreenLoading = false;
          if (value && value.status == 200) {
            if (value.result.count != 0) {
              that.ruleForm = {
                id: value.result.listarr[0].id,
                oper_uname: value.result.listarr[0].name,
                aliasname: value.result.listarr[0].aliasname,
                cnname: value.result.listarr[0].cnname
              };
              // 保存一份原始数据以备重置
              that.orginData = {
                id: value.result.listarr[0].id,
                oper_uname: value.result.listarr[0].name,
                aliasname: value.result.listarr[0].aliasname,
                cnname: value.result.listarr[0].cnname
              };
            } else {
              that.$message({
                type: 'error',
                message: '未获取到数据'
              });
            }
          } else {
            that.$message({
              type: 'error',
              message: value.message
            });
          }
        }, function (err) {
          that.fullscreenLoading = false;
          that.$message({
            type: 'error',
            message: err.statusText
          });
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
