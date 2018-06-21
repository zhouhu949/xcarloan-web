import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicCarManageController'

export default {
  /**
   * 车辆维护树
   */
  findAllCarTreeList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllCarTreeList',
    type: requestType.Post
  },
  /**
   * 增加车辆品牌
   */
  addCarBrand: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarBrand',
    type: requestType.Post
  },
  /**
   * 修改车辆品牌
   */
  editCarBrand: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editCarBrand',
    type: requestType.Post
  },
  /**
   * 查看车辆品牌
   */
  getCarBrandById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarBrandById',
    type: requestType.Get
  },
  /**
   * 删除车辆品牌
   */
  deleteCarBrand: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCarBrand',
    type: requestType.Delete
  },
  /**
   * 新增车系
   */
  addCarSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarSeries',
    type: requestType.Post
  },
  /**
   * 删除车系
   */
  deleteCarSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCarSeries',
    type: requestType.Delete
  },
  /**
   * 查看车系
   */
  getCarSeriesById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarSeriesById',
    type: requestType.Get
  },
  /**
   * 修改车系
   */
  editCarSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editCarSeries',
    type: requestType.Post
  },
 /**
  * 新增车型
  */
 addCarModel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarModel',
    type: requestType.Post
  }


}