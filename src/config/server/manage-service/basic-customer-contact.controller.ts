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
  }
}