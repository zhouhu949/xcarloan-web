import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicPersonalJobController'

export default {
  /**
   * 客户职业信息列表
   */
  findCustomPersonalJob: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomPersonalJob',
    type: requestType.Get
  },
  /**
   * 新增客户职业信息
   */
  addPersonalJob: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addPersonalJob',
    type: requestType.Post
  },
  /**
   * 修改客户职业信息
   */
  updatePersonalJob: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updatePersonalJob',
    type: requestType.Put
  },
  /**
   * 删除客户职业信息
   */
  deletePersonalJob: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deletePersonalJob',
    type: requestType.Delete
  }
}