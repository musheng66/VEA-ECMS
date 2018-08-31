<template>
  <div class="mxgraph-practice">
    <section class="page">
      <h1>mxGraph</h1>
      <div id="id-of-graph-container" class="mxgraph-outer"></div>
    </section>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/ebenUtils'

  let graph

  export default{
    name: 'mxGraphPractice',

    data () {
      return {

      }
    },

    computed: {},

    created () {
      scrollTop();

    },

    mounted () {
      this.initMxGraph();

    },

    props: {

    },

    watch: {

    },

    components: {

    },

    methods: {

      // 初始化mxgraph
      initMxGraph() {
        let container = document.getElementById('id-of-graph-container');
        if (!mxClient.isBrowserSupported()) {
          //如果浏览器不支持，则显示错误信息
          alert('该浏览器不支持');
          return;
        }
        var editorUiInit = EditorUi.prototype.init;

        EditorUi.prototype.init = function() {
          editorUiInit.apply(this, arguments);
          this.actions.get('export').setEnabled(false);

          // Updates action states which require a backend
          if (!Editor.useLocalStorage) {
            mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function(req) {
              var enabled = req.getStatus() != 404;
              this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
              this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
              this.actions.get('save').setEnabled(enabled);
              this.actions.get('saveAs').setEnabled(enabled);
              this.actions.get('export').setEnabled(enabled);
            }));
          }
        };
        // Adds required resources (disables loading of fallback properties, this can only
        // be used if we know that all keys are defined in the language specific file)
        mxResources.loadDefaultBundle = false;
        var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
          mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);
        // Fixes possible asynchronous requests
        mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function(xhr) {
          // Adds bundle text to resources
          mxResources.parse(xhr[0].getText());
          // Configures the default graph theme
          var themes = new Object();
          themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();
          // Main
          new EditorUi(new Editor(urlParams['chrome'] == '0', themes), container);
        }, function() {
          container.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
        });
      }
    },

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .mxgraph-practice {

    section.page {
      margin: 0 auto;
      padding: $appmain-padding;
      h1 {
        margin-bottom: $appmain-padding;
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .mxgraph-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .mxgraph-practice {

      section.page {

      }
    }
  }
</style>

<style rel="stylesheet" lang="scss">
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .mxgraph-practice {
    section.page {
      .mxgraph-outer {
        position: absolute;
        width: calc(100vw - #{$sidebar-width} - #{$appmain-padding * 4});
        height: 600px;
      }
    }
  }

  .hideSidebar {
    .mxgraph-practice {
      section.page {
        .mxgraph-outer {
          width: calc(100vw - #{$sidebar-hide-width} - #{$appmain-padding * 4});
        }
      }
    }
  }
</style>
