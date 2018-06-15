//待办事项管理 backlog-controller
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'backlog'
export default {
  /**
   * 角色待分配事项
   */
  roleAllocateBacklogs: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'roleAllocateBacklogs',
    type: requestType.Post
  },
  /**
   * 获取所有待办事项
   */
  queryBacklog: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryBacklog',
    type: requestType.Get
  },
  /**
   * 查询角色下待办事项
   */
  findBacklogByRoleId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findBacklogByRoleId',
    type: requestType.Post
  },
  /**
   * 查询当前用户的待办事项
   */
  queryUserBacklog:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryUserBacklog',
    type: requestType.Get
  }
}