
const practices = {

  state: {
    xAxis: [],
    series: []
  },

  mutations: {
    setXAxisData: (state, data) => {
      // 存入状态
      state.xAxis = data.xAxis;
    },
    setSeriesData: (state, data) => {
      state.series = data.series;
    }

  },

  actions: {
    // 存放购物车数据
    SetEChartData({ commit }, data) {
      // 提交mutations
      commit('setXAxisData', data);
      commit('setSeriesData', data);
    },

  }
}

export default practices
