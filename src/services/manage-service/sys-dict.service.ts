import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class SysDictService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查询所有数据字典类型
   */
  getDataDictByTypeCode({ typeCode }) {
    return this.netService.send({
      server: manageService.sysDictController.getDataDictByTypeCode,
      data: {
        typeCode: typeCode
      }
    })
  }
  /**
   * 新增/修改数据字典项
   */
  createOrModifyDataDict(data) {
    return this.netService.send({
      server: manageService.sysDictController.createOrModifyDataDict,
      data: data
    })
  }
  /**
   * 删除数据字典项
   */
  deleteDataDict({ id }) {
    return this.netService.send({
      server: manageService.sysDictController.deleteDataDict,
      data: {
        id: id
      }
    })
  }
  /**
   * 根据条件搜索对应的数字字典项
  */
  getAllDataDict(data, page) {
    return this.netService.send({
      server: manageService.sysDictController.getAllDataDict,
      data: data,
      page: page
    })
  }
  /**
   * 查询所有数据字典项(无typeCode)
  */
  getAll() {
    return this.netService.send({
      server: manageService.sysDictController.getAll,
    })
  }

  getDictHash() {
    return this.netService.send({
      server: manageService.sysDictController.getDictHash,
    })
  }

  /**
  * 获取字典数据
  */
  getDictData() {
    return this.netService.send({
      server: manageService.sysDictController.getDictData,
    })
  }

  /**
  * 分页查询数据字典类型对应的数据字典项
  */
  getDataDictByTypeCodeWithPage(data, page) {
    return this.netService.send({
      server: manageService.sysDictController.getDataDictByTypeCodeWithPage,
      data: data,
      page: page
    })
  }
}