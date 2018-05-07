import { exportActivateDevice } from '@/api/passport'

const passport = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取激活设备信息
    ExportActivateDevice({ commit }, params) {
      return new Promise((resolve, reject) => {
        exportActivateDevice(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
};

export default passport;
