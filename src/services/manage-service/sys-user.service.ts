import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import store from "~/store"

export class SysUserService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取用户所属角色
   */
  findRolesByUserId({ userId }) {
    return this.netService.send({
      server: manageService.sysUserController.findRolesByUserId,
      data: {
        userId: userId
      }
    })
  }
  /**
   * 用户注册
   * @param data
   */
  userRegister(data) {
    return this.netService.send({
      server: manageService.sysUserController.userRegister,
      data
    })
  }
  /**
   * 查询用户列表菜单
   */
  findListboxByUserIdAndResoPid(resoPid) {
    return this.netService.send({
      server: manageService.sysUserController.findListboxByUserIdAndResoPid,
      data: {
        userId: store.state.userData.id,
        resoPid: resoPid
      }
    })
  }
  /**
   * 用户分配列表菜单
   */
  userAllocateListbox(id, data) {
    return this.netService.send({
      server: manageService.sysUserController.userAllocateListbox,
      data: {
        userId: store.state.userData.id,
        resoPid: id,
        userResourceList: data
      }
    })
  }
  /**
   * 用户分配权限
   */
  userAllocatePrivileges(data) {
    return this.netService.send({
      server: manageService.sysUserController.userAllocatePrivileges,
      data: data
    })
  }
  /**
   * 获取用户数据权限
   */
  findUserPrivileges({ userId }) {
    return this.netService.send({
      server: manageService.sysUserController.findUserPrivileges,
      data: {
        userId: userId
      }
    })
  }
  /**
   * 导出用户
   */
  exportUserList(data) {
    return this.netService.send({
      server: manageService.sysUserController.exportUserList,
      data: data
    })
  }
}
