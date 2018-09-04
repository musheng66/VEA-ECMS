<template>
  <div class="mxgraph">
    <div id="mxgraphContainer" class="mxgraph-outer"></div>
  </div>
</template>
<script>
  // Parses URL parameters. Supported parameters are:
  // - lang=xy: Specifies the language of the user interface.
  // - touch=1: Enables a touch-style user interface.
  // - storage=local: Enables HTML5 local storage.
  // - chrome=0: Chromeless mode.
  let urlParams = (function(url) {
    let result = new Object();
    let idx = url.lastIndexOf('?');
    if (idx > 0) {
      let params = url.substring(idx + 1).split('&');
      for (let i = 0; i < params.length; i++) {
        idx = params[i].indexOf('=');
        if (idx > 0) {
          result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
        }
      }
    }
    return result;
  })(window.location.href);
  // Default resources are included in grapheditor resources
  mxLoadResources = false;

  // import '../../../static/mxgraph/deflate/pako.min.js'
  // import '../../../static/mxgraph/deflate/base64.js'
  // import '../../../static/mxgraph/jscolor/jscolor.js'
  // import '../../../static/mxgraph/sanitizer/sanitizer.min.js'
  // import '../../../static/mxgraph/js/Init.js'
  // import '../../../static/mxgraph/javascript/mxClient.js'
  // import '../../../static/mxgraph/js/EditorUi.js'
  // import '../../../static/mxgraph/js/Editor.js'
  // import '../../../static/mxgraph/js/Sidebar.js'
  // import '../../../static/mxgraph/js/Graph.js'
  // import '../../../static/mxgraph/js/Format.js'
  // import '../../../static/mxgraph/js/Shapes.js'
  // import '../../../static/mxgraph/js/Actions.js'
  // import '../../../static/mxgraph/js/Menus.js'
  // import '../../../static/mxgraph/js/Toolbar.js'
  // import '../../../static/mxgraph/js/Dialogs.js'

  export default{
    name: 'mxgraph',
    data () {
      return {

      }
    },
    computed: {},
    created () {

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
        let container = document.getElementById('mxgraphContainer');
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
        let bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
          mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);
        // Fixes possible asynchronous requests
        mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function(xhr) {
          // Adds bundle text to resources
          mxResources.parse(xhr[0].getText());
          // Configures the default graph theme
          let themes = new Object();
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
<style rel="stylesheet">
  @import "../../../static/mxgraph/styles/grapheditor.css";
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .mxgraph {
    width: 100%;
    height: 100%;
    min-width: inherit;
    min-height: inherit;
    .mxgraph-outer {
      width: inherit;
      height: inherit;
      min-width: inherit;
      min-height: inherit;
    }
  }
</style>
