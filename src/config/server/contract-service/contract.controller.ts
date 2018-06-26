import { requestType } from '~/config/enum.config'

const SERVICE = 'service-contract'
const CONTROLLER = 'contractController'

export default {
  /**
   * 查看订单合同资料
   */
  getContractResourceAll: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getContractResourceAll',
    type: requestType.Get
  },
  /**
  * 合同资料的上传
  */
  uploadContractResource: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'uploadContractResource',
    type: requestType.Post
  }
}