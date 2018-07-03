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

  /**
   * 新增客户资料
   */
  @Debounce()
  addCustomerData(data) {
    return this.netService.send({
      server: manageService.basicCustomerDataController.addCustomerData,
      data: {
        basicCustomerDataModels: data
      },
      loading: true
    })
  }
  
  /**
   * 删除客户资料
   */
  @Debounce()
  deleteCustomerData(id) {
    return this.netService.send({
      server: manageService.basicCustomerDataController.deleteCustomerData,
      data: { id: id},
      loading: true
    })
  }

  /**
   * 修改客户资料
   */
  @Debounce()
  updateCustomerData(data) {
    return this.netService.send({
      server: manageService.basicCustomerDataController.updateCustomerData,
      data: data,
      loading: true
    })
  }
}
