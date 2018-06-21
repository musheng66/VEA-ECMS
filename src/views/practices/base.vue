<template>
  <div class="base-practice">
    <section class="page">
      <p>题目：</p>
      <p>将随机输入的一串数字按照每个数字出现的次数从少到多排序，如果次数相同再按照从小到大排列。</p>
      <p>如：输入13362225537，显示16755222333</p>
      <el-input type="text" v-model="input">
        <el-button slot="append" icon="el-icon-star-on" @click="reSequence" >Go</el-button>
      </el-input>
      <p>排序结果：{{ sequence }}</p>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'

  export default{
    name: 'BasePractice',

    data () {
      return {
        input: '',
        sequence: ''
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

      reSequence() {
        let arr = this.input.split('');
        let total = [];
        // 将输入内容分类处理，如：1:1，2:3，3:2
        for (let i = 0; i < arr.length; i++) {
          let json = { name: arr[i], num: 0 };
          for (let j = 0; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
              json.num = Number(json.num) + 1;
            }
          }
          let ishas = false;
          for (let a of total) {
            if (a.name === json.name) {
              ishas = true;
              break;
            }
          }
          if (!ishas) {
            total.push(json);
          }
        }
        // 排序出现次数
        total = total.sort(function (a, b) {
          if ((a.num - b.num) > 0) return 1;
          if ((a.num - b.num) < 0) return -1;
          if ((a.num - b.num) === 0) return Number(a.name) - Number(b.name);
        });

        // 拼接字符串
        let totalStr = '';
        for (let v of total) {
          for (let i = 1; i <= v.num; i++) {
            totalStr += v.name;
          }
        }

        this.sequence = totalStr;
      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .base-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;

    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .base-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .base-practice {

      section.page {

      }
    }
  }
</style>
