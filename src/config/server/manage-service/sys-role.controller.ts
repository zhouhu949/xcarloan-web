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
  queryUserByRoleIdPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryUserByRoleIdPage',
    type: requestType.Get
  },
  /**
   * 新增角色
   */
  addRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addRole',
    type: requestType.Post
  },
  /**
   * 维护角色
   */
  updateRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateRole',
    type: requestType.Put
  },
  /**
   * 删除角色
   */
  deleteRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteRole',
    type: requestType.Delete
  },
  /**
   * 角色分配资源
   */
  roleResource: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'roleResource',
    type: requestType.Post
  },
  /**
   * 获取数据权限下所有的机构，并标出该角色已选择排除的机构
   */
  findRoleExceptOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRoleExceptOrg',
    type: requestType.Get
  },
  /**
   * 获取权限下的所有的机构，并标出该角色已选择的机构
   */
  findRoleOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRoleOrg',
    type: requestType.Get
  },
  /**
   * 角色排除机构数据权限
   */
  roleExceptOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'roleExceptOrg',
    type: requestType.Post
  },
  /**
   * 角色配置机构数据权限
   */
  roleOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'roleOrg',
    type: requestType.Post
  },
  /**
   * 删除角色排除机构
   */
  deleteRoleExceptOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteRoleExceptOrg',
    type: requestType.Delete
  },
  /**
   * 删除角色授权机构
   */
  deleteRoleOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteRoleOrg',
    type: requestType.Delete
  },
  /**
   * 获取数据权限内的所有启用的角色
   */
  findAllEnableRoleByAuth: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllEnableRoleByAuth',
    type: requestType.Get
  }
}
