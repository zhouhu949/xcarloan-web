import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'financeDetainController'
export default {
  /**
   * 抵押入库
   */
  financeMortgageInStorage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financeMortgageInStorage',
    type: requestType.Post
  },
  /**
  * 抵押出库
  */
  financeMortgageOutStorage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financeMortgageOutStorage',
    type: requestType.Post
  },
  /**
  * 质押入库
  */
  financePledgeInStorage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financePledgeInStorage',
    type: requestType.Post
  },
  /**
   * 质押出库
   */
  financePledgeOutStorage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'financePledgeOutStorage',
    type: requestType.Post
  },
  /**
   * 出入库记录列表
   */
  getFinanceStorageList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getFinanceStorageList',
    type: requestType.Get
  },
  /**
   * 查看押品详情
   */
  getDetainDetails: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getDetainDetails',
    type: requestType.Get
  },
  /**
   * 查看抵押押品记录
   */
  getDetainMortRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getDetainMortRecord',
    type: requestType.Get
  },
  /**
   * 查看质押押品记录
   */
  getDetainPoleRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getDetainPoleRecord',
    type: requestType.Get
  }
}