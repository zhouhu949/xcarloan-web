const SERVICE = 'business-service'
const CONTROLLER = 'orderQueryController'

export default  {
  /**
   * 获取订单数据
   */
  getOrderQueryData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getOrderQueryData',
    type: 'Get'
  },
  /**
   * 获取订单进度
   */
  getOrderProgress: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getOrderProgress',
    type: 'Get'
  },
  /**
   * 产品包查询
   */
  getProductQuery: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getProductQuery',
    type: 'Get'
  }
}