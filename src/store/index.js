import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import lines1000 from './modules/lines1000'
import passport from './modules/passport'
import mis from './modules/mis'
import practices from './modules/practices'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    lines1000,
    passport,
    mis,
    practices
  },
  getters
});

export default store
