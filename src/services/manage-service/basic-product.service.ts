//backlog-controller : 待办事项管理
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { PageService } from '~/utils/page.service';

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
  }/**
   * 编辑车型产品
   */
  @Debounce()
  editBasicProduct(data) {
    return this.netService.send({
      server: manageService.basicProductController.editBasicProduct,
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
      append: id,
      loading: true
    })
  }
  /**
   * 获取车型产品
   */
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
  findBasicProductList(carId, page) {
    return this.netService.send({
      server: manageService.basicProductController.findBasicProductList,
      append: carId,
      page,
      loading: true
    })
  }
  /**
   * 发布车型产品
   */
  @Debounce()
  publishedBasicProduct(productId) {
    return this.netService.send({
      server: manageService.basicProductController.publishedBasicProduct,
      append: productId,
      loading: true
    })
  }
  /**
   * 取消发布车型产品
   */
  @Debounce()
  cancelPublishedBasicProduct(productId) {
    return this.netService.send({
      server: manageService.basicProductController.cancelPublishedBasicProduct,
      append: productId,
      loading: true
    })
  }
  
  /**
   * 根据车型分页获取车型产品
   */
  queryReleaseProductByCar(carId: Number, schemeName: String, page: PageService) {
    return this.netService.send({
      server: manageService.basicProductController.queryReleaseProductByCar,
      data: {
        carId: carId,
        schemeName: schemeName
      },
      page
    })
  }
}
