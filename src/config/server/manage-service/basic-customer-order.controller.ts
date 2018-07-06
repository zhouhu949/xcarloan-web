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
  /**
   * 查询订单车辆
   */
  getOrderCar: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getOrderCar',
    type: requestType.Get
  },
  /**
   * 还款计划
   */
  findCustomerOrderSchedule: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderSchedule',
    type: requestType.Get
  },
  /**
   * 订单操作记录
   */
  findCustomerOrderRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderRecord',
    type: requestType.Get
  },
  /**
   * 收款记录
   */
  findCustomerOrderFinancialSituationList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderFinancialSituationList',
    type: requestType.Get
  },
  /**
   * 放款记录
   */
  findCustomerOrderFinanceLoanList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderFinanceLoanList',
    type: requestType.Get
  },
  /**
   * 提前收回记录
   */
  findCustomerOrderFinanceTakeBack: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderFinanceTakeBack',
    type: requestType.Get
  },
  /**
   * 提前结清记录
   */
  findCustomerOrderFinanceSettleList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderFinanceSettleList',
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
  },
  /**
   * 更改订单金额
   */
  updateOrderPrice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateOrderPrice',
    type: requestType.Put
  },
  /**
   * 订单结案操作
   */
  updateOrderStatus: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateOrderStatus',
    type: requestType.Post
  }
}