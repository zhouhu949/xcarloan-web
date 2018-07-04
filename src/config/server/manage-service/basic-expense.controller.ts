import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicExpenseController'

export default {
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
  },
  /**
   * 获取当前用户所属机构下的费用项(下拉选用)
   */
  findBasicExpenseByOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicExpenseByOrg',
    type: requestType.Get
  },
  /**
   * 获取当前用户所属机构下的费用项 带分页
   */
  findBasicExpensePageByOrg:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicExpensePageByOrg',
    type: requestType.Get
  }
}