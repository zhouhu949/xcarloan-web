import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'

export class FinancialManagementService {
  @Inject()
  private netService: NetService;

  /**
   * 查询客户还款中的订单
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  findRepayOrderList() {
    return this.netService.send({
      server: manageService.financialManagementController.findRepayOrderList
    })
  }
}
