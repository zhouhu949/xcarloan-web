import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysModuleController'

export default {
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
   * 根据父id查询子类
   */
  findChildMenu: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findChildMenu',
    type: requestType.Get
  },
  /**
   * 获取角色下的所有的菜单
   */
  getRoleMenu: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getRoleMenu',
    type: requestType.Get
  },
  /**
   * 获取角色下的菜单
   */
  findMenuByRoleId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findMenuByRoleId',
    type: requestType.Get
  },
  /**
   * 获取角色下的资源
   */
  findResourceByRoleId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findResourceByRoleId',
    type: requestType.Get
  }
}