import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class BasicProductRepayTemplateService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 确认发布产品
   */
  @Debounce()
  publishBasicProduct(data) {
    return this.netService.send({
      server: manageService.basicProductRepayTemplateController.publishBasicProduct,
      data: data,
      loading: true
    })
  }
  /**
   * 预览抵押贷款还款计划模板
   */
  queryBasicLoanProductTemplate(data) {
    return this.netService.send({
      server: manageService.basicProductRepayTemplateController.queryBasicLoanProductTemplate,
      data: data,
      loading: true
    })
  }
  /**
   * 预览融资租赁产品还款计划
   */
  queryBasicProductCarScheme(productId) {
    return this.netService.send({
      server: manageService.basicProductRepayTemplateController.queryBasicProductCarScheme,
      data: { id: productId},
      loading: true
    })
  }
}