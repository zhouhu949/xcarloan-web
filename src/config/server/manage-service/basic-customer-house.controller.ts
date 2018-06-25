import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'basicCustomHouseController'
export default {
  /**
   * 客户房产信息列表
   */
  findCustomerHouseList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerHouseList',
    type: requestType.Get
  }
}