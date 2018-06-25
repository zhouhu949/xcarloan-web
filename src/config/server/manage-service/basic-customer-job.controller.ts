import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicPersonalJobController'

export default {
  /**
   * 客户职业信息列表
   */
  findCustomPersonalJob: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomPersonalJob',
    type: requestType.Get
  }
}