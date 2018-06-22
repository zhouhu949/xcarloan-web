import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class RepaySchemeService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取所有还款方案菜单
   */
  findAllBasicSchemeByAuth() {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.findAllBasicSchemeByAuth
    })
  }
  /**
   * 根据还款方案id获取还款方案信息
   */
  findSchemeById(id) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.findSchemeById,
      append: id,
      loading: true
    })
  }
  /**
   * 根据还款方案获取还款方案比例详情
   */
  findSchemeExpenseBySchemeId(id) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.findSchemeExpenseBySchemeId,
      append: id
    })
  }
  /**
   * 新增/修改还款方案
   */
  repayScheme(data) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.repayScheme,
      data: data
    }) 
  }
  /**
   * 删除还款方案
   */
  deleteRepayScheme(id) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.deleteRepayScheme,
      append: id
    }) 
  }
   /**
   * 发布/取消发布还款方案
   */
  releaseRepayScheme(data) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.releaseRepayScheme,
      data: data
    }) 
  }
  /**
   * 新增/修改还款方案比例详情
   */
  addBasicSchemeExpense(data) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.addBasicSchemeExpense,
      data: data
    }) 
  }
  /**
   * 删除还款方案比例详情
   */
  deleteRepaySchemeExpense(id) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.deleteRepaySchemeExpense,
      append: id
    }) 
  }
}