import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'login'

export default {
  /**
   * 用户登录
   */
  login: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'login',
    type: requestType.Post
  },
  /**
   * 重置密码
   */
  resetPassword: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetPassword',
    type: requestType.Post
  },
  /**
   * 重置密码
   */
  getUserByToken: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserByToken',
    type: requestType.Get
  },
  /**
   * 启用、禁用设备
   */
  disableDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'disableDevice',
    type: requestType.Post
  },
  /**
   * 启用、停用设备锁
   */
  enableDeviceKey: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'enableDeviceKey',
    type: requestType.Post
  },
  /**
   * 获取用户设备
   */
  getUserDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserDevice',
    type: requestType.Get
  },
  /**
   * 重置设备
   */
  resetDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetDevice',
    type: requestType.Post
  },
  /**
   * 注销用户
   */
  logout: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'logout',
    type: requestType.Post
  },
  /**
   * 修改密码
   */
  modifyPassword: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modifyPassword',
    type: 'POST'
  }
}
