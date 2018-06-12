import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class RoleService {
    @Inject()
    private netService: NetService

    /**
     * 获取所有角色
     */
    queryRolePage(data, page) {
        return this.netService.send({
            server: manageService.roleController.queryRolePage,
            data: data,
            page: page
        })
    }
    /**
     * 更新角色信息
     */
    updateRole(data) {
        return this.netService.send({
            server: manageService.roleController.updateRole,
            data: data
        })
    }
    /**
   * 新增角色
   */
    createRole(data) {
        return this.netService.send({
            server: manageService.roleController.createRole,
            data: data
        })
    }
    /**
  * 删除角色
  */
    deleteRole(data) {
        return this.netService.send({
            server: manageService.roleController.deleteRole,
            data: data
        })
    }
    /**
   * 通过角色id查询用户分页
   */
    getUserByRoleIdPage(data, page) {
        return this.netService.send({
            server: manageService.roleController.getUserByRoleIdPage,
            data: data,
            page: page
        })
    }
    /**
   * 根据角色ID 查询角色对应的权限资源
   */
    findResourceByRoleId({ roleId }) {
        return this.netService.send({
            server: manageService.roleController.findResourceByRoleId,
            data: {
                roleId: roleId
            }
        })
    }
    /**
     * 角色分配资源
     */
    roleAllocateResources({ roleId, resourcesId }) {
        return this.netService.send({
            server: manageService.roleController.roleAllocateResources,
            data: {
                roleId: roleId,
                resourcesId: resourcesId
            }
        })
    }
  /**
   * 导出
   */
  exportRole(data) {
    return this.netService.send({
      server: manageService.roleController.exportRole,
      data: data
    })
  }
}
