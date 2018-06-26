import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'BasicCustomerController'

export default {
  /**
   * 查找客户信息
   */
  findCustomerById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerById',
    type: requestType.Get
  },
  /**
   * 客户银行卡信息
   */
  getCustomerBankInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerBankInfo',
    type: requestType.Get
  },
  /**
   * 客户列表
   */
  findAllCustomerList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllCustomerList',
    type: requestType.Get
  },
  /**
   * 新增客户
   */
  addBasicCustomer: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicCustomer',
    type: requestType.Post
  }
}