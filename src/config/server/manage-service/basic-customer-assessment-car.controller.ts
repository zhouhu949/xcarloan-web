import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'basicCustomerAssessmentCarController'
export default {
  /**
   * 获取客户车产信息
   */
  getBasicCustomerCarList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getBasicCustomerCarList',
    type: requestType.Get
  }
}