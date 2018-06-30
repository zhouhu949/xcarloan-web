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
    type: requestType.Post
  },
  /**
   * 提前收回
   */
  earlyRecycle: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'earlyRecycle',
    type: requestType.Post
  },
  /**
   * 提前还清
   */
  earlyRepayMoney: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'earlyRepayMoney',
    type: requestType.Post
  },
  /**
   * 确定开票
   */
  financialInvoice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financialInvoice',
    type: requestType.Post
  },
  /**
   * 退款
   */
  financialRefund: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financialRefund',
    type: requestType.Post
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
  supplierOrderLoan:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'supplierOrderLoan',
    type: requestType.Post
  }
}