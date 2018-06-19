import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class SysRoleService {
  @Inject()
  private netService: NetService

  /**
   * 获取所有角色
   */
  @Debounce()
  findAllRoleByAuth(data, page) {
    return this.netService.send({
      server: manageService.sysRoleController.findAllRoleByAuth,
      data: {
        roleName: data.roleName,
        roleStatus: data.roleStatus
      },
      page: page,
      loading: true
    })
  }

  /**
   * 根据角色ID等条件查询用户分页数据
   * @param data 查询实体
   * @param page 分页服务
   */
  @Debounce()
  queryUserByRoleIdPage(data, page) {
    return this.netService.send({
      server: manageService.sysRoleController.queryUserByRoleIdPage,
      data: {
        roleId: data.roleId,
        userName: data.userName,
        realName: data.realName
      },
      page: page,
      loading: true
    })
  }

  /**
   * 新增角色
   * @param data 新增实体
   */
  @Debounce()
  addRole(data) {
    return this.netService.send({
      server: manageService.sysRoleController.addRole,
      data: {
        deptId: data.orgId,
        roleDesc: data.roleDesc,
        roleName: data.roleName,
        roleStatus: data.roleStatus
      },
      loading: true
    })
  }

  /**
   * 修改角色
   * @param data 修改实体
   */
  @Debounce()
  updateRole(data) {
    return this.netService.send({
      server: manageService.sysRoleController.updateRole,
      data: {
        id: data.id,
        roleDesc: data.roleDesc,
        roleName: data.roleName,
        roleStatus: data.roleStatus
      },
      loading: true
    })
  }



}
