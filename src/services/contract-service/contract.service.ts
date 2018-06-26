import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { contractService } from '~/config/server/contract-service'

export class ContractService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查看订单合同资料
   * @param orderId 订单ID
   */
  @Debounce()
  getContractResourceAll(orderId) {
    return this.netService.send({
      server: contractService.contractController.getContractResourceAll,
      append: orderId,
      loading:true
    })
  }
  /**
   * 合同资料上传
   * @param 资料实体
   */
  @Debounce()
  uploadContractResource(data) {
    return this.netService.send({
      server: contractService.contractController.uploadContractResource,
      data: {
        orderId: data.orderId,
        materialUrls: data.materialUrls
      },
      loading:true
    })
  }
}