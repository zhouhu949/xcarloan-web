import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'
import { PageService } from '~/utils/page.service';

export class FinancialManagementService {
  @Inject()
  private netService: NetService;

  /**
   * 客户放款
   */
  customerOrderLoan(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.customerOrderLoan,
      append: orderId
    })
  }
  /**
   * 提前收回
   */
  @Debounce()
  earlyRecycle(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.earlyRecycle,
      append: orderId
    })
  }
  /**
   * 提前还清
   */
  @Debounce()
  earlyRepayMoney(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.earlyRepayMoney,
      append: orderId
    })
  }
  /**
   * 确定开票
   */
  @Debounce()
  financialInvoice(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.financialInvoice,
      append: orderId
    })
  }
  /**
   * 退款
   */
  @Debounce()
  financialRefund(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.financialRefund,
      append: orderId
    })
  }
  /**
   * 还款或提前结清查询
   */
  findBalance(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.findBalance,
      append: orderId
    })
  }
  /**
   * 查询未放款的供应商订单车型
   */
  findBasicOrderCarList() {
    return this.netService.send({
      server: manageService.financialManagementController.findBasicOrderCarList
    })
  }
  /**
   * 查询未放款的客户订单
   */
  findCustomerOrder() {
    return this.netService.send({
      server: manageService.financialManagementController.findCustomerOrder
    })
  }
  /**
   * 查询客户待放款订单Id
   */
  findCustomerOrderLoan() {
    return this.netService.send({
      server: manageService.financialManagementController.findCustomerOrderLoan
    })
  }
  /**
   * 查询未开票的记录列表
   */
  findFinancialInvoiceList() {
    return this.netService.send({
      server: manageService.financialManagementController.findFinancialInvoiceList
    })
  }
  /**
   * 根据订单Id查询还款详情
   */
  findOrderRepayScheme(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.findOrderRepayScheme,
      append: orderId
    })
  }
  /**
   * 查询退款详情
   */
  queryFinancialRefund(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.queryFinancialRefund,
      append: orderId
    })
  }
  /**
   * 客户还款
   */
  @Debounce()
  saveCustomerRepayment(money: Number, orderId: Number, periods: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.saveCustomerRepayment,
      data: {
        money,
        orderId,
        periods
      },
      loadding: true
    })
  }
  /**
   * 供应商放款
   */
  @Debounce()
  supplierOrderLoan(carId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.supplierOrderLoan,
      append: carId
    })
  }
  /**
   * 根据订单对客户放款
   */
  @Debounce()
  updateCustomerLoanStatus(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.updateCustomerLoanStatus,
      append: orderId
    })
  }
}
