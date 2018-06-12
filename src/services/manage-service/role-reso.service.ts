import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class RoleResoService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 重置资源图标
   */
  resetResoIcon() {
    return this.netService.send({
      server: manageService.roleResoController.resetResoIcon,
    })
  }

  /**
   * 重置资源名称
   */
  resetResoName() {
    return this.netService.send({
      server: manageService.roleResoController.resetResoName,
    })
  }
  /**
  * 修改资源图标
  */
  modifyResoIcon(data) {
    return this.netService.send({
      server: manageService.roleResoController.modifyResoIcon,
      data
    })
  }
  /**
   * 修改资源名称
   */
  modifyResoName(data) {
    return this.netService.send({
      server: manageService.roleResoController.modifyResoName,
      data
    })
  }
  /**
   * 查询所有角色资源
   */
  getAllResource() {
    return this.netService.send({
      server: manageService.roleResoController.getAllResource
    })
  }
  /**
   * 根据父id查询子类分页
   */
  getSonReso({ id }, page) {
    return this.netService.send({
      server: manageService.roleResoController.getSonReso,
      data: {
        id: id
      },
      page: page
    })
  }
  /**
   * 获取系统目录菜单
   */
  findRoleResoMenu() {
    return this.netService.send({
      server: manageService.roleResoController.findRoleResoMenu
    })
  }
  /**
   * 根据父id查询子类不分页
   */
  getSonResoNoPage({ id }) {
    return this.netService.send({
      server: manageService.roleResoController.getSonResoNoPage,
      data: {
        id: id
      }
    })
  }
  /**
   * 获取角色已有按钮和输入框
   */
  findRoleResoResourceByRoleId({ roleIds }) {
    return this.netService.send({
      server: manageService.roleResoController.findRoleResoResourceByRoleId,
      data: {
        roleIds: roleIds
      }
    })
  }
  /**
   * 获取角色已有页面
   */
  findRoleResoMenuByRoleId({ roleIds }) {
    return this.netService.send({
      server: manageService.roleResoController.findRoleResoMenuByRoleId,
      data: {
        roleIds: roleIds
      }
    })
  }
  /**
   * 角色权限维护获取角色对应的所有资源信息
   */
  findAllResourceAndMenu(roleId) {
    return this.netService.send({
      server: manageService.roleResoController.findAllResourceAndMenu,
      data: { roleId: roleId }
    })
  }
}
