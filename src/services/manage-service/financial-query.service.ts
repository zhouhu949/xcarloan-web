import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'
import { PageService } from '~/utils/page.service';

export class FinancialQueryService {
  @Inject()
  private netService: NetService;

  /**
   * 查询客户指定状态的订单
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  findRepayOrderUnpaidList(queryParamsModel, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.findRepayOrderUnpaidList,
      data: {
        customerName: queryParamsModel.customerName,
        orderNo: queryParamsModel.orderNo,
        idCard: queryParamsModel.idCard,
        customerPhone: queryParamsModel.customerPhone,
      },
      page: page
    })
  }

  /**
   * 
   * @param orderId 提前收回或提前结清查询
   */
  @Debounce()
  findBalance(orderId: Number) {
    return this.netService.send({
      server: manageService.financialQueryController.findBalance,
      append: orderId
    })
  }

  /**
   * 查询供应商列表
   */
  findBasicOrderCarList(queryData, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.findBasicOrderCarList,
      data: {
        id: queryData.supplierId
      },
      page
    })
  }

  /**
   * 查询未开票的记录列表
   */
  findFinancialInvoiceList() {
    return this.netService.send({
      server: manageService.financialQueryController.findFinancialInvoiceList,
    })
  }


  /**
   * 
   * @param orderId 订单Id
   */
  findOrderRepayScheme(orderId: number): any {
    return this.netService.send({
      server: manageService.financialQueryController.findOrderRepayScheme,
      append: orderId
    })
  }

  /**
   * 查询客户还款中的订单
   * @param queryData 
   * @param page 
   */
  findRepayOrderList(queryData, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.findRepayOrderList,
      data: {
        customerName: queryData.name,
        orderNo: queryData.orderNo,
        idCard: queryData.idCard,
        customerPhone: queryData.phone
      },
      page
    })
  }

  /**
   * 查询退款中的订单
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  queryFinancialRefundOrder(queryParamsModel, page: PageService): any {
    return this.netService.send({
      server: manageService.financialQueryController.queryFinancialRefundOrder,
      data: {
        customerName: queryParamsModel.name,
        orderNo: queryParamsModel.orderNo,
        idCard: queryParamsModel.idCard,
        customerPhone: queryParamsModel.phone
      },
      page
    })
  }

  /**
   * 查询退款详情
   * @param orderId 订单id
   */
  queryFinancialRefund(orderId: number): any {
    return this.netService.send({
      server: manageService.financialQueryController.queryFinancialRefund,
      append: orderId
    })
  }

  /**
   * 供应商开票查询
   * @param queryParamsModel 
   * @param page 
   */
  supplierLoanRecord(queryParamsModel: any, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.supplierLoanRecord,
      data: {

      },
      page: page
    })
  }
}
