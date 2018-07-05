import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { PageService } from '~/utils/page.service';
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

  /**
   * 删除角色
   * @param id 角色ID
   */
  @Debounce()
  deleteRole(id) {
    return this.netService.send({
      server: manageService.sysRoleController.deleteRole,
      append: id,
      loading: true
    })
  }

  /**
   * 给角色关联资源
   * @param roleId 角色ID
   * @param resourceIds 资源ID集合
   */
  @Debounce()
  roleResource(roleId, resourceIds) {
    return this.netService.send({
      server: manageService.sysRoleController.roleResource,
      data: {
        resourceIds: resourceIds,
        roleId: roleId
      },
      loading: true
    })
  }

  /**
   * 获取数据权限下所有的机构，并标出该角色已选择排除的机构
   */
  findRoleExceptOrg(roleId) {
    return this.netService.send({
      server: manageService.sysRoleController.findRoleExceptOrg,
      append: roleId
    })
  }
  /**
   * 获取权限下的所有的机构，并标出该角色已选择的机构
   */
  findRoleOrg(roleId) {
    return this.netService.send({
      server: manageService.sysRoleController.findRoleOrg,
      append: roleId
    })
  }

  /**
   * 角色排除机构数据权限
   * @param roleId 角色ID
   * @param orgIds 机构
   */
  @Debounce()
  roleExceptOrg(roleId, orgIds) {
    return this.netService.send({
      server: manageService.sysRoleController.roleExceptOrg,
      data: {
        orgIds: orgIds,
        roleId: roleId
      },
      loading: true
    })
  }

  /**
   * 角色配置机构数据权限
   * @param roleId 角色ID
   * @param orgIds 机构
   */
  @Debounce()
  roleOrg(roleId, orgIds) {
    return this.netService.send({
      server: manageService.sysRoleController.roleOrg,
      data: {
        orgIds: orgIds,
        roleId: roleId
      },
      loading: true
    })
  }

  /**
   * 删除角色排除机构
   */
  @Debounce()
  deleteRoleExceptOrg(authId) {
    return this.netService.send({
      server: manageService.sysRoleController.deleteRoleExceptOrg,
      append: authId
    })
  }
  /**
   * 删除角色授权机构
   */
  @Debounce()
  deleteRoleOrg(authId) {
    return this.netService.send({
      server: manageService.sysRoleController.deleteRoleOrg,
      append: authId
    })
  }

  /**
   * 获取数据权限内的所有启用的角色
   * @param queryParamsModel 
   * @param page 
   */
  findAllEnableRoleByAuth(queryParamsModel: any, page: PageService) {
    return this.netService.send({
      server: manageService.sysRoleController.findAllEnableRoleByAuth,
      data: {
        roleName: queryParamsModel.roleName
      },
      page: page
    })
  }
}
