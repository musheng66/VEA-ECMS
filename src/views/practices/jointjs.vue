<template>
  <div class="jointjs-practice">
    <section class="page">
      <h1>jointjs</h1>
      <div id="id-of-jointjs-container"></div>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'
  import jointjs from 'jointjs'

  export default{
    name: 'jointjsPractice',

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
      this.initJointjs()
    },

    props: {

    },

    watch: {

    },

    components: {

    },

    methods: {

      // init
      initJointjs() {
        const joint = jointjs
        let graph = new joint.dia.Graph;

        let paper = new joint.dia.Paper({
          el: document.getElementById('id-of-jointjs-container'),
          width: '100%',
          height: 400,
          model: graph,
          gridSize: 1
        });

        let rect = new joint.shapes.basic.Rect({
          position: { x: 100, y: 30 },
          size: { width: 100, height: 30 },
          attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
        });

        let rect2 = rect.clone();
        rect2.translate(300);

        let link = new joint.dia.Link({
          source: { id: rect.id },
          target: { id: rect2.id }
        });

        graph.addCells([rect, rect2, link]);
      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .jointjs-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;

      #id-of-jointjs-container {
        width: 100%;
        height: 400px;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .jointjs-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .jointjs-practice {

      section.page {

      }
    }
  }
</style>
