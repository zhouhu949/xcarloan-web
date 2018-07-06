import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'
import { PageService } from '~/utils/page.service'

export class BasicStockCarService {
  @Inject()
  private netService: NetService;

  /**
   * 车辆库存列表
   * @param model 查询参数实体
   * @param page 分页参数实体
   */
  findAllStockCarList(model: any, page: PageService): any {
    return this.netService.send({
      server: manageService.basicStockCarManageController.findAllStockCarList,
      data: {
        modelId: model.modelId,
        supplierId: model.supplierId
      },
      page: page,
      loading: true
    })
  }

  /**
   * 新增库存车辆
   * @param data 库存车辆实体
   */
  @Debounce()
  addBasicStock(data: any): any {
    return this.netService.send({
      server: manageService.basicStockCarManageController.addBasicStock,
      data: {
        modelId: data.modelId,
        remark: data.remark,
        stockCarColor: data.stockCarColor,
        stockCarNo: data.stockCarNo,
        stockEngineNo: data.stockEngineNo,
        supplierId: data.supplierId,
        stockPrice: data.stockPrice
      },
      loading: true
    })
  }

  /**
   * 修改库存状态
   * @param data 
   */
  @Debounce()
  editCsrStockStatus(data: any): any {
    return this.netService.send({
      server: manageService.basicStockCarManageController.editCsrStockStatus,
      data: {
        id: data.id,
        stockStatus: data.stockStatus
      },
      loading: true
    })
  }

  /**
   * 修改库存状态
   * @param id 
   */
  @Debounce()
  updateCarStockStatus(model: any): any {
    return this.netService.send({
      server: manageService.basicStockCarManageController.updateCarStockStatus,
      data: {
        orderId: model.orderId,
        id: model.stockId
      },
      loading: true
    })
  }
}
