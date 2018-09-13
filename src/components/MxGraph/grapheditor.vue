<template>
  <div class="mxgraph">
    <div class="result">
      <p>data: {{ exportData.data }}</p>
      <p>format: {{ exportData.format }}</p>
    </div>
    <div id="mxgraphContainer" class="mxgraph-outer"></div>
  </div>
</template>
<script>
  // import EditorUi from './js/EditorUi'
  // import Graph from './js/Graph'
  // import Editor from './js/Editor'
  // import {
  //   mxClient,
  //   mxResources,
  //   mxUtils
  // } from './js/Common'

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

  // require('../../../static/mxgraph/deflate/pako.min.js')
  // require('../../../static/mxgraph/deflate/base64.js')
  // require('../../../static/mxgraph/jscolor/jscolor.js')
  // require('../../../static/mxgraph/sanitizer/sanitizer.min.js')
  // require('../../../static/mxgraph/js/Init.js')
  // require('../../../static/mxgraph/javascript/mxClient.js')
  // require('../../../static/mxgraph/js/EditorUi.js')
  // require('../../../static/mxgraph/js/Editor.js')
  // require('../../../static/mxgraph/js/Sidebar.js')
  // require('../../../static/mxgraph/js/Graph.js')
  // require('../../../static/mxgraph/js/Format.js')
  // require('../../../static/mxgraph/js/Shapes.js')
  // require('../../../static/mxgraph/js/Actions.js')
  // require('../../../static/mxgraph/js/Menus.js')
  // require('../../../static/mxgraph/js/Toolbar.js')
  // require('../../../static/mxgraph/js/Dialogs.js')

  export default{
    name: 'mxgraph',
    data () {
      return {
        exportData: {
          data: '',
          filename: '',
          format: ''
        },
        sidebarData: {
          generalPalette: [
            { style: 'rounded=0;whiteSpace=wrap;html=1;', width: 120, height: 60, value: '', title: 'Rectangle', showLabel: null, showTitle: null, tags: 'rect rectangle box' },
            { style: 'whiteSpace=wrap;html=1;aspect=fixed;', width: 80, height: 80, value: '', title: 'Square', showLabel: null, showTitle: null, tags: 'square'},
            { style: 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;', width: 40, height: 20, value: 'Text', title: 'Text', showLabel: null, showTitle: null, tags: 'text textbox textarea label' },
            {
              style: 'text;html=1;strokeColor=none;fillColor=none;spacing=5;spacingTop=-20;whiteSpace=wrap;overflow=hidden;rounded=0;',
              width: 190, height: 120,
              value: '<h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
              title: 'Textbox', showLabel: null, showTitle: null, tags: 'text textbox textarea'
            }
          ]
        }

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

        let _Vue = this;

        let container = document.getElementById('mxgraphContainer');
        if (!mxClient.isBrowserSupported()) {
          //如果浏览器不支持，则显示错误信息
          alert('该浏览器不支持');
          return;
        }

        var editorUiInit = EditorUi.prototype.init;

        EditorUi.prototype.init = function() {

          console.log(this, 'editorUiInit')

          editorUiInit.apply(this, arguments);
          this.actions.get('export').setEnabled(false);

          // Updates action states which require a backend
          if (!Editor.useLocalStorage) {
            mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function (req) {
              var enabled = req.getStatus() != 404;
              this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
              this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
              this.actions.get('save').setEnabled(enabled);
              this.actions.get('saveAs').setEnabled(enabled);
              this.actions.get('export').setEnabled(true);
            }));
          }

          // 导出为xml或svg格式
          ExportDialog.saveLocalFile = function (editorUi, data, filename, format) {
            _Vue.exportData = {
              data: data,
              filename: filename,
              format: format
            }
            return;
          }

        }
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

          // 获取左侧菜单数据
          container.sidebarData = _Vue.sidebarData

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
    overflow-x: hidden;
    .result {
      height: 100px;
      overflow-y: auto;
    }
    .mxgraph-outer {
      width: inherit;
      height: inherit;
      min-width: inherit;
      min-height: inherit;
    }
  }
</style>
