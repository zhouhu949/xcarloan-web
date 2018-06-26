import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'

export class BasicEnterShellSaveService {
  @Inject()
  private netService: NetService;

  /**
   * 外采列表
   * @param model 查询参数实体
   * @param page 分页参数实体
   */
  @Debounce()
  queryOutSideList(model, page) {
    return this.netService.send({
      server: manageService.basicEnterShellSaveController.queryOutSideList,
      data: {
        orderNo: model.orderNo,
        customerName: model.customerName,
        sctockStatus: model.sctockStatus
      },
      page: page,
      loading: true
    })
  }

  /**
   * 查询订单车辆详情
   * @param orderId 订单ID
   */
  @Debounce()
  getOrderCarById(orderId) {
    return this.netService.send({
      server: manageService.basicEnterShellSaveController.getOrderCarById,
      append: orderId,
      loading: true
    })
  }
}
