import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysModuleController'

export default {
  /**
   * 重置资源图标
   */
  resetResoIcon: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetResoIcon',
    type: requestType.Get
  },
  /**
   * 重置资源名称
   */
  resetResoName: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetResoName',
    type: requestType.Get
  },
  /**
   * 修改资源图标
   */
  editResourceIcon: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editResourceIcon',
    type: requestType.Put
  },
  /**
   * 修改资源名称
   */
  editResourceName: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editResourceName',
    type: requestType.Put
  },
  /**
   * 查询所有角色资源
   */
  getAllResource: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllResource',
    type: requestType.Post
  },
  /**
  * 根据父id查询子类
  */
 findChildMenu: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findChildMenu',
    type: requestType.Get
  },
  /**
   * 获取系统目录菜单
   */
  findRoleMenu: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRoleMenu',
    type: requestType.Get
  },
  /**
 * 根据父id查询子类不分页
 */
  getSonResoNoPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSonResoNoPage',
    type: requestType.Get
  },
  /**
   * 获取角色已有按钮和输入框
   */
  findRoleResoResourceByRoleId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRoleResoResourceByRoleId',
    type: requestType.Post
  },
  /**
  * 获取角色已有页面
  */
  findRoleResoMenuByRoleId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findRoleResoMenuByRoleId',
    type: requestType.Post
  },
  /**
 * 角色权限维护获取角色对应的所有资源信息
 */
  findAllResourceAndMenu: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllResourceAndMenu',
    type: requestType.Get
  }
}