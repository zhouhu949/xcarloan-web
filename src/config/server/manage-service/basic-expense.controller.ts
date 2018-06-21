import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicExpenseController'

export default {
  /**
   * 查询费用项列表
   */
  findBasicExpenseByAuth: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicExpenseByAuth',
    type: requestType.Get
  },
  /**
   * 新增费用项
   */
  addBasicExpense: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicExpense',
    type: requestType.Post
  },
  /**
  * 维护费用项
  */
  editBasicExpense: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editBasicExpense',
    type: requestType.Post
  },
  /**
  * 删除费用项
  */
  deleteBasicExpense: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteBasicExpense',
    type: requestType.Delete
  },
  /**
  * 复制模板
  */
  copyTemplate: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'copyTemplate',
    type: requestType.Get
  }
}