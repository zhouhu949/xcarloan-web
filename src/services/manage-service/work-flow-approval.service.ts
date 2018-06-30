import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { PageService } from '~/utils/page.service'

export class WorkFlowApprovalService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询所有数据权限下待审核的订单
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  queryAllWaitApprovalByAuth(queryParamsModel: any, page: PageService): any {
    return this.netService.send({
      server: manageService.workFlowApprovalController.queryAllWaitApprovalByAuth,
      data: {
        customerName: queryParamsModel.customerName,
        userStatus: queryParamsModel.idCard,
        customerPhone: queryParamsModel.customerPhone,
        orderNo: queryParamsModel.orderNo
      },
      page: page
    })
  }

  /**
   * 分页查询所有待当前登录人审核的订单
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  queryWaitApproval(queryParamsModel: any, page: PageService): any {
    return this.netService.send({
      server: manageService.workFlowApprovalController.queryWaitApproval,
      data: {
        customerName: queryParamsModel.customerName,
        userStatus: queryParamsModel.idCard,
        customerPhone: queryParamsModel.customerPhone,
        orderNo: queryParamsModel.orderNo
      },
      page: page
    })
  }

  /**
   * 分页查询所有待当前登录人审核的订单
   * @param data 查询参数实体
   */
  approval(data: any): any {
    return this.netService.send({
      server: manageService.workFlowApprovalController.approval,
      data: {
        orderId: data.orderId,
        type: data.type
      },
      loading: true
    });
  }
  
  /**
   * 订单提交审核
   * @param orderId 订单id
   */
  @Debounce()
  submitApproval(orderId: Number) {
    return this.netService.send({
      server: manageService.workFlowApprovalController.submitApproval,
      append: orderId
    })
  }
}
