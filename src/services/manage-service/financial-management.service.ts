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
      loading: true
    })
  }
  /**
   * 提前收回
   */
  @Debounce()
  earlyRecycle(model) {
    return this.netService.send({
      server: manageService.financialManagementController.earlyRecycle,
      data:{
        orderId: model.orderId,
        money: model.recoverMoney
      },
      loading: true
    })
  }
  /**
   * 提前还清
   */
  @Debounce()
  earlyRepayMoney(orderId: Number) {
    return this.netService.send({
      server: manageService.financialManagementController.earlyRepayMoney,
      append: orderId,
      loading: true
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
      loading: true
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
      loading: true
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
