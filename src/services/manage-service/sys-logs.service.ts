import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class SysLogsService {
  @Inject()
  private netService: NetService

  /**
   * 导出系统日志
   */
  exportSysLogs({ sysLogsIds }) {
    return this.netService.send({
      server: manageService.SysLogsController.exportSysLogs,
      data: {
        sysLogsIds: sysLogsIds
      }
    })
  }

}