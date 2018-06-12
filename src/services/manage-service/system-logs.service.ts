import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class SystemLogsService {
  @Inject()
  private netService: NetService

  /**
   * 导出系统日志
   */
  exportSystemLogs({ sysLogsIds }) {
    return this.netService.send({
      server: manageService.systemLogsController.exportSystemLogs,
      data: {
        sysLogsIds: sysLogsIds
      }
    })
  }

}