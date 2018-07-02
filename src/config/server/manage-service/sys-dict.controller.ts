// 数字字典对应的详细信息controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysDictController'

export default {
  
  /**
   * 修改数据字典项
   */
  updateDataDict: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateDataDict',
    type: requestType.Post
  },
  /**
   * 新增用户自定义数据字典项
   */
  createUserDataDict: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createUserDataDict',
    type: requestType.Post
  },
  /**
   * 删除用户自定义数据字典项
  */
  deleteDataDict: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteDataDict',
    type: requestType.Delete
  },
  /**
   * 查询系统数据字典项
  */
  getAll: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAll',
    type: requestType.Get
  },
  /**
  * 查询数据字典类型对应的数据字典项
  */
  getDataDictByTypeCode: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getDataDictByTypeCode',
    type: requestType.Get
  },
  /**
   * 查询系统数据字典类型
   */
  getAllSysDictType: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllSysDictType',
    type: requestType.Get
  },
  /**
 * 修改数据字典类型
 */
  modifyDataDictType: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'modifyDataDictType',
      type: requestType.Post
  },
  /**
   * 新增数据字典类型
   */
  createDataDictType: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createDataDictType',
    type: requestType.Post
  },
  /**
   * 查询所有用户字典类型
   */
  getAllUserDictType: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllUserDictType',
    type: requestType.Get
  },
  /**
   * 根据数据字典类型查询数据字典项
   */
  getSysItemBySysDictType: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSysItemBySysDictType',
    type: requestType.Get
  }
}