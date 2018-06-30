import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'financialManagementController'

export default {
  /**
   * 客户放款
   */
  customerOrderLoan: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'customerOrderLoan',
    type: requestType.Get
  },
  /**
   * 提前收回
   */
  earlyRecycle: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'earlyRecycle',
    type: requestType.Get
  },
  /**
   * 提前还清
   */
  earlyRepayMoney: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'earlyRecycle',
    type: requestType.Get
  },
  /**
   * 确定开票
   */
  financialInvoice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financialInvoice',
    type: requestType.Get
  },
  /**
   * 退款
   */
  financialRefund: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financialRefund',
    type: requestType.Get
  },
  /**
   * 还款或提前结清查询
   */
  findBalance: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBalance',
    type: requestType.Get
  },
  /**
   * 查询未放款的供应商订单车型
   */
  findBasicOrderCarList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicOrderCarList',
    type: requestType.Get
  },
  /**
   * 查询未放款的客户订单
   */
  findCustomerOrder: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrder',
    type: requestType.Get
  },
  /**
   * 查询客户待放款订单Id
   */
  findCustomerOrderLoan: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerOrderLoan',
    type: requestType.Get
  },
  /**
   * 查询未开票的记录列表
   */
  findFinancialInvoiceList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findFinancialInvoiceList',
    type: requestType.Get
  },
  /**
   * 根据订单Id查询还款详情
   */
  findOrderRepayScheme: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findOrderRepayScheme',
    type: requestType.Get
  },
  /**
   * 查询退款详情
   */
  queryFinancialRefund: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryFinancialRefund',
    type: requestType.Get
  },
  /**
   * 客户还款
   */
  saveCustomerRepayment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'saveCustomerRepayment',
    type: requestType.Post
  },
  /**
   * 供应商放款
   */
  supplierOrderLoan: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'supplierOrderLoan',
    type: requestType.Post
  },
  /**
   * 根据订单对客户放款
   */
  updateCustomerLoanStatus: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateCustomerLoanStatus',
    type: requestType.Post
  }
}