import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'
import { PageService } from '~/utils/page.service'

export class BasicCustomerOrderService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据订单获取客户信息
   * @param orderId 订单id
   */
  getCustomerInfoByOrderId(orderId): any {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.getCustomerInfoByOrderId,
      data: {
        orderId: orderId
      }
    })
  }

  /**
   * 订单分页查询
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  query(queryParamsModel: any, page: PageService): any {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.query,
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
   * 融资租赁贷款计算器
   * @param productId 产品Id
   */
  findFinancingRepayDetail(productId: number): any {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findFinancingRepayDetail,
      data: {
        productId
      }
    })
  }
}