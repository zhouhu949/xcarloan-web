import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class BasicCustomerContactService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户联系人信息列表
   */
  @Debounce()
  findCustomerContactList(customerId) {
    return this.netService.send({
      server: manageService.basicCustomContactController.findCustomerContactList,
      append: customerId
    })
  }
}