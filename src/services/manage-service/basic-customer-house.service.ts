import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicCustomerHouseService {
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
  /**
   * 新增房产信息
   */
  @Debounce()
  addCustomHouse(data) {
    return this.netService.send({
      server: manageService.basicCustomHouseController.addCustomHouse,
      data: data,
      loading: true
    })
  }
  /**
   * 修改房产信息
   */
  @Debounce()
  updateCustomHouse(data) {
    return this.netService.send({
      server: manageService.basicCustomHouseController.updateCustomHouse,
      data: data,
      loading: true
    })
  }
  /**
   * 删除房产信息
   */
  @Debounce()
  deleteCustomHouse(houseId) {
    return this.netService.send({
      server: manageService.basicCustomHouseController.deleteCustomHouse,
      data: { id: houseId},
      loading: true
    })
  }
}
