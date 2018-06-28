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
  /**
   * 新增联系人信息
   */
  @Debounce()
  addCustomContact(data) {
    return this.netService.send({
      server: manageService.basicCustomContactController.addCustomContact,
      data: data,
      loading: true
    })
  }
  /**
   * 修改联系人信息
   */
  @Debounce()
  updateCustomContant(data) {
    return this.netService.send({
      server: manageService.basicCustomContactController.updateCustomContant,
      data: data,
      loading: true
    })
  }
  /**
   * 删除联系人信息
   */
  @Debounce()
  deleteCustomContant(contactId) {
    return this.netService.send({
      server: manageService.basicCustomContactController.deleteCustomContant,
      data: { contactId: contactId },
      loading: true
    })
  }
}