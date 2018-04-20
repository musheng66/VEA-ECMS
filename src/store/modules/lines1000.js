import { repositoryQuery, repositoryAdd, repositoryEdit, repositoryDelete } from '@/api/lines1000'
import { getProOperallUserList, delProOperallUser, addProOperallUser, updProOperallUser, ccPouName, ccPouAliasname, ccPouCnname } from '@/api/lines1000'

const lines1000 = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取代码库列表
    RepositoryQuery({ commit }, params) {
      return new Promise((resolve, reject) => {
        repositoryQuery(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增代码库
    RepositoryAdd({ commit }, params) {
      return new Promise((resolve, reject) => {
        repositoryAdd(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑代码库
    RepositoryEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        repositoryEdit(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除代码库
    RepositoryDelete({ commit }, params) {
      return new Promise((resolve, reject) => {
        repositoryDelete(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取人员列表
    GetProOperallUserList({ commit }, params) {
      return new Promise((resolve, reject) => {
        getProOperallUserList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增人员
    AddProOperallUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        addProOperallUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑人员
    UpdProOperallUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        updProOperallUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除人员
    DelProOperallUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        delProOperallUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 检查cnname
    CcPouCnname({ commit }, params) {
      return new Promise((resolve, reject) => {
        ccPouCnname(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 检查name
    CcPouName({ commit }, params) {
      return new Promise((resolve, reject) => {
        ccPouName(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 检查aliasname
    CcPouAliasname({ commit }, params) {
      return new Promise((resolve, reject) => {
        ccPouAliasname(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
};

export default lines1000
