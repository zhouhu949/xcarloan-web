import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysUserController'

export default {
  /**
   * 分页查询用户列表
   */
  findUserByOrgAuth: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findUserByOrgAuth',
    type: requestType.Get
  },
  /**
   * 新增用户
   */
  addUser: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addUser',
    type: requestType.Post
  },
  /**
   * 修改用户
   */
  updateUser: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateUser',
    type: requestType.Put
  },
  /**
   * 重置用户密码
   */
  resetPassword: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetPassword',
    type: requestType.Put
  },
  /**
   * 获取用户所有设备
   */
  findUserDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findUserDevice',
    type: requestType.Post
  },
  /**
   * 更改用户设备锁信息
   */
  updateUserDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateUserDevice',
    type: requestType.Put
  },
  /**
   * 获取用户所拥有的
   */
  findUserRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findUserRole',
    type: requestType.Get
  },
  /**
   * 给用户分配角色
   */
  userBatchAllocateRoles: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'userBatchAllocateRoles',
    type: requestType.Post
  }
}
