import { businessService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject } from "~/core/decorator";

export class SysDictSerivce {

  @Inject()
  private netService: NetService

  /**
   * 获取字典Hash值
   */
  getDictHash() {
    return this.netService.send({
      server: businessService.sysDictController.getDictHash,
    })
  }

  /**
  * 获取字典数据
  */
  getDictData() {
    return this.netService.send({
      server: businessService.sysDictController.getDictData,
    })
  }
}

