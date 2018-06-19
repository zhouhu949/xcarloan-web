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
   * 修改数据字典项
   */
  updateDataDict(data) {
    return this.netService.send({
      server: manageService.sysDictController.updateDataDict,
      data: data
    })
  }
  /**
   * 新增数据字典项
   */
  createSysDataDict(data) {
    return this.netService.send({
      server: manageService.sysDictController.createSysDataDict,
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

  /**
   * 查询所有数据字典类型
   */
  getAllSysDictType() {
    return this.netService.send({
        server: manageService.sysDictController.getAllSysDictType,
    })
  }
  modifyDataDictType(data) {
    return this.netService.send({
        server: manageService.sysDictController.modifyDataDictType,
        data
    })
  }
  /**
   * 新增数据字典类型
   */
  createDataDictType(data) {
    return this.netService.send({
      server: manageService.sysDictController.createDataDictType,
      data
    })
  }
}