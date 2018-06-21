import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BasicOffsetService {
  @Inject()
  private netService: NetService

  /**
   * 获取所有冲抵策略
   */
  @Debounce()
  findBasicOffsetByAuth() {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetByAuth,
      loading: true
    })
  }

  /**
   * 新增冲抵策略
   * @param data 新增实体
   */
  @Debounce()
  addBasicOffset(data) {
    return this.netService.send({
      server: manageService.basicOffsetController.addBasicOffset,
      data: {
        offsetName: data.offsetName,
        offsetType: data.offsetType,
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
  addBasicOffsetItem(data) {
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
  updateBasicOffset(data) {
    return this.netService.send({
      server: manageService.basicOffsetController.editBasicOffset,
      data: {
        id: data.id,
        offsetName: data.offsetName,
        offsetType: data.offsetType,
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
  deleteBasicOffset(offsetId) {
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
  deleteBasicOffsetItem(offsetItemId) {
    return this.netService.send({
      server: manageService.basicOffsetController.deleteBasicOffsetItem,
      append: offsetItemId,
      loading: true
    })
  }

  /**
   * 获取当前用户所属机构下的冲抵策略
   * @param orgId 机构id
   */
  @Debounce()
  findBasicOffsetByOrg(orgId) {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetByOrg,
      append: orgId,
      loading: true
    })
  }

  /**
   * 查单条冲抵策略
   * @param offsetId 冲抵策略id
   */
  @Debounce()
  findBasicOffsetInfo(offsetId) {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetInfo,
      append: offsetId,
      loading: true
    })
  }

  /**
   * 查单条冲抵策略
   * @param offsetItemId 冲抵策略项id
   */
  @Debounce()
  findBasicOffsetItemInfo(offsetItemId) {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetItemInfo,
      append: offsetItemId,
      loading: true
    })
  }

  /**
   * 查询冲抵项列表
   * @param offsetItemId 冲抵策略id
   */
  @Debounce()
  findBasicOffsetItemList(offsetId) {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetItemList,
      append: offsetId,
      loading: true
    })
  }

  /**
   * 查询冲抵策略列表
   */
  @Debounce()
  findBasicOffsetList() {
    return this.netService.send({
      server: manageService.basicOffsetController.findBasicOffsetList,
      loading: true
    })
  }

  /**
   * 下移冲抵项
   * @param offsetItemId 冲抵项Id
   */
  @Debounce()
  moveDown(offsetItemId) {
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
  moveUp(offsetItemId) {
    return this.netService.send({
      server: manageService.basicOffsetController.moveUP,
      append: offsetItemId,
      loading: true
    })
  }
}