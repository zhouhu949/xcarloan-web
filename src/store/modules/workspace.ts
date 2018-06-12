export default {
  namespaced: true,
  state: {
    currentTab: '', // 当前选中的tab
    currentTabs: '' // 当前显示的tabs
  },
  mutations: {
    updateCurrentTab(state, tab) {
      state.currentTab = tab
    },
    updateCurrentTabs(state, tabs) {
      state.currentTabs = tabs
    }
  },
  actions: {
    updateTabs({ state, commit, rootState }, parentId) {
      // 获取tabs标签页
      let tabs = rootState.userResource
        .filter((x: any) => x.type === "MENU")
        .filter((x: any) => x.parentId === parentId)
        .sort((x: any, y: any) => x.sort - y.sort);
      // 更新tabs标签页
      commit('updateCurrentTabs', tabs)
    }
  }
}
