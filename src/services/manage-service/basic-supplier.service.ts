import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class BasicSupplierService {
  @Inject()
  private netService: NetService

  /**
   * 搜索供应商
   */
  @Debounce()
  getBasicSupplierList(data, page) {
    return this.netService.send({
      server: manageService.basicSupplierController.getBasicSupplierList,
      data: {
        supplierName: data.name
      },
      page,
      loading: true
    })
  }

  /**
   * 根据供应商ID查找供应商
   * @param id 供应商ID
   */
  @Debounce()
  getBasicSupplierById(id) {
    return this.netService.send({
      server: manageService.basicSupplierController.getBasicSupplierById,
      append: id,
    })
  }

  /**
   * 修改供应商
   * @param data 修改实体
   */
  @Debounce()
  editBasicSupplier(data) {
    return this.netService.send({
      server: manageService.basicSupplierController.editBasicSupplier,
      data: {
        id: data.id,
        remark: data.remark,
        supplierAddress: data.supplierAddress,
        supplierName: data.supplierName,
        supplierPhone: data.supplierPhone
      },
      loading: true
    })
  }

  /**
   * 删除供应商
   * @param expenseId 供应商id
   */
  @Debounce()
  deleteBasicSupplier(id) {
    return this.netService.send({
      server: manageService.basicSupplierController.deleteBasicSupplier,
      append: id,
      loading: true
    })
  }

  /**
   * 新增供应商
   */
  @Debounce()
  addBasicSupplier(data) {
    return this.netService.send({
      server: manageService.basicSupplierController.addBasicSupplier,
      data: {
        remark: data.remark,
        supplierAddress: data.supplierAddress,
        supplierName: data.supplierName,
        supplierPhone: data.supplierPhone
      },
      loading: true
    })
  }

}
