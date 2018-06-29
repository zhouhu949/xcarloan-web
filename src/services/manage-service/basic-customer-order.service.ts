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
  /**
   * 订单分页查询
   */
  query(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.query,
      data: {
        customerName: data.name,
        orderNo: data.orderNo,
        idCard: data.idCard,
        customerPhone: data.phone
      },
      page
    })
  }
  /**
   * 融资租赁贷款计算器
   */
  findFinancingRepayDetail(productId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findFinancingRepayDetail,
      data: {
        productId
      }
    })
  }
}