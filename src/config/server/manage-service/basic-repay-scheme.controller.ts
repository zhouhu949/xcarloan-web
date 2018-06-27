//还款方案管理controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'basicRepaySchemeController'
export default {

  /**
   * 获取当前用户下组织机构下所有的还款方案
   */
  getAllBasicSchemeByOrgId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllBasicSchemeByOrgId',
    type: requestType.Get 
  },
  /**
   * 根据还款方案id获取还款方案信息
   */
  findSchemeById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findSchemeById',
    type: requestType.Get 
  },
  /**
   * 根据还款方案获取还款方案比例详情
   */
  findSchemeExpenseBySchemeId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findSchemeExpenseBySchemeId',
    type: requestType.Get 
  },
  /**
   * 新增/修改还款方案
   */
  repayScheme: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'repayScheme',
    type: requestType.Post 
  },
  /**
   * 删除还款方案
   */
  deleteRepayScheme: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteRepayScheme',
    type: requestType.Delete 
  },
  /**
   * 发布/取消发布还款方案
   */
  releaseRepayScheme: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'releaseRepayScheme',
    type: requestType.Put 
  },
  /**
   * 新增/修改还款方案比例详情
   */
  addBasicSchemeExpense: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicSchemeExpense',
    type: requestType.Post
  },
  /**
   * 删除还款方案比例详情
   */
  deleteRepaySchemeExpense: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteRepaySchemeExpense',
    type: requestType.Delete 
  }
}