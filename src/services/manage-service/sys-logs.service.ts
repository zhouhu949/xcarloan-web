import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class SysLogsService {
  @Inject()
  private netService: NetService

  /**
   * 分页查询操作日志
   */
  querySysLogsPage(data, page) {
    return this.netService.send({
      server: manageService.SysLogsController.querySysLogsPage,
      data: data,
      page: page
    })
  }
}