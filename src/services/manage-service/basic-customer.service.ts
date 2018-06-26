import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'
import { FilterService } from '~/utils/filter.service';

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
  findAllCustomerList(model, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.findAllCustomerList,
      data: {
        customerName: model.customerName
      },
      page: page,
      loading: true,
    })
  }

  /**
   * 新增客户
   */
  @Debounce()
  addBasicCustomer(data) {
    let result = Object.assign({}, data)
    console.log(result,'123')
    result.birthTime = FilterService.dateFormat(result.birthTime, "yyyy-MM-dd")
    return this.netService.send({
      server: manageService.basicCustomerController.addBasicCustomer,
      data: {
        customerName: result
      },
      loading: true,
    })
  }
}