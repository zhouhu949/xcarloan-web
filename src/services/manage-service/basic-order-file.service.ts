import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicOrderFileService {
  @Inject()
  private netService: NetService

  /**
   * 查询订单附件
   */
  getOrderFile(orderId) {
    return this.netService.send({
      server: manageService.basicOrderFileController.getOrderFile,
      append: orderId,
      loading: true
    })
  }

  /**
   * 合同资料上传
   * @param 资料实体
   */
  @Debounce()
  addUploadBasicOrderFile(data) {
    return this.netService.send({
      server: manageService.basicOrderFileController.addUploadBasicOrderFile,
      data: {
        id: data.id,
        customerOrderFileModels: data.customerOrderFileModels
      },
      loading: true
    })
  }
}