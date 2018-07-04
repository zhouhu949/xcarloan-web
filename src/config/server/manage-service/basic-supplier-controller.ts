import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicSupplierController'

export default {
  /**
   * 查询供应商数据
   */
  queryBasicSupplierPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryBasicSupplierPage',
    type: requestType.Get
  },
  /**
   * 获取供应商列表
   */
  queryBasicSupplierList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryBasicSupplierList',
    type: requestType.Get
  },
  /**
   * 增加供应商
   */
  addBasicSupplier: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicSupplier',
    type: requestType.Post
  },
  /**
   * 修改供应商
   */
  editBasicSupplier: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editBasicSupplier',
    type: requestType.Put
  },
  /**
   * 删除供应商
   */
  deleteBasicSupplier: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteBasicSupplier',
    type: requestType.Delete
  },
  /**
   * 根据供应商ID查找供应商
   */
  getBasicSupplierById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getBasicSupplierById',
    type: requestType.Get
  },
  /**
   * 查询供应商列表
   */
  getBasicSupplierList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getBasicSupplierList',
    type: requestType.Get
  }
}