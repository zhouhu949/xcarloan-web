import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { PageService } from '~/utils/page.service';
export class BasicExpenseService {
  @Inject()
  private netService: NetService

  /**
   * 新增费用项
   * @param data 新增实体
   */
  @Debounce()
  addBasicExpense(data: any): any {
    return this.netService.send({
      server: manageService.basicExpenseController.addBasicExpense,
      data: {
        expenseCode: data.expenseCode,
        expenseName: data.expenseName,
        isSystem: data.isSystem,
        remark: data.remark
      },
      loading: true
    })
  }

  /**
   * 修改费用项
   * @param data 修改实体
   */
  @Debounce()
  editBasicExpense(data: any): any {
    return this.netService.send({
      server: manageService.basicExpenseController.editBasicExpense,
      data: {
        id: data.id,
        expenseName: data.expenseName,
        remark: data.remark
      },
      loading: true
    })
  }

  /**
   * 删除费用项
   * @param expenseId 费用项id
   */
  @Debounce()
  deleteBasicExpense(expenseId: number): any {
    return this.netService.send({
      server: manageService.basicExpenseController.deleteBasicExpense,
      append: expenseId,
      loading: true
    })
  }

  /**
   * 复制模板
   */
  @Debounce()
  copyTemplate(): any {
    return this.netService.send({
      server: manageService.basicExpenseController.copyTemplate,
      loading: true
    })
  }
  /**
   * 获取当前用户所属机构下的费用项(下拉选用)
   */
  findBasicExpenseByOrg(): any {
    return this.netService.send({
      server: manageService.basicExpenseController.findBasicExpenseByOrg,
      loading: true
    })
  }
   /**
   * 获取当前用户所属机构下的费用项 带分页
   */
  findBasicExpensePageByOrg(page: PageService): any {
    return this.netService.send({
      server: manageService.basicExpenseController.findBasicExpensePageByOrg,
      page,
      loading: true
    })
  }
}
