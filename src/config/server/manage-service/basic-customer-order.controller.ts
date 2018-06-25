import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicCustomerOrderController'

export default {
  /**
   * 根据订单获取客户信息
   */
  getCustomerInfoByOrderId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerInfoByOrderId',
    type: requestType.Get
  }
}