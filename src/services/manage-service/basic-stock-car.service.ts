import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'

export class BasicStockCarService {
  @Inject()
  private netService: NetService;

  /**
   * 根据车型ID查找库存分页列表
   * @param modelId 
   */
  @Debounce()
  findBasicStockByModelId(modelId) {
    return this.netService.send({
      server: manageService.basicStockCarManageController.findBasicStockByModelId,
      append: modelId,
      loading: true
    })
  }

  /**
   * 
   * @param model 
   * @param page 
   */
  @Debounce()
  findAllStockCarList(model, page) {
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
  addBasicStock(data) {
    return this.netService.send({
      server: manageService.basicStockCarManageController.addBasicStock,
      data: {
        modelId: data.modelId,
        remark: data.remark,
        stockCarColor: data.stockCarColor,
        stockCarNo: data.stockCarNo,
        stockEngineNo: data.stockEngineNo,
        supplierId: data.supplierId,
      },
      loading: true
    })
  }
}
