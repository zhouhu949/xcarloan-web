// 系统参数controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'userDeviceController'

export default {
  /**
   * 一键启用设备
   */
  enableDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'enableDevice',
    type: requestType.Post
  },
  /**
 * 一键启用设备
 */
  disableDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'disableDevice',
    type: requestType.Post
  },
  /**
* 一键启用设备锁
*/
  enableDeviceLock: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'enableDeviceLock',
    type: requestType.Post
  },
  /**
* 一键停用设备锁
*/
  disableDeviceLock: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'disableDeviceLock',
    type: requestType.Post
  },
  /**
* 一键重置设备
*/
  resetDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetDevice',
    type: requestType.Post
  },
  /**
  * 获取所选用户的设备
  */
  getUserDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserDevice',
    type: requestType.Get
  }
}