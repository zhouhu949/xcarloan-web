import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class DepartmentService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 新增组织机构
   */
  createDepartment(data) {
    return this.netService.send({
      server: manageService.departmentController.createDepartment,
      data: data
    })
  }
  /**
   * 删除组织机构
   */
  deleteDept({ deptId }) {
    return this.netService.send({
      server: manageService.departmentController.deleteDept,
      data: {
        deptId: deptId
      }
    })
  }

  /**
   * 更新组织机构
   */
  updateDepartment(data) {
    return this.netService.send({
      server: manageService.departmentController.updateDepartment,
      data: data
    })
  }
  /**
   * 根据机构查询公司
   */
  findCompanyByDeptId({ deptId }) {
    return this.netService.send({
      server: manageService.departmentController.findCompanyByDeptId,
      data: {
        deptId: deptId
      }
    })
  }
}