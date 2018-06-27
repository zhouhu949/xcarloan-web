import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'BasicCustomerCenterController'

export default {
  /**
   * 意向客户列表
   */
  findPotentialCustomerList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findPotentialCustomerList',
    type: requestType.Get
  },
  /**
   * 历史客户列表
   */
  findHistoryCustomerList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findHistoryCustomerList',
    type: requestType.Get
  },
  /**
   * 白名单客户列表
   */
  findWhiteCustomerList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findWhiteCustomerList',
    type: requestType.Get
  },
  /**
   * 灰名单客户列表
   */
  findGrayCustomerList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findGrayCustomerList',
    type: requestType.Get
  },
  /**
   * 黑名单客户列表
   */
  findBlackCustomerList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBlackCustomerList',
    type: requestType.Get
  },
  /**
   * 正式客户列表
   */
  findFormalCustomerList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findFormalCustomerList',
    type: requestType.Get
  },
  /**
   * 获取黑白灰名单记录
   */
  findCustomerBlackListRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerBlackListRecord',
    type: requestType.Get
  },
  /**
   * 订单记录
   */
  findBasicCustomerOrderList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicCustomerOrderList',
    type: requestType.Get
  },
  /**
   * 黑名单客户移入意向客户
   */
  updateCustomerStatusBlack: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateCustomerStatusBlack',
    type: requestType.Post
  },
  /**
   * 白/灰名单移出
   */
  updateCustomerStatusWhite: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateCustomerStatusWhite',
    type: requestType.Post
  }
}