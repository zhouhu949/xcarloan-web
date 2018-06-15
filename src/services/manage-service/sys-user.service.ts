import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
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
  @Debounce()
  addUser(data) {
    return this.netService.send({
      server: manageService.sysUserController.addUser,
      data: {
        deptId: data.orgId,
        userEmail: data.email,
        userPhone: data.phone,
        userPhoto: "",
        userRealname: data.realName,
        userRemark: data.remark,
        userSex: data.sex,
        userStatus: data.state,
        userUsername: data.userName
      },
      loading: true
    })
  }
  /**
   * 修改用户
   * @param data 
   */
  @Debounce()
  updateUser(data) {
    return this.netService.send({
      server: manageService.sysUserController.addUser,
      data: {
        id: data.id,
        deptId: data.orgId,
        userEmail: data.email,
        userPhone: data.phone,
        userPhoto: "",
        userRealname: data.realName,
        userRemark: data.remark,
        userSex: data.sex,
        userStatus: data.state,
        userUsername: data.userName
      },
      loading: true
    })
  }
  /**
   * 重置用户密码
   * @param id 用户ID
   */
  @Debounce()
  resetPassword(id) {
    return this.netService.send({
      server: manageService.sysUserController.resetPassword,
      append: id
    })
  }

  /**
   * 获取用户所有设备
   * @param ids 所选用户ID
   */
  findUserDevice(ids){
    return this.netService.send({
      server: manageService.sysUserController.findUserDevice,
      data: {
        userIds: ids
      }
    })
  }

  /**
   * 修改用户设备锁状态
   * @param type 需要修改的状态
   * @param ids 所选设备锁ID集合
   */
  updateUserDevice(type,ids){
    return this.netService.send({
      server: manageService.sysUserController.updateUserDevice,
      data: {
        type: type,
        ids: ids
      }
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
