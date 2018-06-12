const SERVICE = 'business-service'
const CONTROLLER = 'resourceController'

export default  {
  /**
   * 获取资源HASH
   */
  getResourceHash: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resourceHashCode',
    type: 'Get'
  },
  /**
   * 获取资源数据
   */
  getResourceData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllResource',
    type: 'Get'
  }
}