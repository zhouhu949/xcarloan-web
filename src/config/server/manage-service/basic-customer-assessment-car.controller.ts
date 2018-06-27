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
  findCustomerAssessmentList:{
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
  }
}