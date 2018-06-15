import { businessService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class OrderService {
  @Inject()
  private netService: NetService

  /**
   * 获取订单交接
   */
  @Debounce()
  getOrderConnect() {
    return this.netService.send({
      server: businessService.orderController.getOrderConnect,
      data: {}
    })
  }
  /**
   * 获取客户签约信息
   */
  getClientSign() {
    return this.netService.send({
      server: businessService.orderController.getClientSign,
      data: {}
    })
  }
  /**
   * 获取客户开户
   */
  getClientAccount() {
    return this.netService.send({
      server: businessService.orderController.getClientAccount,
      data: {}
    })
  }
  /**
   * 获取银验卡失败原因信息
   */
  getCheckCardReasonInfo() {
    return this.netService.send({
      server: businessService.orderController.getCheckCardReasonInfo,
      data: {}
    })
  }
  /**
   * 一键交接表格数据
   */
  getTreeDatabox() {
    return this.netService.send({
      server: businessService.orderController.getTreeDatabox,
      data: {}
    })
  }
  /**
   * 客户资料查询
   */
  getClientInfo() {
    return this.netService.send({
      server: businessService.orderController.getClientInfo,
      data: {}
    })
  }
  /**
   * 融资租赁申请页客户联系人信息
   */
  getContactsInfo() {
    return this.netService.send({
      server: businessService.orderController.getContactsInfo,
      data: {}
    })
  }
  /**
   * 融资租赁申请页客户联系人信息其他联系人
   */
  getContactsRelationInfo() {
    return this.netService.send({
      server: businessService.orderController.getContactsRelationInfo,
      data: {}
    })
  }
}

