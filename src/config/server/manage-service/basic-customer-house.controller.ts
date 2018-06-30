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
  },
  /**
   * 新增房产信息
   */
  addCustomHouse: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCustomHouse',
    type: requestType.Post
  },
  /**
   * 修改房产信息
   */
  updateCustomHouse: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateCustomHouse',
    type: requestType.Put
  },
  /**
   * 删除房产信息
   */
  deleteCustomHouse: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCustomHouse',
    type: requestType.Delete
  }
}