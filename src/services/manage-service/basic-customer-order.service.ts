import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class BasicCustomerOrderService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据订单获取客户信息
   */
  @Debounce()
  getCustomerInfoByOrderId(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.getCustomerInfoByOrderId,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 订单分页查询
   */
  query(data, page) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.query,
      data: {
        customerName: data.name,
        orderNo: data.orderNo,
        idCard: data.idCard,
        customerPhone: data.phone
      },
      page
    })
  }
  /**
   * 融资租赁贷款计算器
   */
  findFinancingRepayDetail(productId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findFinancingRepayDetail,
      data: {
        productId
      }
    })
  }
  /**
   * 抵押贷款计算器
   */
  findMortgageRepayDetail(schemeId: Number, loanAmt: Number) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findMortgageRepayDetail,
      data: {
        schemeId: schemeId,
        amount: loanAmt
      }
    })
  }

  /**
   * 创建抵押贷款申请订单
   * @param customerId 客户ID
   * @param carIds 抵押车辆ID集合
   * @param schemeId 方案ID
   * @param loanAmt 贷款金额
   */
  createMortgageOrder(customerId: Number, carIds: Array<Number>, schemeId: Number, loanAmt: Number) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.createMortgageOrder,
      data: {
        amount: loanAmt,
        carIds: carIds,
        customerId: customerId,
        schemeId: schemeId
      }
    })
  }

  /**
   * 创建融资租赁申请订单
   * @param customerId 客户ID
   * @param carId 车辆ID
   * @param productId 产品ID
   */
  createFinancingOrder(customerId: Number, carId: Number, productId: Number) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.createFinancingOrder,
      data: {
        customerId: customerId,
        modelId: carId,
        productId: productId
      }
    })
  }
}