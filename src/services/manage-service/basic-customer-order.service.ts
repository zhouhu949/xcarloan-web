import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'
import { PageService } from '~/utils/page.service';

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
  findCustomerOrderFinancialSituationList(orderId,page: PageService) {
    return this.netService.send({
      server: manageService.basicCustomerOrderController.findCustomerOrderFinancialSituationList,
      data: {
        orderId: orderId
      },
      page:page
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
}
