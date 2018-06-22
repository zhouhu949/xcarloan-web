import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicCustomHouseService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户房产信息列表
   */
  @Debounce()
  findCustomerHouseList(customerId) {
    return this.netService.send({
      server: manageService.basicCustomHouseController.findCustomerHouseList,
      append: customerId
    })
  }
}
