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
  import { scrollTop, replaceAll } from '@/utils/ebenUtils'

  export default{
    name: 'PersonView',

    data () {
      let checkcnname = (rule, value, callback) => {
        let val = replaceAll(this.ruleForm.cnname, ' ', '');
        this.ruleForm.cnname = val;
        let params = {
          cnname: val,
          type: this.dotype
        };
        if (this.dotype == 'upd') params.uid = this.id;
        this.$store.dispatch('CcPouCnname', params).then(function (res) {
          if (!res.data.valid || res.data.valid == 'false') {
            callback(new Error(res.data.message));
          } else {
            callback();
          }
        }, function (err) {
          callback(new Error(err.message));
        });
      };
      let checkoperuname = (rule, value, callback) => {
        let val = replaceAll(this.ruleForm.oper_uname, ' ', '');
        this.ruleForm.oper_uname = val;
        let params = {
          oper_uname: val,
          type: this.dotype
        };
        if (this.dotype == 'upd') params.uid = this.id;
        this.$store.dispatch('CcPouName', params).then(function (res) {
          if (!res.data.valid || res.data.valid == 'false') {
            callback(new Error(res.data.message));
          } else {
            callback();
          }
        }, function (err) {
          callback(new Error(err.message));
        });
      };
      let checkaliasname = (rule, value, callback) => {
        let val = replaceAll(this.ruleForm.aliasname, ' ', '');
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
          this.$store.dispatch('CcPouAliasname', params).then(function (res) {
            if (!res.data.valid || res.data.valid == 'false') {
              callback(new Error(res.data.message));
            } else {
              callback();
            }
          }, function (err) {
            callback(new Error(err.message));
          });
        }
      };
      return {
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
              res = this.$store.dispatch('UpdProOperallUser', that.ruleForm);
            } else {
              res = this.$store.dispatch('AddProOperallUser', that.ruleForm);
            }
            res.then(function (value) {
              that.fullscreenLoading = false;
              if (value.data && value.data.status == 200) {
                that.$alert('操作成功，点击确定返回列表页', '提示信息', {
                  confirmButtonText: '确定',
                  callback: (action) => {
                    that.$router.push('/lines1000/person/list');
                  }
                });
              }
            }, function (err) {
              that.fullscreenLoading = false;
              console.log('Person Submit fail: ' + err);
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
        that.$store.dispatch('GetProOperallUserList', { page: 1, page_num: 10, id: that.id }).then(function (res) {
          that.fullscreenLoading = false;
          if (res.data && res.data.status == 200) {
            if (res.data.result.count != 0) {
              that.ruleForm = {
                id: res.data.result.listarr[0].id,
                oper_uname: res.data.result.listarr[0].name,
                aliasname: res.data.result.listarr[0].aliasname,
                cnname: res.data.result.listarr[0].cnname
              };
              // 保存一份原始数据以备重置
              that.orginData = {
                id: res.data.result.listarr[0].id,
                oper_uname: res.data.result.listarr[0].name,
                aliasname: res.data.result.listarr[0].aliasname,
                cnname: res.data.result.listarr[0].cnname
              };
            }
          }
        }, function (err) {
          that.fullscreenLoading = false;
          console.log('getPerson fail: ' + err);
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
