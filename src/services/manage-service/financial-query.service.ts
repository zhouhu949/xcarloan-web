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
   * @param orderId 订单Id
   */
  findOrderRepayScheme(orderId: number): any {
    return this.netService.send({
      server: manageService.financialQueryController.findOrderRepayScheme,
      append: orderId
    })
  }
}