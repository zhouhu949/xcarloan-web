import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class SysDictService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 新增数据字典类型
   */
  @Debounce()
  createDataDictType(data) {
    return this.netService.send({
      server: manageService.sysDictController.createDataDictType,
      data,
      loading: true
    })
  }

  /**
   * 修改数据字典类型
   * @param data 
   */
  @Debounce()
  modifyDataDictType(data) {
    return this.netService.send({
        server: manageService.sysDictController.modifyDataDictType,
        data
    })
  }

  /**
   * 查询系统数据字典类型
   */
  getAllSysDictType() {
    return this.netService.send({
        server: manageService.sysDictController.getAllSysDictType,
    })
  }

  /**
   * 查询系统数据字典项
  */
  getAll() {
    return this.netService.send({
      server: manageService.sysDictController.getAll,
    })
  }

  /**
   * 根据数据字典类型查询数据字典项
   */
  getSysItemBySysDictType(data) {
    return this.netService.send({
      server: manageService.sysDictController.getSysItemBySysDictType,
      data: data
    })
  }

  /**
  * 查询数据字典类型对应的数据字典项
  */
  getDataDictByTypeCode(data) {
    return this.netService.send({
      server: manageService.sysDictController.getDataDictByTypeCode,
      data: data
    })
  }

  /**
   * 查询用户自定义数据字典类型
   */
  getAllUserDictType() {
    return this.netService.send({
      server: manageService.sysDictController.getAllUserDictType
    })
  }

  /**
   * 新增用户自定义数据字典项
   */
  @Debounce()
  createUserDataDict(data) {
    return this.netService.send({
      server: manageService.sysDictController.createUserDataDict,
      data: data,
      loading: true
    })
  }

  /**
   * 修改数据字典项
   */
  @Debounce()
  updateDataDict(data) {
    return this.netService.send({
      server: manageService.sysDictController.updateDataDict,
      data: data,
      loading: true
    })
  }
   
  /**
   * 删除用户自定义数据字典项
   */
  @Debounce()
  deleteDataDict({ id }) {
    return this.netService.send({
      server: manageService.sysDictController.deleteDataDict,
      data: {
        id: id
      },
      loading: true
    })
  }
}