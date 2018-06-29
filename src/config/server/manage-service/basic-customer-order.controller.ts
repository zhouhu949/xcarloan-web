import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicCustomerOrderController'

export default {
  /**
   * 根据订单获取客户信息
   */
  getCustomerInfoByOrderId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerInfoByOrderId',
    type: requestType.Get
  },
  /**
   * 订单分页查询
   */
  query: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'query',
    type: requestType.Get
  },
  /**
   * 融资租赁贷款计算器
   */
  findFinancingRepayDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findFinancingRepayDetail',
    type: requestType.Get
  }
}