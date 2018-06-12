export default {
  namespaced: true,
  state: {
    productId: '',
    paymentRecordFlag: '',
    collectiondata: {}
  },
  mutations: {
    collectionRowData(state, data) {
      state.collectiondata = data
    },
    updateProductId(state, id = "") {
      state.productId = id
    },
    updatePaymentRecord(state, time) {
      state.paymentRecordFlag = time
    },
  },
  actions: {
  }
}
