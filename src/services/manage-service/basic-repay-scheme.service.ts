import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
import { PageService } from '~/utils/page.service';

export class RepaySchemeService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取当前用户下组织机构下所有的还款方案
   */
  getAllBasicSchemeByOrgId() {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.getAllBasicSchemeByOrgId,
      loading: true
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
      append: id,
      loading: true
    })
  }
  /**
   * 新增/修改还款方案
   */
  repayScheme(data) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.repayScheme,
      data: data,
      loading: true
    })
  }
  /**
   * 删除还款方案
   */
  deleteRepayScheme(id) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.deleteRepayScheme,
      append: id,
      loading: true
    })
  }
  /**
  * 发布/取消发布还款方案
  */
  releaseRepayScheme(schemeId: Number, state: Number) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.releaseRepayScheme,
      data: {
        id: schemeId,
        schemeStatus: state
      },
      loading: true
    })
  }
  /**
   * 新增/修改还款方案比例详情
   */
  addBasicSchemeExpense(data) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.addBasicSchemeExpense,
      data: data,
      loading: true
    })
  }
  /**
   * 删除还款方案比例详情
   */
  deleteRepaySchemeExpense(id) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.deleteRepaySchemeExpense,
      append: id,
      loading: true
    })
  }
  /**
   * 获取已发布的方案
   */
  queryReleasedScheme(schemeName: String, schemeType: Number, page: PageService) {
    return this.netService.send({
      server: manageService.basicRepaySchemeController.queryReleasedScheme,
      data: {
        schemeName: schemeName,
        schemeType: schemeType
      },
      page
    })
  }
}