import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicCarManageController'

export default {
  /**
   * 车辆维护树
   */
  getAllCarTreeList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllCarTreeList',
    type: requestType.Get
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
    type: requestType.Put
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
    type: requestType.Put
  },
  /**
   * 新增车型
   */
  addCarModel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarModel',
    type: requestType.Post
  },
  /**
   * 删除车型
   */
  deleteCarModel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCarModel',
    type: requestType.Delete
  },
  /**
   * 修改车型
   */
  editCarModel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editCarModel',
    type: requestType.Put
  },
  /**
   * 查看车型
   */
   getCarModelById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarModelById',
    type: requestType.Get
  },
  /**
   * 根据车系id 查找品牌
   */
  getCarSeriesByCarName: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarSeriesByCarName',
    type: requestType.Get
  },
  /**
   * 查找车辆配置参数列表
   */
  findCarConfigParamList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCarConfigParamList',
    type: requestType.Get
  },
  /**
   * 添加车辆配置参数
   */
  addCarConfigParamInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarConfigParamInfo',
    type: requestType.Post
  },
  /**
   * 新增车型介绍
   */
  addCarIntenduceInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarIntenduceInfo',
    type: requestType.Post
  },
  /**
   * 查看车型介绍
   */
  findCarIntroduceList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCarIntroduceList',
    type: requestType.Get
  },
  /**
   * 删除车型介绍
   */
  deleteCarIntenduceInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCarIntenduceInfo',
    type: requestType.Delete
  },

  /**
   * 添加车辆主图
   */
  addCarModelPhoto: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addCarModelPhoto',
    type: requestType.Post
  }, 
  /**
   * 查看车辆基本参数
   */
  getCarParams: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarParams',
    type: requestType.Get
  },
  /**
   * 删除配置参数
   */
  deleteCarConfigParam: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteCarConfigParam',
    type: requestType.Delete
  },
  /**
   * 查看车辆主图
   */
  getCarModelPhotoList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCarModelPhotoList',
    type: requestType.Get
  },


}