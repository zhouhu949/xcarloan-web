import { businessService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject } from "~/core/decorator";

export class ResourceSerivce {

  @Inject()
  private netService: NetService

  /**
   * 获取资源Hash值
   */
  getResourceHash() {
    return this.netService.send({
      server: businessService.resourceController.getResourceHash,
    })
  }

  /**
  * 获取资源数据
  */
  getResourceData() {
    return this.netService.send({
      server: businessService.resourceController.getResourceData,
    })
  }
}

