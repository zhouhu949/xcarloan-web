import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class BasicCustomerOrderService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据订单获取客户信息
   */
  @Debounce()
  getCustomerInfoByOrderId(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.getCustomerInfoByOrderId,
      data: {
        orderId: orderId
      }
    })
  }
}