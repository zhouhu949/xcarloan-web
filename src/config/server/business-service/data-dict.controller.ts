const SERVICE = 'business-service'
const CONTROLLER = 'dataDictController'

export default  {
   /**
   * 获取字典HASH
   */
  getDictHash: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getHashCode',
    type: 'GET'
  },
  /**
   * 获取字典数据
   */
  getDictData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAll',
    type: 'GET'
  }
}