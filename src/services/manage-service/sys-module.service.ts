import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class SysModuleService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 重置资源图标
   */
  resetResoIcon() {
    return this.netService.send({
      server: manageService.sysModuleController.resetResoIcon,
    })
  }

  /**
   * 重置资源名称
   */
  resetResoName() {
    return this.netService.send({
      server: manageService.sysModuleController.resetResoName,
    })
  }
  /**
  * 修改资源图标
  */
 editResourceIcon(data) {
    return this.netService.send({
      server: manageService.sysModuleController.editResourceIcon,
      data
    })
  }
  /**
   * 修改资源名称
   */
  editResourceName(data) {
    return this.netService.send({
      server: manageService.sysModuleController.editResourceName,
      data
    })
  }
  /**
   * 查询所有角色资源
   */
  getAllResource() {
    return this.netService.send({
      server: manageService.sysModuleController.getAllResource
    })
  }
  /**
   * 根据父id查询子类分页
   */
  findChildMenu({ id }, page) {
    return this.netService.send({
      server: manageService.sysModuleController.findChildMenu,
      // data: {
      //   id: id
      // },
      append: id,
      page: page
    })
  }
  /**
   * 获取系统目录菜单
   */
  findRoleMenu() {
    return this.netService.send({
      server: manageService.sysModuleController.findRoleMenu
    })
  }
  /**
   * 根据父id查询子类不分页
   */
  getSonResoNoPage({ id }) {
    return this.netService.send({
      server: manageService.sysModuleController.getSonResoNoPage,
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
      server: manageService.sysModuleController.findRoleResoResourceByRoleId,
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
      server: manageService.sysModuleController.findRoleResoMenuByRoleId,
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
      server: manageService.sysModuleController.findAllResourceAndMenu,
      data: { roleId: roleId }
    })
  }
}
