//backlog-controller : 待办事项管理
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class BackLogService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 角色分配代办事项
   */
  roleAllocateBacklogs(data) {
    return this.netService.send({
      server: manageService.backLogController.roleAllocateBacklogs,
      data: data
    })
  }
  /**
   * 查询所有待办事项
   */
  queryBacklog() {
    return this.netService.send({
      server: manageService.backLogController.queryBacklog
    })
  }
  /** 
   * 查询角色下待办事项
  */
  findBacklogByRoleId({ roleIds }) {
    return this.netService.send({
      server: manageService.backLogController.findBacklogByRoleId,
      data: {
        roleIds: roleIds
      }
    })
  }
  /**
   * 查询当前用户的待办事项
   */
  queryUserBacklog(){
     return this.netService.send({
      server: manageService.backLogController.queryUserBacklog
    })  
  }

}
