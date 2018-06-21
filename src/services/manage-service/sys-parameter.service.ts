import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class SysParameterService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 分页查询系统参数
   */
  querySysParameterPage(data, page) {
    return this.netService.send({
      server: manageService.SysParameterController.querySysParameterPage,
      data: data,
      page: page
    })
  }
  /**
   * 
   * @param data 创建系统参数
   */
  createSystemParameter(data) {
    return this.netService.send({
      server: manageService.SysParameterController.createSystemParameter,
      data: data
    })
  }
  /**
  * 
  * @param data 修改系统参数
  */
 updateSysParameter(data) {
    return this.netService.send({
      server: manageService.SysParameterController.updateSysParameter,
      data: data,
      loading: true
    })
  }
}
