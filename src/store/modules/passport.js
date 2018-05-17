import { exportActivateDevice } from '@/api/passport'
import { getDeviceType, getSysVersion, statisticsUpgrade } from '@/api/passport'

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

    // 获取所有设备型号
    GetDeviceType({ commit }, params) {
      return new Promise((resolve, reject) => {
        getDeviceType(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取所有系统版本
    GetSysVersion({ commit }, params) {
      return new Promise((resolve, reject) => {
        getSysVersion(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取系统升级统计信息
    StatisticsUpgrade({ commit }, params) {
      return new Promise((resolve, reject) => {
        statisticsUpgrade(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
};

export default passport;
