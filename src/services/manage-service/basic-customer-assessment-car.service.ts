import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { PageService } from "~/utils/page.service";

export class BasicCustomerAssessmentCarService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户车产列表
   * @param customerId 客户Id
   */
  getBasicCustomerCarList(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.getBasicCustomerCarList,
      append: customerId
    })
  }

  /**
   * 客户评估列表
   * @param model 查询参数实体
   * @param page 分页参数实体
   */
  findCustomerAssessmentList(model, page: PageService) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.findCustomerAssessmentList,
      data: {
        orderNo: model.orderNo,
        customerName: model.customerName
      },
      page: page
    })
  }

  /**
   * 新增评估
   * @param data 评估实体
   */
  @Debounce()
  addBasicCustomerAssessment(data) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.addBasicCustomerAssessment,
      data: data,
      loading: true
    })
  }

  /**
   * 客户评估列表
   * @param carId 车辆id
   * @param page 分页参数查询实体
   */
  findAssessmentReportList(carId: number, page: PageService) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.findAssessmentReportList,
      data: {
        carId: carId
      },
      page: page
    })
  }

  /**
   * 查看评估详情
   * @param assessmentReportId 评估报告id
   */
  findAssessmentReportInfo(assessmentReportId: number) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.findAssessmentReportInfo,
      data: {
        assessmentReportId: assessmentReportId
      }
    })
  }
}
