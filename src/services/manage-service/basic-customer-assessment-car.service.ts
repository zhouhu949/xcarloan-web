import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicCustomerAssessmentCarService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 新增车型产品
   */
  @Debounce()
  getBasicCustomerCarList(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.getBasicCustomerCarList,
      append: customerId
    })
  }
}
