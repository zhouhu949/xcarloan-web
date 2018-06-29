import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class WorkFlowApprovalService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询所有数据权限下待审核的订单
   * @param data 查询参数实体
   * @param page 分页参数实体
   */
  queryAllWaitApprovalByAuth(data, page) {
    return this.netService.send({
      server: manageService.workFlowApprovalController.queryAllWaitApprovalByAuth,
      data: {
        customerName: data.customerName,
        userStatus: data.idCard,
        customerPhone: data.customerPhone,
        orderNo: data.orderNo
      },
      page: page
    })
  }


  /**
   * 分页查询所有待当前登录人审核的订单
   * @param data 查询参数实体
   * @param page 分页参数实体
   */
  queryWaitApproval(data, page) {
    return this.netService.send({
      server: manageService.workFlowApprovalController.queryWaitApproval,
      data: {
        customerName: data.customerName,
        userStatus: data.idCard,
        customerPhone: data.customerPhone,
        orderNo: data.orderNo
      },
      page: page
    })
  }
}
