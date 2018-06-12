const SERVICE = 'business-service'
const CONTROLLER = 'login'

export default {
  /**
   * 用户登录
   */
  login: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'login',
    type: 'POST'
  },
  /**
   * 通过token获取用户信息
   */
  getUserByToken: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserByToken',
    type: 'GET'
  }
}
