import { InfoCompontentType } from "~/config/enum.config";

export default {
  namespaced: true,
  state: {
    currentComponent: "",
    customerId: "",
    orderId: "",
    /**
     * 是否开启可以编辑页面数据
     */
    edit: false
  },
  mutations: {
    /**
     * 更新客户信息
     * @param state 
     * @param name 组件名称
     * @param customerId 客户ID
     */
    updateCustomerInfo(state, { name, customerId, enabledEdit }) {
      state.currentComponent = name
      state.customerId = customerId
      state.edit = enabledEdit
    },
    /**
     * 更新订单信息
     * @param state 
     * @param name 组件名称
     * @param customerId 订单ID
     */
    updateOrderInfo(state, { name, orderId }) {
      state.currentComponent = name
      state.orderId = orderId
    }
  },
  getters: {
    /**
     * 详情页面可选信息列表
     */
    componentNameList(): Array<{ name: string, title: string, type: InfoCompontentType }> {
      return [
        { name: "CustomerInfo", title: "客户详情", type: InfoCompontentType.CUSTOMER },
        { name: "OrderInfo", title: "订单详情", type: InfoCompontentType.ORDER },
      ]
    }
  },
  actions: {
    /**
     * 显示客户信息页面
     * @param param0 
     * @param customer 客户信息页面配置
     */
    showCustomerInfo({ commit, getters }, customer: { id: Number, enabledEdit?: Boolean }) {
      console.log(customer,'customer')
      let current = getters.componentNameList.find(x => x.type === InfoCompontentType.CUSTOMER)
      commit('updateCustomerInfo', { name: current.name, customerId: customer.id, enabledEdit: customer.enabledEdit || false })
    },
    /**
     * 显示订单详情信息页面
     * @param param0 
     * @param orderId 
     */
    showOrderInfo({ commit, getters }, orderId) {
      let current = getters.componentNameList.find(x => x.type === InfoCompontentType.ORDER)
      commit('updateOrderInfo', { name: current.name, orderId: orderId })
    }
  }
}