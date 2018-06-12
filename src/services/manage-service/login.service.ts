import {businessService, manageService} from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import md5 from 'md5'

export class LoginService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 登录
   */
  @Debounce()
  login({ username, password, loginDevice, loginType }) {
    return this.netService.send({
      server: manageService.loginController.login,
      data: {
        userUsername: username,
        userPassword: md5(password),
        loginDevice: loginDevice,
        loginType: loginType
      }
    })
  }

  /**
   * 通过token登录
   */
  getUserByToken() {
    return this.netService.send({
      server: manageService.loginController.getUserByToken
    })
  }
  /**
   *  重置密码
   */
  resetPassword({ userId }) {
    return this.netService.send({
      server: manageService.loginController.resetPassword,
      data: {
        userId: userId
      }
    })
  }
  /**
   * 启用、禁用设备
   */
  disableDevice({ userIds, userType, userStatus }) {
    return this.netService.send({
      server: manageService.loginController.disableDevice,
      data: {
        userIds: userIds,
        userType: userType,
        userStatus: userStatus
      }
    })
  }
  /**
   * 启用、停用设备锁
   */
  enableDeviceKey({ userIds, userType, userValidate }) {
    return this.netService.send({
      server: manageService.loginController.enableDeviceKey,
      data: {
        userIds: userIds,
        userType: userType,
        userValidate: userValidate
      }
    })
  }
  /**
   * 获取当前用户设备
   */
  getUserDevice({ userId }) {
    return this.netService.send({
      server: manageService.loginController.getUserDevice,
      data: {
        userId: userId
      }
    })
  }

  /**
   * 重置设备
   */
  resetDevice({ userIds, userType }) {
    return this.netService.send({
      server: manageService.loginController.resetDevice,
      data: {
        userIds: userIds,
        userType: userType
      }
    })
  }

  /**
   * 注销用户
   */
  logout() {
    return this.netService.send({
      server: manageService.loginController.logout
    })
  }
  /**
   * 修改密码
   */
  modifyPassword(data) {
    return this.netService.send({
      server: manageService.loginController.modifyPassword,
      data:data
    })
  }
}

