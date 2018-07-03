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
  },
  /**
   * 新增客户资料
   */
  addCustomerData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCustomerData',
    type: requestType.Post
  },
  /**
   * 删除客户资料
   */
  deleteCustomerData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCustomerData',
    type: requestType.Delete
  },
  /**
   * 修改客户资料
   */
  updateCustomerData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateCustomerData',
    type: requestType.Put
  }
}