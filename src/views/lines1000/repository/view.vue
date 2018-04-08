<template>
  <div class="view">
    <section class="page">
      <div class="form-area">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading.fullscreen.lock="fullscreenLoading">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="代码库类型" prop="urltype">
            <el-select v-model="ruleForm.urltype" placeholder="请选择代码库类型" :disabled="disable" @change="onSelectChange">
              <el-option label="svn" value="1"></el-option>
              <el-option label="git" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代码库地址" prop="url">
            <el-input v-model="ruleForm.url" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="代码库分支" prop="urlbranch" v-if="selectEnable">
            <el-input v-model="ruleForm.urlbranch" :disabled="disable"></el-input>
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
      return {
        ruleForm: {
          name: '',
          url: '',
          urltype: '',
          urlbranch: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          urltype: [
            { required: true, message: '请选择代码库类型', trigger: 'change' }
          ],
          url: [
            { required: true, message: '请输入代码库地址', trigger: 'blur' },
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
          ],
          urlbranch: [
            { required: true, message: '请输入代码库分支', trigger: 'blur' },
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
          ]
        },
        fullscreenLoading: false,
        pro_id: this.$route.params.id,
        originData: {},
        disable: false,
        selectEnable: false
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

        this.getRepository();

        this.disable = true;
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
              res = repositoryEdit(that.ruleForm);
            } else {
              res = repositoryAdd(that.ruleForm);
            }
            res.then(function (res) {
              that.fullscreenLoading = false;
              if (res.data && res.data.status == 200) {
                that.$alert('操作成功，点击确定返回列表页', '提示信息', {
                  confirmButtonText: '确定',
                  callback: (action) => {
                    that.$router.push('/lines1000/repositoryList');
                  }
                });
              }
            }, function (err) {
              that.fullscreenLoading = false;
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
          this.onSelectChange(this.orginData.urlbranch);
        } else {
          this.$refs[formName].resetFields();
          this.onSelectChange('');
        }

      },

      // 选择代码库类型的回调
      onSelectChange(val) {
        if (val) this.selectEnable = (val.toString() === '2');
      },

      // 获取代码库数据
      getRepository() {
        let that = this;
        that.fullscreenLoading = true;
        repositoryQuery({ page: 1, page_num: 10, pro_id: that.pro_id }).then(function (res) {
          that.fullscreenLoading = false;
          if (res.data && res.data.status == 200) {
            if (res.data.result.count != 0) {
              that.ruleForm = {
                id: res.data.result.listarr[0].id,
                name: res.data.result.listarr[0].name,
                url: res.data.result.listarr[0].url,
                urltype: res.data.result.listarr[0].urltype
              };
              that.ruleForm.urlbranch = res.data.result.listarr[0].urlbranch ? res.data.result.listarr[0].urlbranch : '';
              // 保存一份原始数据以备重置
              that.orginData = {
                id: res.data.result.listarr[0].id,
                name: res.data.result.listarr[0].name,
                url: res.data.result.listarr[0].url,
                urltype: res.data.result.listarr[0].urltype
              };
              that.orginData.urlbranch = res.data.result.listarr[0].urlbranch ? res.data.result.listarr[0].urlbranch : '';
              that.onSelectChange(res.data.result.listarr[0].urlbranch);
            }
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
