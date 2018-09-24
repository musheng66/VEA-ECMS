<template>
  <div class="vuecomponent-practice">
    <section class="page">
      <p>题目：组件拖拽动态添加到编辑区，可编辑属性</p>
      <div class="drag-demo">
        <!--左侧菜单-->
        <div class="left">
          <div class="title">组件</div>
          <div class="components">
            <div class="component" draggable="true" @dragstart="dragStart" data-name="Row"><svg-icon icon-class="drag"></svg-icon>栅格</div>
          </div>
        </div>
        <!--中部主编辑区-->
        <div class="center">
          <div class="title">预览</div>
          <div ref="preview" class="preview" @dragover="dragOver" @drop="drop">
            <div v-if="!item.parentId" :id="item.info.id" v-for="(item,index) in components"></div>
          </div>
          <div class="buttons">
            <el-button type="danger" icon="el-icon-delete" circle @click="clearAll"></el-button>
          </div>
        </div>
        <!--右侧属性-->
        <div class="right">
          <div class="title">属性</div>
          <div class="attributes">

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { scrollTop } from '@/utils/ebenUtils'
  import { mapActions, mapGetters } from 'vuex'
  import guid from '@/utils/guid'

  export default{
    name: 'vueComponentPractice',

    data () {
      return {
        insertPosition: {
          position: null,
          component: null
        },
      }
    },

    computed: {
      components: { //组件树 ，预览视图中所有组件
        get() {
          return this.$store.state.practices.components
        },
        set(components) {
          this.$store.commit('SET_COMPONENTS', components)
        }
      },
    },

    created () {
      scrollTop();
    },

    mounted () {

      // 获取本地存储的组件
      this.getComponents()
      // v-for就地复用原则导致了无法正常刷新视图，故采用先置空再赋值的方式
      let components1 = JSON.parse(JSON.stringify(this.components))
      if (this.$refs.preview) this.$refs.preview.innerHTML = ''
      this.components = []
      setTimeout(() => {
        this.components = components1
        this.mountPreview()
      }, 100)

      // 拖动放置位置的虚线框位置计算
      document.ondrag = e => {
        let {
          left,
          top
        } = this.$refs.preview.getBoundingClientRect()
        //鼠标在预览视图中的相对坐标
        let preview = this.$refs.preview
        let x = e.clientX - left,
          y = e.clientY - top + preview.scrollTop
        this.components.filter(component => !component.parentId).forEach(component => {
          /*
          let {
            offsetLeft,
            offsetTop,
            offsetRight,
            offsetBottom
          } = component.position
          let offset = 5
          //不在当前元素位置内
          if (!(x > offsetLeft && x < offsetRight && y > offsetTop && y < offsetBottom)) {
            return
          }
          //上方
          if (y > offsetTop && y < offsetTop + offset) {
            this.setPlaceholder('上方', component)
            return
          }
          //右方
          if (x < offsetRight && x > offsetRight - offset) {
            this.setPlaceholder('右方', component)
            return
          }
          //下方
          if (y < offsetBottom && y > offsetBottom - offset) {
            this.setPlaceholder('下方', component)
            return
          }
          //左方
          if (x > offsetLeft && x < offsetLeft + offset) {
            this.setPlaceholder('左方', component)
            return
          }
          */
        })
      }

      // 由于启用drag后的元素无法获取到mouseup事件，所以监听body的拖拽事件，以便在鼠标松开后，删除虚线框占位元素
      document.body.ondragover = e => {
        // console.log(e, 'on drag over')
        e.preventDefault()
      }

      document.body.ondrop = e => {
        // console.log(e, 'on drop')
        this.removePlaceholder()
        e.preventDefault()
      }
    },

    props: {

    },

    watch: {

    },

    components: {

    },

    methods: {
      // 映射 actions
      ...mapActions({
        setComponents: 'setComponents',
        getComponents: 'getComponents'
      }),

      dragStart (e) {
        let componentName = e.target.getAttribute('data-name')
        let info = {
          name: componentName
        }
        e.dataTransfer.setData('info', JSON.stringify(info))
        // console.log(e, 'drag')
      },

      dragOver (e) {
        e.preventDefault()
        // console.log(e, 'drag over')
      },

      drop (e) {
        // console.log(e, 'drop')
        let isNest = e.target.className.indexOf('preview') === -1 && e.target.id !== 'placeholder'
        let info = JSON.parse(e.dataTransfer.getData('info'))
        info.id = guid()
        if (isNest) {

        } else {
          let template = '<el-row :gutter="10" data-component-active tabIndex="0">' +
            '  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" data-component-active tabIndex="0" style="height: 100px;">栅格col 1</el-col>' +
            '  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" data-component-active tabIndex="0" style="height: 100px;">栅格col 2</el-col>' +
            '  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" data-component-active tabIndex="0" style="height: 100px;">栅格col 3</el-col>' +
            '  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" data-component-active tabIndex="0" style="height: 100px;">栅格col 4</el-col>' +
            '</el-row>'
          let component = {
            info: info,
            template: template
          }
          this.components.push(component)
          this.mountPreview()
        }
      },

      clearAll () {
        this.components = []
        if (this.$refs.preview) this.$refs.preview.innerHTML = ''
        setTimeout(() => {
          this.mountPreview()
        }, 100)
      },

      removePlaceholder () {
        let placeholder = document.getElementById('placeholder')
        if (placeholder)
          placeholder.parentElement.removeChild(placeholder)
      },

      setPlaceholder (position, component) {
        //添加前删除
        this.removePlaceholder()
        //创建添加元素
        let placeholder = document.createElement('div')
        placeholder.id = 'placeholder'
        //当前悬停的组件元素
        let el = document.getElementById(component.info.id)
        switch (position) {
          case '上方':
            this.$refs.preview.insertBefore(placeholder, el)
            break
          case '右方':
            placeholder.classList.add('inline')
            this.$refs.preview.insertBefore(placeholder, el.nextSibling)
            break
          case '下方':
            this.$refs.preview.insertBefore(placeholder, el.nextSibling)
            break
          case '左方':
            placeholder.classList.add('inline')
            this.$refs.preview.insertBefore(placeholder, el)
            break
        }
        this.insertPosition = {
          position,
          component
        }
      },

      freshPreview () {
        /*
        当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “就地复用” 策略。
        如果数据项的顺序被改变，Vue将不是移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素。
        出于此，每次components顺序变动后，只好使用清空再重新渲染的方式，否则不能成功渲染更新
         */
        let components = JSON.parse(JSON.stringify(this.components))
        this.components = []
        this.$refs.preview.innerHTML = ''

        // settimeout会等到dom重绘完成后在执行fn
        setTimeout(() => {
          this.components = components
          this.mount()
        }, 0)
      },

      mountPreview () {
        //挂载及更新视图中组件的位置信息
        let components = JSON.parse(JSON.stringify(this.components))
        components.filter(component => !component.parentId).forEach(component => {
          this.mount(component.info.id, component).then(vm => {
            // let el = document.getElementById(component.info.id)
            // component.position = {
            //   offsetLeft: el.offsetLeft,
            //   offsetRight: el.offsetLeft + el.clientWidth,
            //   offsetTop: el.offsetTop,
            //   offsetBottom: el.offsetTop + el.clientHeight
            // }
          })
        })
        setTimeout(() => {
          this.components = components
        }, 0)
      },

      //给定模板，和要挂载的元素id，挂载组件
      mount (id, _component) {
        let components = this.components
        let component = components.find(c => c.info.id === id)
        return new Promise((resolve, reject) => {
          //需要延迟才能取到document.getElementById(id)
          setTimeout(() => {
            let data={}
            if (_component.attributes) {
              Object.keys(_component.attributes).forEach(key => {
                data[key] = _component.attributes[key].value
              })
            }
            if (component.uid) { } // 销毁旧实例
            let vm = new Vue({
              name: id.toString(),
              data() {
                return data
              },
              template: _component.template,
              el: document.getElementById(id),
              mounted() {
                this.$el.id = id
                if (component) {
                  component.uid = this._uid
                }
                //添加选中效果
                // let info = this.currentComponent.info
                // if (!info) this.$el.click()
              }
            })
            resolve(vm)
          }, 200)
        })
      },

    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .vuecomponent-practice {
    height: 100%;
    section.page {
      height: inherit;
      margin: 0 auto;
      padding: $appmain-padding;
      p {
        margin: 0;
        height: rem(20px);
        line-height: rem(20px);
      }
      .drag-demo {
        height: calc(100% - #{rem(20px)});
        @include flex(nowrap);
        .left {
          width: rem(200px);
          background: #89a9b7;
          .components {
            .component {
              width: rem(60px);
              height: rem(60px);
            }
          }
        }
        .center {
          flex: 1;
          background: #e9ecf3;
          .preview {
            height: calc(100% - #{rem(34px)} - #{rem(51px)});
            padding: $appmain-padding;
            overflow-y: auto;
            border: 1px solid #6fa2ff;
            box-shadow: 1px 1px 2px #cecece;
          }
          .buttons {
            height: rem(51px);
            padding: rem(15px) 0 0 0;
          }
        }
        .right {
          width: rem(200px);
          background: #e8e4d5;
          .attributes {

          }
        }
        .left, .center, .right {
          padding: $appmain-padding;
          border: 1px solid #fefefe;
          .title {
            height: rem(34px);
            line-height: rem(34px);
            text-align: center;
          }
        }
      }
    }
  }

  @media (min-width: #{$responsive-width-xs}) {

    .vuecomponent-practice {

      section.page {

      }
    }
  }

  @media (min-width: #{$responsive-width-small}) {

    .vuecomponent-practice {

      section.page {

      }
    }
  }
</style>
<style rel="stylesheet" lang="scss">
  [data-component-active] {
    /*box-shadow: inset 0px 0px 0px 1px blue !important;*/
    border: 1px dotted #666;
  }
  [data-component-active]:hover {
    /*box-shadow: inset 0px 0px 0px 1px blue !important;*/
    border: 1px dotted #111;
  }
  [data-component-active]:focus {
    /*box-shadow: inset 0px 0px 0px 1px blue !important;*/
    border: 1px dotted #111;
  }
  [data-component-active="true"] {
    /*box-shadow: inset 0px 0px 0px 1px red !important;*/
    border: 1px solid #111;
  }
  [data-component-active="true"]:hover {
    /*box-shadow: inset 0px 0px 0px 1px red !important;*/
    border: 1px solid #111;
  }
  [data-component-active="true"]:focus {
    /*box-shadow: inset 0px 0px 0px 1px red !important;*/
    border: 1px solid #111;
  }
  /*[data-component-active="true"] {*/
    /*box-shadow: none;*/
    /*outline:none;*/
    /*border: none;*/
  /*}*/
  /*[data-component-active]:hover {*/
    /*box-shadow: none;*/
    /*border: none;*/
  /*}*/
  /*[data-component-active]:focus {*/
    /*box-shadow: none;*/
    /*border: none;*/
  /*}*/
</style>
