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
   * 获取客户签约列表
   */
  getCustomerSignList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerSignList',
    type: requestType.Get
  },
  /*
   * 新增客户
   */
  addBasicCustomer: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicCustomer',
    type: requestType.Post
  },
  /**
   * 新增银行卡
   */
  addBasicCustomerBank: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicCustomerBank',
    type: requestType.Post
  },
  /**
   * 编辑客户开户银行卡
   */
  updateCustomerBank: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateCustomerBank',
    type: requestType.Put
  },
  /**
   * 删除银行卡信息
   */
  deleteCustomerBankInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCustomerBankInfo',
    type: requestType.Delete
  }

}