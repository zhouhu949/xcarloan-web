import { manageService } from '~/config/server'
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
  getUserInfoByToken() {
    return this.netService.send({
      server: manageService.loginController.getUserInfoByToken
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
   * 
   * @param data 修改密码
   */
  @Debounce()
  updatePassword(data) {
    return this.netService.send({
      server: manageService.loginController.updatePassword,
      data: {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword
      }
    })
  }
}

