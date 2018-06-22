//backlog-controller : 待办事项管理
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicProductService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 新增车型产品
   */
  @Debounce()
  addBasicProduct(data) {
    return this.netService.send({
      server: manageService.basicProductController.addBasicProduct,
      data: data,
      loading: true
    })
  }
  /**
   * 删除车型产品
   */
  @Debounce()
  deleteBasicProduct(id) {
    return this.netService.send({
      server: manageService.basicProductController.deleteBasicProduct,
      data: {
        id: id
      },
      loading: true
    })
  }
  /**
   * 获取车型产品
   */
  @Debounce()
  findBasicProduct(id) {
    return this.netService.send({
      server: manageService.basicProductController.findBasicProduct,
      append: id
    })
  }
  /**
   * 车型配置
   */
  @Debounce()
  editBasicProductConfig(data) {
    return this.netService.send({
      server: manageService.basicProductController.editBasicProductConfig,
      data: data,
      loading: true
    })
  }
  /**
   * 还款方案配置
   */
  @Debounce()
  editBasicProductScheme(data) {
    return this.netService.send({
      server: manageService.basicProductController.editBasicProductScheme,
      data: data,
      loading: true
    })
  }
  /**
   * 获取车型产品列表
   */
  @Debounce()
  findBasicProductList(carId,page) {
    return this.netService.send({
      server: manageService.basicProductController.findBasicProductList,
      append: carId,
      page
    })
  }
}
