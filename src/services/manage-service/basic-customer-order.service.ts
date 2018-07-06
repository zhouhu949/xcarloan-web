import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'
import { PageService } from '~/utils/page.service';

export class BasicCustomerOrderService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 根据订单获取客户信息
   * @param orderId 订单id
   */
  getCustomerInfoByOrderId(orderId): any {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.getCustomerInfoByOrderId,
      data: {
        orderId: orderId
      }
    })
  }

  /**
   * 订单分页查询
   * @param queryParamsModel 查询参数实体
   * @param page 分页参数实体
   */
  query(queryParamsModel: any, page: PageService): any {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.query,
      data: {
        customerName: queryParamsModel.name,
        orderNo: queryParamsModel.orderNo,
        idCard: queryParamsModel.idCard,
        customerPhone: queryParamsModel.phone
      },
      page
    })
  }

  /**
   * 获取订单基本资料
   */
  findCustomerOrderInfo(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderInfo,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 融资租赁贷款计算器
   * @param productId 产品Id
   */
  findFinancingRepayDetail(productId: number): any {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findFinancingRepayDetail,
      data: {
        productId
      }
    })
  }
  /**
   * 获取押品资料
   */
  findCustomerCollateral(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerCollateral,
      data: {
        orderId: orderId
      }
    })
  }
  /** 
  *查询订单车辆
  */
  getOrderCar(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.getOrderCar,
      append: orderId
    })
  }
  /**
   * 还款计划
   */
  findCustomerOrderSchedule(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderSchedule,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 订单操作记录
   */
  findCustomerOrderRecord(orderId, page: PageService) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderRecord,
      data: {
        orderId: orderId
      },
      page: page
    })
  }
  /**
   * 收款记录
   */
  findCustomerOrderFinancialSituationList(orderId, page: PageService) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderFinancialSituationList,
      data: {
        orderId: orderId
      },
      page: page
    })
  }
  /**
   * 放款记录
   */
  findCustomerOrderFinanceLoanList(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderFinanceLoanList,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 提前收回记录
   */
  findCustomerOrderFinanceTakeBack(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderFinanceTakeBack,
      data: {
        orderId: orderId
      }
    })
  }
  /**
   * 提前结清记录
   */
  findCustomerOrderFinanceSettleList(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderFinanceSettleList,
      data: {
        orderId: orderId
      }
    })
  }
  /*
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

  /**
   * 查询待补填资料订单
   */
  queryCustomerOrderFile(data, page: PageService) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.queryCustomerOrderFile,
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
   * 修改订单金额
   * @param orderId 订单ID
   * @param orderAmt 订单金额
   */
  updateOrderPrice(orderId: Number, orderAmt: Number) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.updateOrderPrice,
      data: {
        orderId: orderId,
        price: orderAmt,
      }
    })
  }

  /**
   * 订单结案操作
   */
  updateOrderStatus(orderId) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.updateOrderStatus,
      data: {
        orderId: orderId
      }
    })
  }
}
