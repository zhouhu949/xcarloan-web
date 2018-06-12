export default {
  namespaced: true,
  state: {
    currentProduct: ''// 当前申请的产品
  },
  mutations: {
    updateCurrentProduct(state, product) {
      state.currentProduct = product
    }
  },
  actions: {
  }
}
