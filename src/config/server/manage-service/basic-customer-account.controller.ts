import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage';
const CONTROLLER = 'basicCustomerAccountController';

export default {
  /**
   * 客户开户绑卡
   */
  customerOpenAccount:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'customerOpenAccount',
    type: requestType.Post
  }
}