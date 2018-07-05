import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'basicOffsetController'

export default {
  /**
   * 新增冲抵策略
   */
  addBasicOffset: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicOffset',
    type: requestType.Post
  },
  /**
   * 新增冲抵项
   */
  addBasicOffsetItem: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addBasicOffsetItem',
    type: requestType.Post
  },
  /**
  * 维护冲抵策略
  */
  editBasicOffset: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editBasicOffset',
    type: requestType.Post
  },
  /**
  * 根据主键删除冲抵策略
  */
  deleteBasicOffset: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteBasicOffset',
    type: requestType.Delete
  },
  /**
  * 删除冲抵项
  */
  deleteBasicOffsetItem: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteBasicOffsetItem',
    type: requestType.Delete
  },
  /**
  * 获取当前用户所属机构下的冲抵策略
  */
  findBasicOffsetByOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicOffsetByOrg',
    type: requestType.Get
  },
  /**
  * 查单条冲抵策略
  */
  findBasicOffsetInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicOffsetInfo',
    type: requestType.Get
  },
  /**
  * 查单条冲抵项
  */
  findBasicOffsetItemInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicOffsetItemInfo',
    type: requestType.Get
  },
  /**
  * 查询冲抵项列表
  */
  findBasicOffsetItemList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicOffsetItemList',
    type: requestType.Get
  },
  /**
  * 查询冲抵策略列表
  */
  findBasicOffsetList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBasicOffsetList',
    type: requestType.Get
  },
  /**
  * 下移冲抵项
  */
  moveDown: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'moveDown',
    type: requestType.Get
  },
  /**
  * 上移冲抵项
  */
  moveUP: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'moveUP',
    type: requestType.Get
  },
  /**
   * 获取当前用户所属机构下的已发布的冲抵策略
   */
  findPublishBasicOffsetByOrg: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findPublishBasicOffsetByOrg',
    type: requestType.Get
  },
  /**
   * 冲抵策略取消发布
   */
  cancelPublishOffset: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'cancelPublishOffset',
    type: requestType.Put
  },
  /**
   * 冲抵策略发布
   */
  publishOffset: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'publishOffset',
    type: requestType.Put
  }
}