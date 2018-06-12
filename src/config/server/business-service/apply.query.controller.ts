const SERVICE = 'business-service'
const CONTROLLER = 'applyQueryController'

export default {
  /**
   * 全款销售申请查询
   */
  getFullQueryData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getFullQueryData',
    type: 'Get'
  },
  /**
   * 添加车辆信息查询
   */
  addCarQueryData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarQueryData',
    type: 'Get'
  }
}