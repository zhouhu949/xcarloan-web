import { businessService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { PageService } from "~/utils/page.service";

export class OrderQueryService {
  @Inject()
  private netService: NetService

  /**
   * 获取订单交接
   */
  @Debounce()
  getOrderQueryData() {
    return this.netService.send({
      server: businessService.orderQueryController.getOrderQueryData,
      data: {}
    })
  }
  /**
   * 订单进度
   */
  getOrderProgress() {
    return this.netService.send({
      server: businessService.orderQueryController.getOrderProgress,
      data: {}
    })
  }

  /**
   * 产品包查询
   */
  getProductQuery() {
    return this.netService.send({
      server: businessService.orderQueryController.getProductQuery,
      data: {}
    })
  }
}

