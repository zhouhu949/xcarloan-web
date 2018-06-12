import { businessService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class RoleService {
  @Inject()
  private netService: NetService

  /**
   * 获取所有角色
   */
  queryRolePage() {
    console.log(24)
    return this.netService.send({
      server: businessService.roleController.queryRolePage,
      data: {
        page: 1,
        size: 10
      }
    })
  }

}