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
      server: manageService.sysLogsController.querySysLogsPage,
      data: data,
      page: page
    })
  }
  /**
   * 导出系统日志
   */
  exportSysLogs({ sysLogsIds }) {
    return this.netService.send({
      server: manageService.sysLogsController.exportSysLogs,
      data: {
        sysLogsIds: sysLogsIds
      }
    })
  }
}