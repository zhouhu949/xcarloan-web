// 工作流审批操作
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'workFlowApprovalController'

export default {
  /**
   * 分页查询所有数据权限下待审核的订单
   */
  queryAllWaitApprovalByAuth: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryAllWaitApprovalByAuth',
    type: requestType.Get
  },
  /**
   * 分页查询所有待当前登录人审核的订单
   */
  queryWaitApproval: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryWaitApproval',
    type: requestType.Get
  },
  /**
   * 订单审核
   */
  approval: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'approval',
    type: requestType.Post
  }
}