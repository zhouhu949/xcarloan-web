import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class BasicCustomerJobService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户职业信息列表
   */
  @Debounce()
  findCustomPersonalJob(customerId) {
    return this.netService.send({
      server: manageService.basicPersonalJobController.findCustomPersonalJob,
      append: customerId
    })
  }
}