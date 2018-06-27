import { manageService } from '~/config/server/manage-service'
import { Inject, Debounce } from '~/core/decorator'
import { NetService } from '~/utils/net.service'

export class FinanceDetainService {
  @Inject()
  private netService: NetService;

  /**
   * 车辆库存列表
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  @Debounce()
  getFinanceStorageList(queryParamsModel, page) {
    return this.netService.send({
      server: manageService.financeDetainController.getFinanceStorageList,
      data: {
        orderNo: queryParamsModel.orderNo,
        customerName: queryParamsModel.customerName,
        mortgageStatus: queryParamsModel.mortgageStatus
      },
      page: page,
      loading: true
    })
  }

  /**
   * 抵押入库
   * @param data 抵押实体
   */
  @Debounce()
  financeMortgageInStorage(data) {
    return this.netService.send({
      server: manageService.financeDetainController.financeMortgageInStorage,
      data: {
        // 押品出入库id
        id: data.id,
        gpsNo: data.gpsNo,
        gpsManufactor: data.gpsManufactor,
        stockDate: data.stockDate,
      },
      loading: true
    })
  }

  /**
   * 抵押出库
   * @param data 抵押实体
   */
  @Debounce()
  financeMortgageOutStorage(data) {
    return this.netService.send({
      server: manageService.financeDetainController.financeMortgageOutStorage,
      data: {
        id: data.id,
        stockOutDate: data.stockOutDate,
      },
      loading: true
    })
  }

  /**
   * 质押入库
   * @param data 质押实体
   */
  @Debounce()
  financePledgeInStorage(data) {
    return this.netService.send({
      server: manageService.financeDetainController.financePledgeInStorage,
      data: {
        id: data.id,
        pledgePlace: data.pledgePlace,
        pledgePosition: data.pledgePosition,
        stockDate: data.stockDate,
      },
      loading: true
    })
  }

  /**
   * 质押出库
   * @param data 质押实体
   */
  @Debounce()
  financePledgeOutStorage(data) {
    return this.netService.send({
      server: manageService.financeDetainController.financePledgeOutStorage,
      data: {
        id: data.id,
        stockOutDate: data.stockOutDate,
      },
      loading: true
    })
  }

  /**
   * 查看押品详情
   * @param detainId 押品记录ID
   */
  getDetainDetails(detainId) {
    return this.netService.send({
      server: manageService.financeDetainController.getDetainDetails,
      append: detainId,
      loading: true
    })
  }

  /**
   * 查看抵押押品记录
   */
  getDetainMortRecord(detainId) {
    return this.netService.send({
      server: manageService.financeDetainController.getDetainMortRecord,
      append: detainId,
      loading: true
    })
  }

  /**
   * 查看质押押品记录
   */
  getDetainPoleRecord(detainId) {
    return this.netService.send({
      server: manageService.financeDetainController.getDetainPoleRecord,
      append: detainId,
      loading: true
    })
  }
}
