import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'department'

export default {
  /**
   * 获取组织机构
   */
  getAllDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllDepartment',
    type: requestType.Get
  },
  /**
   * 新增组织机构
   */
  createDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createDepartment',
    type: requestType.Post
  },
  /**
   * 删除组织机构
   */
  deleteDept: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteDept',
    type: requestType.Delete
  },
  /**
   * 更新组织机构
   */
  updateDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateDepartment',
    type: requestType.Post
  },
  /**
   * 根据机构查公司
   */
  findCompanyByDeptId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCompanyByDeptId',
    type: requestType.Get
  }
}