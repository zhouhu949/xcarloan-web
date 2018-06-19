import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class SysUserService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取用户所属角色
   */
  findUserRole(userId: Number) {
    return this.netService.send({
      server: manageService.sysUserController.findUserRole,
      append: userId
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
  findUserDevice(ids) {
    return this.netService.send({
      server: manageService.sysUserController.findUserDevice,
      data: {
        userIds: ids
      }
    })
  }

  /**
   * 修改用户设备锁状态
   * @param deviceState 当前状态
   * @param type 需要修改的状态
   * @param ids 所选设备锁ID集合
   */
  updateUserDevice(type: Number, ids: Array<Number>, deviceState?: Number) {
    return this.netService.send({
      server: manageService.sysUserController.updateUserDevice,
      data: {
        deviceState: deviceState,
        type: type,
        ids: ids
      }
    })
  }

  /**
   * 设置用户角色
   * @param roleIds 需要赋予的角色ID
   * @param userIds 所选的用户
   */
  userBatchAllocateRoles(roleIds, userIds) {
    return this.netService.send({
      server: manageService.sysUserController.userBatchAllocateRoles,
      data: {
        roleIds,
        userIds
      },
      loading: true
    })
  }

  /**
   * 根据机构ID和其他条件查询用户分页数据
   * @param data 查询用户实体
   * @param page 分页服务
   */
  findUserByOrgAuth(data,page){
    return this.netService.send({
      server: manageService.sysUserController.findUserByOrgAuth,
      data: {
        orgId: data.orgId,
        userName: data.userName,
        realName: data.realName,
        userStatus: data.userStatus
      },
      page,
      loading: true
    })
  }
}
