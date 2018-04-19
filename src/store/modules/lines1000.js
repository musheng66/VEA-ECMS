import { repositoryQuery, repositoryAdd, repositoryEdit } from '@/api/lines1000'

const lines1000 = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取代码库列表
    GetRepository({ commit }, params) {
      return new Promise((resolve, reject) => {
        repositoryQuery(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增代码库
    AddRepository({ commit }, params) {
      return new Promise((resolve, reject) => {
        repositoryAdd(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑代码库
    EditRepository({ commit }, params) {
      return new Promise((resolve, reject) => {
        repositoryEdit(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
};

export default lines1000
