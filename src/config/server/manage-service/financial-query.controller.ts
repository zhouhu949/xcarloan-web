import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'financialQueryController'

export default {
  /**
   * 查询订单当前还款期期数
   */
  SelectPeriods: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'SelectPeriods',
    type: requestType.Get
  },
  /**
   * 提前收回或提前结清查询
   */
  findBalanceInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBalanceInfo',
    type: requestType.Get
  },
  /**
   * 查询供应商列表
   */
  findBasicOrderCarList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicOrderCarList',
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
   * 收款查询
   */
  findGathering: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findGathering',
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
   * 查询客户还款中的订单
   */
  queryRepayOrderList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryRepayOrderList',
    type: requestType.Get
  },
  /**
   * 查询待放款的订单
   */
  findRepayOrderUnpaidList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRepayOrderUnpaidList',
    type: requestType.Get
  },
  /**
   * 收款详情
   */
  okReceipt: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'okReceipt',
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
   * 查询退款订单
   */
  queryFinancialRefundOrder: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryFinancialRefundOrder',
    type: requestType.Get
  },
  /**
   * 
   */
  supplierLoanRecord:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'supplierLoanRecord',
    type: requestType.Get
  },
  /**
   * 查询当前期的还款详情
   */
  selectRepayInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'selectRepayInfo',
    type: requestType.Get
  },
  /**
   * 财务开票列表查询
   */
  queryFinancialInvoice:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryFinancialInvoice',
    type: requestType.Get
  },
  /**
   * 查询客户还款中的订单
   */
  findRepayOrderList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRepayOrderList',
    type: requestType.Get
  },
  /**
   * 财务退款记录查询
   */
  queryFinancialRefunds: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryFinancialRefunds',
    type: requestType.Get
  }
}