const CONTROLLER = 'orderController'

export default {
  /**
   * 获取订单交接数据
   */
  getOrderConnect: {
    controller: CONTROLLER,
    action: 'getOrderConnect',
    type: 'GET'
  },
  /**
   * 获取客户签约信息
   */
  getClientSign: {
    controller: CONTROLLER,
    action: 'getClientSign',
    type: 'GET'
  },
  /**
   * 获取客户开户
   */
  getClientAccount: {
    controller: CONTROLLER,
    action: 'getClientAccount',
    type: 'GET'
  },
  /**
 * 获取银验卡失败原因信息
 */
  getCheckCardReasonInfo: {
    controller: CONTROLLER,
    action: 'getCheckCardReasonInfo',
    type: 'GET'
  },
  /**
 * 一键交接表格数据
 */
  getTreeDatabox: {
    controller: CONTROLLER,
    action: 'getTreeDatabox',
    type: 'GET'
  },
  /**
   * 客户资料查询
   */
  getClientInfo: {
    controller: CONTROLLER,
    action: 'getClientInfo',
    type: 'GET'
  },
  /**
   * 融资租赁申请页客户联系人信息直系亲属
   */
  getContactsInfo: {
    controller: CONTROLLER,
    action: 'getContactsInfo',
    type: 'GET'
  },
  /**
  * 融资租赁申请页客户联系人信息其他联系人信息
  */
  getContactsRelationInfo: {
    controller: CONTROLLER,
    action: 'getContactsRelationInfo',
    type: 'GET'
  },
  /**
   * 获取角色列表
   */
  getRoleList: {
    controller: CONTROLLER,
    action: 'getRoleList',
    type: 'GET'
  }
}