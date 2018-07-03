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
  @Debounce()
  customerOrderLoan(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.customerOrderLoan,
      append: orderId,
      loadding: true
    })
  }
  /**
   * 提前收回
   */
  @Debounce()
  earlyRecycle(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.earlyRecycle,
      data: {
        orderId
      },
      loadding: true
    })
  }
  /**
   * 提前还清
   */
  @Debounce()
  earlyRepayMoney(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.earlyRepayMoney,
      data: {
        orderId
      },
      loadding: true
    })
  }
  /**
   * 确定开票
   */
  @Debounce()
  financialInvoice(id) {
    return this.netService.send({
      server: manageService.financialManagementController.financialInvoice,
      append: id
    })
  }
  /**
   * 退款
   */
  @Debounce()
  financialRefund(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.financialRefund,
      append: orderId,
      loadding: true
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
      append: carId,
      loadding: true
    })
  }

  /**
   * 客户还款 首付款 
   * @param orderId 订单ID
   */
  @Debounce()
  financialAffirm(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.financialAffirm,
      append: orderId,
      loadding: true
    })
  }

  /**
   * 供应商开票
   * @param model 开票实体
   */
  @Debounce()
  financialAffirmInvoice(model: any): any {
    return this.netService.send({
      server: manageService.financialManagementController.financialAffirmInvoice,
      data: {
        id: model.id,
        url: model.url
      },
      loadding: true
    })
  }
}
