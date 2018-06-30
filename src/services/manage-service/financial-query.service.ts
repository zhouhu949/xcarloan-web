import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'
import { PageService } from '~/utils/page.service';

export class FinancialQueryService {
  @Inject()
  private netService: NetService;

  /**
   * 提前收回或提前结清查询
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
   * 查询待放款的订单
   */
  findRepayOrderUnpaidList(queryData, page: PageService) {
    return this.netService.send({
      server: manageService.financialQueryController.findRepayOrderUnpaidList,
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

}
