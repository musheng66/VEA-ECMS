<template>
  <div class="mxgraph-base">
    <div id="mxgraphBaseContainer" class="mxgraph-outer"></div>
  </div>
</template>
<script>
  /* eslint-disable new-cap, no-new */
  import '@drawbotics/mxgraph/javascript/src/css/common.css'
  const mxgraph = require('@drawbotics/mxgraph')({
    mxLoadStylesheets: false,
    mxLoadResources: false
  })
  const {
    mxGraph,
    mxCompactTreeLayout,
    mxLayoutManager,
    mxCylinder,
    mxCellRenderer,
    mxConstants,
    mxEdgeStyle,
    mxGraphView,
    mxPoint,
    mxKeyHandler,
    mxEvent,
    mxUtils,
    mxClient
  } = mxgraph

  export default{
    name: 'mxgraphBase',
    data () {
      return {
        graph: null,
        data: {
          "vertex":
            {
              "id": "pl",
              "value":
                {
                  "name": "PL",
                  "text": "项目经理"
                },
              "x": "center",
              "y": 20,
              "width": 80,
              "height": 50,
              "children": [
                {
                  "id": "se",
                  "value":
                    {
                      "name": "SE",
                      "text": "开发"
                    },
                  "width": 80,
                  "height": 50,
                  "children": [
                    {
                      "id": "fe",
                      "value":
                        {
                          "name": "FE",
                          "text": "前端开发"
                        },
                      "width": 80,
                      "height": 50
                    },
                    {
                      "id": "mde",
                      "value":
                        {
                          "name": "MDE",
                          "text": "模块负责人"
                        },
                      "width": 80,
                      "height": 50,
                      "children": [
                        {
                          "id": "be",
                          "value":
                            {
                              "name": "BE",
                              "text": "后端开发"
                            },
                          "width": 80,
                          "height": 50
                        }]
                    },
                    {
                      "id": "dba",
                      "value":
                        {
                          "name": "DBA",
                          "text": "数据库开发"
                        },
                      "width": 80,
                      "height": 50
                    }]
                },
                {
                  "id": "bu",
                  "value":
                    {
                      "name": "BU",
                      "text": "需求负责人"
                    },
                  "width": 80,
                  "height": 50
                },
                {
                  "id": "tse",
                  "value":
                    {
                      "name": "TSE",
                      "text": "测试"
                    },
                  "width": 80,
                  "height": 50
                },
                {
                  "id": "us",
                  "value":
                    {
                      "name": "US",
                      "text": "用服"
                    },
                  "width": 80,
                  "height": 50
                },
                {
                  "id": "ui",
                  "value":
                    {
                      "name": "UI",
                      "text": "美工"
                    },
                  "width": 80,
                  "height": 50
                }]
            },
          "edge": [
            {
              "sourceId": "pl",
              "targetId": "bu"
            },
            {
              "sourceId": "pl",
              "targetId": "ui"
            },
            {
              "sourceId": "pl",
              "targetId": "se"
            },
            {
              "sourceId": "pl",
              "targetId": "tse"
            },
            {
              "sourceId": "pl",
              "targetId": "us"
            },
            {
              "sourceId": "se",
              "targetId": "fe"
            },
            {
              "sourceId": "se",
              "targetId": "mde"
            },
            {
              "sourceId": "se",
              "targetId": "dba"
            },
            {
              "sourceId": "mde",
              "targetId": "be"
            }]
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
        if (!mxClient.isBrowserSupported()) {
          //如果浏览器不支持，则显示错误信息
          alert('该浏览器不支持');
        }
        let graph = this.graph = new mxGraph(document.getElementById('mxgraphBaseContainer'))
        graph.keepEdgesInBackground = true
        graph.setAutoSizeCells(true)
        graph.setCellsSelectable(true)
        graph.setAllowDanglingEdges(true)
        graph.setPanning(true)
        graph.panningHandler.useLeftButtonForPanning = true
        new mxKeyHandler(graph)
        let style = graph.getStylesheet().getDefaultVertexStyle()
        style[mxConstants.STYLE_SHAPE] = 'treenode'
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'white'
        style[mxConstants.STYLE_SHADOW] = true
        style[mxConstants.STYLE_FONTFAMILY] = 'Helvetica,Arial'
        style[mxConstants.STYLE_FONTSIZE] = 14
        style = graph.getStylesheet().getDefaultEdgeStyle()
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom
        style[mxConstants.STYLE_ROUNDED] = true
        let layout = new mxCompactTreeLayout(graph, false)
        layout.useBoundingBox = false
        layout.edgeRouting = false
        layout.levelDistance = 35
        layout.nodeDistance = 25
        let layoutMgr = new mxLayoutManager(graph)
        layoutMgr.getLayout = function (cell) {
          if (cell.getChildCount() > 0) {
            return layout
          }
        }
        let toggleTooltip = (graph, display) => {
          let tooltipHandler = graph.tooltipHandler
          if (tooltipHandler != null) {
            let div = tooltipHandler.div
            if (div != null) {
              div.style.display = display ? 'block' : 'none'
            }
          }
        }
        graph.setTooltips(true)
        graph.getTooltipForCell = function (cell) {
          toggleTooltip(this, true)
          return cell.value.text
        }
        graph.getLabel = function (cell) {
          return cell.value.name
        }
        mxEvent.addListener(graph.container, 'mouseleave', mxUtils.bind(graph, function () {
          toggleTooltip(this)
        }))
        //单击事件
        graph.click = function (me) {
          let x = me.graphX;
          let y = me.graphY;
          let model = graph.getModel()
          let cell = graph.getCellAt(x, y)
          console.log(cell)
          if (model.isVertex(cell)) {
            alert("环节ID：" + cell.id)
          } else {
            return false;
          }
        }
        //添加双击事件
        // graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt) {
        //   let cell = evt.getProperty('cell');
        //   mxUtils.alert('Doubleclick: '+((cell != null) ? 'Cell' : 'Graph'));
        //   evt.consume();
        // });
        //删除选中Cell或者Edge
        let keyHandler = new mxKeyHandler(graph)
        keyHandler.bindKey(46, function (evt) {
          if (graph.isEnabled()) {
            graph.removeCells()
          }
        })
        this.resize()
      },
      resize () {
        let { vertex, edge } = this.data
        if (!vertex) {
          return
        }
        let graph = this.graph
        let getCell = id => graph.getModel().getCell(id)
        graph.getModel().clear()
        let parent = graph.getDefaultParent()
        graph.getModel().beginUpdate()
        try {
          let w = graph.container.offsetWidth
          let { id, value, x, y, width, height, children } = vertex
          graph.insertVertex(parent, id, value, x === 'center' ? (w - width) / 2 : x, y, width, height)
          let addVertex = children => {
            if (!children) {
              return
            }
            for (let cell of children) {
              let { id, value, width, height, children } = cell
              graph.insertVertex(parent, id, value, 0, 0, width, height)
              addVertex(children)
            }
          }
          addVertex(children)
          for (let cell of edge) {
            let { sourceId, targetId } = cell
            graph.insertEdge(parent, null, '', getCell(sourceId), getCell(targetId))
          }
        } finally {
          graph.getModel().endUpdate()
          graph.fit()
          graph.center()
        }
      }
    },
  }
  class TreeNodeShape extends mxCylinder {
    constructor (state) {
      super()
      this.state = state
    }
    redrawPath (path, x, y, w, h, isForeground) {
      let graph = this.state.view.graph
      let hasChildren = graph.model.getOutgoingEdges(this.state.cell).length > 0
      if (isForeground) {
        if (hasChildren) {
          path.moveTo(w / 2, h + this.segment)
          path.lineTo(w / 2, h)
          path.end()
        }
      } else {
        path.moveTo(0, 0)
        path.lineTo(w, 0)
        path.lineTo(w, h)
        path.lineTo(0, h)
        path.close()
      }
    }
  }
  TreeNodeShape.prototype.segment = 30
  mxCellRenderer.registerShape('treenode', TreeNodeShape)
  mxGraphView.prototype.updateFloatingTerminalPoint = function (edge, start, end, source) {
    let pt = null
    if (source) {
      pt = new mxPoint(start.x + start.width / 2,
        start.y + start.height + TreeNodeShape.prototype.segment * this.scale)
    } else {
      pt = new mxPoint(start.x + start.width / 2, start.y)
    }
    edge.setAbsoluteTerminalPoint(pt, source)
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .mxgraph-base {
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
