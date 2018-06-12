import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import workspace from './modules/workspace'
import purchase from './modules/purchase'
import mortgage from './modules/mortgage'

import injector from 'vue-inject';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const filterList = ['ready']

const store = new Vuex.Store({
  modules: {
    workspace: workspace,
    purchase: purchase,
    mortgage: mortgage
  },
  state,
  getters,
  mutations,
  actions,
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: "vuex",
      reducer: (state, paths) => {
        return Object.assign({}, state, { ready: false })
      },
      storage: localStorage,
      filter: ({ type, payload }) => {
        return !filterList.includes(type)
      }
    })
  ]
})

export default store
