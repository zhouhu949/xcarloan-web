import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicCustomContactController'

export default {
  /**
   * 客户联系人信息列表
   */
  findCustomerContactList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerContactList',
    type: requestType.Get
  },
  /**
   * 新增联系人信息
   */
  addCustomContact: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCustomContact',
    type: requestType.Post
  },
  /**
   * 修改联系人信息
   */
  updateCustomContant: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateCustomContant',
    type: requestType.Put
  },
  /**
   * 删除联系人信息
   */
  deleteCustomContant: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCustomContant',
    type: requestType.Delete
  }
}