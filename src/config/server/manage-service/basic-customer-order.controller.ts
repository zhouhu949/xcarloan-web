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
   * 获取订单基本资料
   */
  findCustomerOrderInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderInfo',
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
  },
  /**
   * 获取押品资料
   */
  findCustomerCollateral: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerCollateral',
    type: requestType.Get
  },
  /*
   * 抵押贷款计算器
   */
  findMortgageRepayDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findMortgageRepayDetail',
    type: requestType.Get
  },
  /**
   * 创建抵押贷款申请订单
   */
  createMortgageOrder: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createMortgageOrder',
    type: requestType.Post
  },
  /**
  * 创建融资租赁申请订单
  */
  createFinancingOrder: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createFinancingOrder',
    type: requestType.Post
  },
  /**
   * 查询待补填资料订单
   */
  queryCustomerOrderFile: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryCustomerOrderFile',
    type: requestType.Get
  }

}