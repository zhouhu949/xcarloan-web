import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class SysOrgService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 新增组织机构
   */
  addOrganization(data) {
    return this.netService.send({
      server: manageService.sysOrgController.addOrganization,
      data: data
    })
  }
  /**
   * 删除组织机构
   */
  deleteDept({ deptId }) {
    return this.netService.send({
      server: manageService.sysOrgController.deleteDept,
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
      server: manageService.sysOrgController.updateDepartment,
      data: data
    })
  }
  /**
   * 根据机构查询公司
   */
  findCompanyByDeptId({ deptId }) {
    return this.netService.send({
      server: manageService.sysOrgController.findCompanyByDeptId,
      data: {
        deptId: deptId
      }
    })
  }
}