import moment from 'moment';
import { loginByUsername, logout, getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken, getRoles, setRoles, removeRoles, getLoginTime, setLoginTime, removeLoginTime, getName, setName, removeName } from '@/utils/auth';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    logintime: '',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOGINTIME: (state, time) => {
      state.logintime = time
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data;
          commit('SET_TOKEN', data.token);
          commit('SET_NAME', data.name);
          let loginTime = moment().format('YYYY-MM-DD HH:mm:ss');
          commit('SET_LOGINTIME', loginTime);
          // 将登录信息存放在session中
          setToken(data.token);
          setRoles(data.roles);
          setName(data.name);
          setLoginTime(loginTime);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error');
          }
          const data = response.data;
          commit('SET_NAME', data.name);
          commit('SET_TOKEN', getToken());
          commit('SET_LOGINTIME', getLoginTime());
          commit('SET_ROLES', data.roles);
          commit('SET_AVATAR', data.avatar);
          setToken(data.token);
          setRoles(data.roles);
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          commit('SET_NAME', '');
          commit('SET_LOGINTIME', '');
          removeToken();
          removeRoles();
          removeName();
          removeLoginTime();
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_LOGINTIME', '');
        removeToken();
        removeLoginTime();
        resolve();
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
