import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'financialQueryController'

export default {
  /**
   * 查询待放款的订单
   */
  findRepayOrderUnpaidList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRepayOrderUnpaidList',
    type: requestType.Get
  },
  findOrderRepayScheme:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findOrderRepayScheme',
    type: requestType.Get
  }
}