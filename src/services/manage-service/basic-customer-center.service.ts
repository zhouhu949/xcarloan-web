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
      server: manageService.basicCustomerCenterController.findPotentialCustomerList,
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
      server: manageService.basicCustomerCenterController.findHistoryCustomerList,
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
      server: manageService.basicCustomerCenterController.findWhiteCustomerList,
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
      server: manageService.basicCustomerCenterController.findGrayCustomerList,
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
      server: manageService.basicCustomerCenterController.findBlackCustomerList,
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
      server: manageService.basicCustomerCenterController.findFormalCustomerList,
      data: {
        customerName: data.name
      },
      page
    })
  }

  /**
   * 获取黑白灰名单记录
   */
  findCustomerBlackListRecord(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerCenterController.findCustomerBlackListRecord,
      data: {
        customerId: customerId
      }
    })
  }

  /**
   * 订单记录
   */
  findBasicCustomerOrderList(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerCenterController.findBasicCustomerOrderList,
      data: {
        customerId: customerId
      }
    })
  }

  /**
   * 白/灰名单移出
   */
  updateCustomerStatusWhite(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerCenterController.updateCustomerStatusWhite,
      data: {
        customerId: customerId
      }
    })
  }

  /**
   * 黑名单移入至意向客户
   */
  updateCustomerStatusBlack(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerCenterController.updateCustomerStatusBlack,
      data: {
        customerId: customerId
      }
    })
  }
}