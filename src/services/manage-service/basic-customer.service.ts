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
  findCustomerById(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerController.findCustomerById,
      append: customerId
    })
  }
  /**
   * 客户银行卡信息
   */
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
   * 获取客户签约列表
   * @param data 查询参数实体
   * @param page 分页参数实体
   */
  getCustomerSignList(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerController.getCustomerSignList,
      data: {
        customerName: data.customerName
      },
      page: page,
      loading: true,
    })
  }
  /*
   * 新增客户
   */
  @Debounce()
  addBasicCustomer(data) {
    let result = Object.assign({}, data)
    result.birthTime = FilterService.dateFormat(result.birthTime, "yyyy-MM-dd")
    return this.netService.send({
      server: manageService.basicCustomerController.addBasicCustomer,
      data: result,
      loading: true,
    })
  }
  /*
   * 修改客户
   */
  @Debounce()
  editBasicCustomer(data) {
    let result = Object.assign({}, data)
    result.birthTime = FilterService.dateFormat(result.birthTime, "yyyy-MM-dd")
    return this.netService.send({
      server: manageService.basicCustomerController.editBasicCustomer,
      data: result,
      loading: true,
    })
  }
  /**
   * 新增银行卡
   * @param data 
   */
  @Debounce()
  addBasicCustomerBank(data) {
    return this.netService.send({
      server: manageService.basicCustomerController.addBasicCustomerBank,
      data: data,
      loading: true,
    })
  }

  /**
   * 编辑客户开户银行卡
   */
  @Debounce()
  updateCustomerBank(data) {
    return this.netService.send({
      server: manageService.basicCustomerController.updateCustomerBank,
      data: data,
      loading: true,
    })
  }
  /**
   * 删除银行卡信息
   */
  @Debounce()
  deleteCustomerBankInfo(bankCardId) {
    return this.netService.send({
      server: manageService.basicCustomerController.deleteCustomerBankInfo,
      data: {
        bankId: bankCardId
      }
    })
  }

}