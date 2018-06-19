import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysRoleController'

export default {
  /**
   * 分页查询角色列表
   */
  findAllRoleByAuth: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllRoleByAuth',
    type: requestType.Get
  },
  /**
   * 通过角色ID获取用户分页数据
   */
  queryUserByRoleIdPage:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryUserByRoleIdPage',
    type: requestType.Get
  },
  /**
   * 新增角色
   */
  addRole:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addRole',
    type: requestType.Post
  },
   /**
   * 维护角色
   */
  updateRole:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateRole',
    type: requestType.Put
  }
}
