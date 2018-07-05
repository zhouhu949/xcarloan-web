import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicOffsetService {
  @Inject()
  private netService: NetService

  /**
   * 新增冲抵策略
   * @param data 新增实体
   */
  @Debounce()
  addBasicOffset(data: any): any {
    return this.netService.send({
      server: manageService.basicOffsetController.addBasicOffset,
      data: {
        offsetName: data.offsetName,
        orgId: data.orgId,
        remark: data.remark
      },
      loading: true
    })
  }

  /**
  * 新增冲抵策略
  * @param data 新增实体
  */
  @Debounce()
  addBasicOffsetItem(data: any): any {
    return this.netService.send({
      server: manageService.basicOffsetController.addBasicOffsetItem,
      data: {
        expenseId: data.expenseId,
        offsetId: data.offsetId,
      },
      loading: true
    })
  }

  /**
   * 修改费用项
   * @param data 修改实体
   */
  @Debounce()
  updateBasicOffset(data: any): any {
    return this.netService.send({
      server: manageService.basicOffsetController.editBasicOffset,
      data: {
        id: data.id,
        offsetName: data.offsetName,
        remark: data.remark
      },
      loading: true
    })
  }

  /**
   * 删除费用项
   * @param offsetId 费用项id
   */
  @Debounce()
  deleteBasicOffset(offsetId: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.deleteBasicOffset,
      append: offsetId,
      loading: true
    })
  }

  /**
   * 删除费用项
   * @param offsetId 费用项id
   */
  @Debounce()
  deleteBasicOffsetItem(offsetItemId: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.deleteBasicOffsetItem,
      append: offsetItemId,
      loading: true
    })
  }

  /**
   * 获取当前用户所属机构下的冲抵策略
   */
  findBasicOffsetByOrg(): any {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetByOrg
    })
  }

  /**
   * 查单条冲抵策略
   * @param offsetId 冲抵策略id
   */
  findBasicOffsetInfo(offsetId: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetInfo,
      append: offsetId
    })
  }

  /**
   * 查单条冲抵策略
   * @param offsetItemId 冲抵策略项id
   */
  findBasicOffsetItemInfo(offsetItemId: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetItemInfo,
      append: offsetItemId,
      loading: true
    })
  }

  /**
   * 查询冲抵项列表
   * @param offsetId 冲抵策略id
   */
  @Debounce()
  findBasicOffsetItemList(offsetId: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetItemList,
      append: offsetId,
      loading: true
    })
  }

  /**
   * 查询冲抵策略列表
   */
  findBasicOffsetList(): any {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetList
    })
  }

  /**
   * 下移冲抵项
   * @param offsetItemId 冲抵项Id
   */
  @Debounce()
  moveDown(offsetItemId: any): any {
    return this.netService.send({
      server: manageService.basicOffsetController.moveDown,
      append: offsetItemId,
      loading: true
    })
  }

  /**
   * 上移冲抵项
   * @param offsetItemId 冲抵项Id
   */
  @Debounce()
  moveUp(offsetItemId: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.moveUP,
      append: offsetItemId,
      loading: true
    })
  }

  /**
   * 获取当前用户所属机构下的已发布的冲抵策略
   */
  findPublishBasicOffsetByOrg(): any {
    return this.netService.send({
      server: manageService.basicOffsetController.findPublishBasicOffsetByOrg
    })
  }

  /**
   * 取消冲抵策略发布
   * @param id 冲抵策略Id
   */
  @Debounce()
  cancelPublishOffset(id: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.cancelPublishOffset,
      append: id,
      loading: true
    })
  }

  /**
   * 冲抵策略发布
   * @param id 冲抵策略Id
   */
  @Debounce()
  publishOffset(id: number): any {
    return this.netService.send({
      server: manageService.basicOffsetController.publishOffset,
      append: id,
      loading: true
    })
  }
}