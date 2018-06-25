import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'basicCustomerDataController'
export default {
  /**
   * 查询资料
   */
  getCustomerData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerData',
    type: requestType.Get
  }
}