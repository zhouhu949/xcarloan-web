import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class UserDeviceService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 一键启用设备
   */
  enableDevice({ userIds, userStatus, userType }) {
    return this.netService.send({
      server: manageService.userDeviceController.enableDevice,
      data: {
        userIds: userIds,
        userStatus: userStatus,
        userType: userType
      }
    })
  }
  /**
   * 一键禁用设备
   */
  disableDevice({ userIds, userStatus, userType }) {
    return this.netService.send({
      server: manageService.userDeviceController.disableDevice,
      data: {
        userIds: userIds,
        userStatus: userStatus,
        userType: userType
      }
    })
  }
  /**
  * 一键启用设备锁
  */
  enableDeviceLock({ userIds, userValidate, userType }) {
    return this.netService.send({
      server: manageService.userDeviceController.enableDeviceLock,
      data: {
        userIds: userIds,
        userValidate: userValidate,
        userType: userType
      }
    })
  }

  /**
 * 一键停用设备锁
 */
  disableDeviceLock({ userIds, userValidate, userType }) {
    return this.netService.send({
      server: manageService.userDeviceController.disableDeviceLock,
      data: {
        userIds: userIds,
        userValidate: userValidate,
        userType: userType
      }
    })
  }

  /**
* 一键重置设备
*/
  resetDevice({ userIds, userType }) {
    return this.netService.send({
      server: manageService.userDeviceController.resetDevice,
      data: {
        userIds: userIds,
        userType: userType
      }
    })
  }

  /**
   * 获取所选用户的设备
   */
  getUserDevice({ ids }) {
    return this.netService.send({
      server: manageService.userDeviceController.getUserDevice,
      data: {
        ids: ids
      }
    })
  }
}
