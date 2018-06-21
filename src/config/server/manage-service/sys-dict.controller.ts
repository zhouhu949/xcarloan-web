// 数字字典对应的详细信息controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'sysDictController'

export default {
  /**
   * 查询数字字典对应的数据字典项
   */
  getDataDictByTypeCode: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getDataDictByTypeCode',
    type: requestType.Get
  },
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
   * 新增数据字典项
   */
  createUserDataDict: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createUserDataDict',
    type: requestType.Post
  },
  /**
   * 删除数据字典项
  */
  deleteDataDict: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteDataDict',
    type: requestType.Delete
  },
  /**
   * 根据条件搜索对应的数字字典项
  */
  getAllDataDict: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllDataDict',
    type: requestType.Get
  },
  /**
   * 查询所有数据字典项(无typeCode)
  */
  getAll: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAll',
    type: requestType.Get
  },
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
  },
  /**
   * 获取字典数据
   */
  getDataDictByTypeCodeWithPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getDataDictByTypeCodeWithPage',
    type: 'GET'
  },
  /**
   * 查询所有数据字典类型
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
  }
}