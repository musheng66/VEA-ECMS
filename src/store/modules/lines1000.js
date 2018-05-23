import { repositoryQuery, repositoryAdd, repositoryEdit, repositoryDelete } from '@/api/lines1000'
import { getProOperallUserList, delProOperallUser, addProOperallUser, updProOperallUser, ccPouName, ccPouAliasname, ccPouCnname } from '@/api/lines1000'
import { getProUrlList, updProUrl } from '@/api/lines1000'
import { getProOperallCbuList, forv4UpdProOperallCbu, getProOperallCbuListForexcel, forv4DownSummarizelog, forv4Stat } from '@/api/lines1000'

const lines1000 = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 代码库管理
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
    // 人员管理
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
    // 统计路径管理
    // 获取统计路径列表
    GetProUrlList({ commit }, params) {
      return new Promise((resolve, reject) => {
        getProUrlList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑统计路径
    UpdProUrl({ commit }, params) {
      return new Promise((resolve, reject) => {
        updProUrl(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 统计
    // 获取每次按人员统计的数据列表接口
    GetProOperallCbuList({ commit }, params) {
      return new Promise((resolve, reject) => {
        getProOperallCbuList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新人员bug数量
    Forv4UpdProOperallCbu({ commit }, params) {
      return new Promise((resolve, reject) => {
        forv4UpdProOperallCbu(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取要导出的人员信息
    GetProOperallCbuListForexcel({ commit }, params) {
      return new Promise((resolve, reject) => {
        getProOperallCbuListForexcel(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取所有下载文件的路径
    Forv4DownSummarizelog({ commit }, params) {
      return new Promise((resolve, reject) => {
        forv4DownSummarizelog(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 统计比对接口
    Forv4Stat({ commit }, params) {
      return new Promise((resolve, reject) => {
        forv4Stat(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
};

export default lines1000
