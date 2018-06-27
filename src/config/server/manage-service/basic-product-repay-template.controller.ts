//产品还款计划模板controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'basicProductRepayTemplateController'
export default {

  /**
   * 确认发布产品
   */
  publishBasicProduct: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'publishBasicProduct',
    type: requestType.Post
  },
  /**
   * 预览抵押贷款还款计划模板
   */
  queryBasicLoanProductTemplate: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryBasicLoanProductTemplate',
    type: requestType.Post
  },
  /**
   * 预览融资租赁产品还款计划
   */
  queryBasicProductCarScheme: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryBasicProductCarScheme',
    type: requestType.Post
  }
}