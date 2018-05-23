<template>
  <div class="view">
    <section class="page">
      <div class="form-area">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading.fullscreen.lock="fullscreenLoading">
          <el-form-item label="域名地址" prop="domainurl">
            <el-input v-model="ruleForm.domainurl" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="物理地址" prop="physicalurl">
            <el-input v-model="ruleForm.physicalurl" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="代码库类型" prop="dealtype">
            <el-select v-model="ruleForm.dealtype" placeholder="请选择处理类型">
              <el-option label="不统计" value="1"></el-option>
              <el-option label="不统计第一版本" value="2"></el-option>
              <el-option label="直接统计" value="3"></el-option>
            </el-select>
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

  export default{
    name: 'StaturlsView',

    data () {
      return {
        ruleForm: {
          domainurl: '',
          physicalurl: '',
          dealtype: ''
        },
        rules: {
          domainurl: [
            { required: true, message: '请输入域名地址', trigger: 'blur' },
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
          ],
          physicalurl: [
            { required: true, message: '请输入物理地址', trigger: 'blur' },
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
          ],
          dealtype: [
            { required: true, message: '请选择处理类型', trigger: 'change' }
          ],
        },
        fullscreenLoading: false,
        prourl_id: this.$route.params.id,
        originData: {},
        disable: false,
        selectEnable: false,
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

        this.getData();

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

      // 获取统计路径数据
      getData() {
        let that = this;
        that.fullscreenLoading = true;
        that.$store.dispatch('GetProUrlList', { page: 1, page_num: 10, prourl_id: that.prourl_id }).then(function(res) {
          that.fullscreenLoading = false;
          if (res.data && res.data.status == 200) {
            if (res.data.result.count != 0) {
              that.ruleForm = {
                prourl_id: res.data.result.listarr[0].id,
                domainurl: res.data.result.listarr[0].domainurl,
                physicalurl: res.data.result.listarr[0].physicalurl,
                dealtype: String(res.data.result.listarr[0].dealtype),
              };
              // 保存一份原始数据以备重置
              that.originData = {
                prourl_id: res.data.result.listarr[0].id,
                domainurl: res.data.result.listarr[0].domainurl,
                physicalurl: res.data.result.listarr[0].physicalurl,
                dealtype: String(res.data.result.listarr[0].dealtype),
              };
            }
          }
        }, function (err) {
          that.fullscreenLoading = false;
        });
      },

      // 提交
      submitForm(formName) {
        let that = this;
        that.fullscreenLoading = true;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            if (that.prourl_id && that.prourl_id != '') {
              that.$store.dispatch('UpdProUrl', that.ruleForm).then(function(res) {
                that.fullscreenLoading = false;
                if (res.data && res.data.status == 200) {
                  that.$alert('操作成功，点击确定返回列表页', '提示信息', {
                    confirmButtonText: '确定',
                    callback: (action) => {
                      that.$router.push('/lines1000/statUrls/list');
                    }
                  });
                }
              }, function (err) {
                that.fullscreenLoading = false;
              });
            } else {
              that.fullscreenLoading = false;
            }
          } else {
            that.fullscreenLoading = false;
            return false;
          }
        });
      },

      // 重置表单
      resetForm(formName) {
        if (this.prourl_id && this.prourl_id != '') {
          this.ruleForm = {
            domainurl: this.originData.domainurl,
            physicalurl: this.originData.physicalurl,
            dealtype: this.originData.dealtype,
          };
        } else {
          this.$refs[formName].resetFields();
        }
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
