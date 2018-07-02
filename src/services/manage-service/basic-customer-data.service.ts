import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicCustomerDataService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查询资料
   */
  @Debounce()
  getCustomerData(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerDataController.getCustomerData,
      append: customerId
    })
  }
}
