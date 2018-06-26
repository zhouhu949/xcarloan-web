import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class BasicCustomerService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据ID查找客户
   */
  @Debounce()
  findCustomerById(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerController.findCustomerById,
      append: customerId
    })
  }
  /**
   * 客户银行卡信息
   */
  @Debounce()
  findCustomerBankInfo(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerController.getCustomerBankInfo,
      data: {
        customerId: customerId
      }
    })
  }
  /**
   * 查询客户列表
   * @param model 查询参数实体
   * @param page 分页实体
   */
  @Debounce()
  findAllCustomerList(model,page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findAllCustomerList,
      data: {
        customerName: model.customerName
      },
      page:page,
      loading:true,
    })
  }

  /**
   * 获取客户签约列表
   * @param page 分页参数实体
   */
  @Debounce()
  getCustomerSignList(page){
    return this.netService.send({
      server: manageService.basicCustomerController.getCustomerSignList,
      page: page,
      loading: true,
    })
  }
}