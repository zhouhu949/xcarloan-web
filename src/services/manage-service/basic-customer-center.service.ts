import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class BasicCustomerCenterService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 意向客户列表
   */
  @Debounce()
  findPotentialCustomerList(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findPotentialCustomerList,
      data: {
        customerName: data.name
      },
      page
    })
  }
  /**
   * 历史客户列表
   */
  @Debounce()
  findHistoryCustomerList(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findHistoryCustomerList,
      data: {
        customerName: data.name
      },
      page
    })
  }
  /**
   * 白名单客户列表
   */
  @Debounce()
  findWhiteCustomerList(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findWhiteCustomerList,
      data: {
        customerName: data.name
      },
      page
    })
  }
  /**
   * 灰名单客户列表
   */
  @Debounce()
  findGrayCustomerList(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findGrayCustomerList,
      data: {
        customerName: data.name
      },
      page
    })
  }
  /**
   * 黑名单客户列表
   */
  findBlackCustomerList(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findBlackCustomerList,
      data: {
        customerName: data.name
      },
      page
    })
  }
  /**
   * 正式客户列表
   */
  findFormalCustomerList(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findFormalCustomerList,
      data: {
        customerName: data.name
      },
      page
    })
  }
}