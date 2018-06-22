// 系统日志controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysLogsController'

export default {
  /**
   * 分页查询操作日志
   */
  querySysLogsPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'querySysLogsPage',
    type: requestType.Get
  },
  /**
   * 导出系统日志
   */
  exportSysLogs: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'exportSysLogs',
    type: requestType.Post
  }
}