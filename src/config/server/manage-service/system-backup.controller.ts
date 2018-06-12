// 系统备份controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'systemBackup'

export default {
  /**
   * 分页查询系统备份
   */
  querySystemBackupPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'querySystemBackupPage',
    type: requestType.Get
  },
  /**
   * 删除系统备份
   */
  deleteSystemBackup: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteSystemBackup',
    type: requestType.Delete
  },
  /**
   * 新增系统备份
   */
  createSystemBackup: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createSystemBackup',
    type: requestType.Post
  }
}
