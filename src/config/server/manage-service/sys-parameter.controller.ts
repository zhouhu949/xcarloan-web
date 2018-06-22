// 系统参数controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysParameterController'

export default {
  /**
   * 分页查询系统参数
   */
  querySysParameterPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'querySysParameterPage',
    type: requestType.Get
  },
  /**
   * 创建系统参数
   */
  createSystemParameter: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createSystemParameter',
    type: requestType.Post
  },
  /**
 * 修改系统参数
 */
updateSysParameter: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateSysParameter',
    type: requestType.Post
  }
}