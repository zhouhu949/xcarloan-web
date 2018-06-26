import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage';
const CONTROLLER = 'basicEnterShellSaveController';

export default {
  /**
   * 外采列表
   */
  queryOutSideList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "queryOutSideList",
    type: requestType.Get
  },
  /**
   * 获取订单车辆详情
   */
  getOrderCarById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "getOrderCarById",
    type: requestType.Get
  },
  /**
   * 外采时添加库存
   */
  addOrderCarStock: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "addOrderCarStock",
    type: requestType.Post
  }
}
