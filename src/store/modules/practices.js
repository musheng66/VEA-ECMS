
const practices = {

  state: {
    xAxis: [],
    series: [],
    components: [], //预览视图的组件树
  },

  mutations: {
    SET_XAXISDATA: (state, data) => {
      // 存入状态
      state.xAxis = data.xAxis
    },
    SET_SERIESDATA: (state, data) => {
      state.series = data.series
    },
    SET_COMPONENTS: (state, components) => {
      state.components = components
      //保存本地
      localStorage.components = JSON.stringify(components)
    },
  },

  actions: {
    // 存放购物车数据
    SetEChartData({ commit }, data) {
      // 提交mutations
      commit('SET_XAXISDATA', data)
      commit('SET_SERIESDATA', data)
    },
    setComponents({ commit }, components) {
      commit('SET_COMPONENTS', components)
    },
    getComponents({ commit }) {
      commit('SET_COMPONENTS', localStorage.components ? JSON.parse(localStorage.components) : [])
    }
  }
}

export default practices
