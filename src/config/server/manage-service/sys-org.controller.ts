import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysOrgController'

export default {
  /**
   * 获取组织机构
   */
  findAllOrganizationByAuth: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllOrganizationByAuth',
    type: requestType.Get
  },
  /**
   * 新增组织机构 
   */
  addOrganization: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addOrganization',
    type: requestType.Post
  },
  /**
   * 删除组织机构 
   */
  deleteOrganization: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteOrganization',
    type: requestType.Delete
  },
  /**
   * 更新组织机构 
   */
  editOrganization: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editOrganization',
    type: requestType.Post
  }
}