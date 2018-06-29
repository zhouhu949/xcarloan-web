import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'
import { FilterService } from '~/utils/filter.service'

export class BasicCustomerJobService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户职业信息列表
   */
  @Debounce()
  findCustomPersonalJob(customerId) {
    return this.netService.send({
      server: manageService.basicPersonalJobController.findCustomPersonalJob,
      append: customerId
    })
  }
  /**
   * 新增客户职业信息
   */
  @Debounce()
  addPersonalJob(data) {
    let model = Object.assign({}, data)
    model.accessCompanyTime = FilterService.dateFormat(model.accessCompanyTime, 'yyyy-MM-dd')
    return this.netService.send({
      server: manageService.basicPersonalJobController.addPersonalJob,
      data: model,
      loading: true
    })
  }
  /**
   * 修改客户职业信息
   */
  @Debounce()
  updatePersonalJob(data) {
    let model = Object.assign({}, data)
    model.accessCompanyTime = FilterService.dateFormat(model.accessCompanyTime, 'yyyy-MM-dd')
    return this.netService.send({
      server: manageService.basicPersonalJobController.updatePersonalJob,
      data: model,
      loading: true
    })
  }
  /**
   * 删除客户职业信息
   */
  @Debounce()
  deletePersonalJob(jobId) {
    return this.netService.send({
      server: manageService.basicPersonalJobController.deletePersonalJob,
      data: { id: jobId },
      loading: true
    })
  }
}