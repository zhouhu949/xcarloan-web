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
  },
  /**
   * 客户评估列表
   */
  findCustomerAssessmentList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerAssessmentList',
    type: requestType.Get
  },
  /**
   * 新增评估
   */
  addBasicCustomerAssessment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicCustomerAssessment',
    type: requestType.Post
  },
  /**
   * 查看评估详情
   */
  findAssessmentReportInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAssessmentReportInfo',
    type: requestType.Get
  },
  /**
   * 查看评估报告列表
   */
  findAssessmentReportList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAssessmentReportList',
    type: requestType.Get
  },
  /**
   * 获取押品基础信息
   */
  findCustomerCarInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCustomerCarInfo',
    type: requestType.Get
  },
  /*
   * 新增车产信息
   */
  addAssessmentApplication: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addAssessmentApplication',
    type: requestType.Post
  },
  /**
   * 修改车产信息
   */
  updateBasicCustomerCar: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateBasicCustomerCar',
    type: requestType.Put
  },
  /**
   * 删除车产信息
   */
  deleteBasicCustomerCar: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteBasicCustomerCar',
    type: requestType.Delete
  },
  /**
   * 查询客户未抵押车辆 
   */
  getCustomerCarList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCustomerCarList',
    type: requestType.Get
  },
  getAssessmentConfigList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAssessmentConfigList',
    type: requestType.Get
  }
}