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
  findBalanceInfo(orderId: Number) {
    return this.netService.send({
      server: manageService.financialQueryController.findBalanceInfo,
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
   * 根据订单ID 查询还款详情
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
  queryRepayOrderList(queryData, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.queryRepayOrderList,
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
      page: page
    })
  }

  /**
   * 查询当前期的还款详情
   * @param orderId 
   * @param period 
   */
  selectRepayInfo(orderId: Number) {
    return this.netService.send({
      server: manageService.financialQueryController.selectRepayInfo,
      append: orderId
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
        supplierId: queryParamsModel.supplierId,
        hasInvoice: queryParamsModel.hasInvoice
      },
      page: page
    })
  }

  /**
   * 收款列表查询
   * @param queryData 
   * @param page 
   */
  findGathering(queryData, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.findGathering,
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
   * 财务开票列表查询
   */
  queryFinancialInvoice(queryData, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.queryFinancialInvoice,
      data: {
        isInvoice: queryData.state,
        customerName: queryData.name,
        orderNo: queryData.orderNo,
        idCard: queryData.idCard,
        customerPhone: queryData.phone
      },
      page
    })
  }

  /**
   * 收款详情-- 首付款项目
   * @param orderId 订单ID
   */
  okReceipt(orderId: Number) {
    return this.netService.send({
      server: manageService.financialQueryController.okReceipt,
      append: orderId
    })
  }

}
