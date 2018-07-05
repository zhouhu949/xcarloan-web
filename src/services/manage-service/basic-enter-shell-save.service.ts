import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'
import { PageService } from '~/utils/page.service'

export class BasicEnterShellSaveService {
  @Inject()
  private netService: NetService;

  /**
   * 外采列表
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  queryOutSideList(queryParamsModel: any, page: PageService): any {
    return this.netService.send({
      server: manageService.basicEnterShellSaveController.queryOutSideList,
      data: {
        orderNo: queryParamsModel.orderNo,
        customerName: queryParamsModel.customerName,
        stockStatus: queryParamsModel.stockStatus
      },
      page: page
    })
  }

  /**
   * 查询订单车辆详情
   * @param orderId 订单ID
   */
  getOrderCarById(orderId: number): any {
    return this.netService.send({
      server: manageService.basicEnterShellSaveController.getOrderCarById,
      append: orderId
    })
  }

  /**
   * 外采时添加库存
   * @param data 实体模型
   */
  @Debounce()
  addOrderCarStock(data: any): any {
    return this.netService.send({
      server: manageService.basicEnterShellSaveController.addOrderCarStock,
      data: {
        stockId: data.stockId,
        supplierId: data.supplierId,
        stockCarNo: data.stockCarNo,
        stockEngineNo: data.stockEngineNo,
        stockCarColor: data.stockCarColor,
        stockPrice: data.stockPrice,
        remark: data.remark,
      },
      loading: true
    })
  }
}
