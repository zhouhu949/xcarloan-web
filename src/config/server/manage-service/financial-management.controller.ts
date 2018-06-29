import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'financialManagementController'

export default {
  /**
   * 查询客户还款中的订单
   */
  findRepayOrderList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRepayOrderList',
    type: requestType.Get
  }
}