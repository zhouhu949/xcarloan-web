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
  }
}
