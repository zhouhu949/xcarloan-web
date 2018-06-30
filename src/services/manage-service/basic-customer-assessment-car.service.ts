import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { FilterService } from '~/utils/filter.service'

export class BasicCustomerAssessmentCarService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取客户车产信息
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
        carNo: model.carNo,
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
    let model = Object.assign({}, data);

    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.addBasicCustomerAssessment,
      data: {
        // 申请评估日期
        assessmentApplyDate: FilterService.dateFormat(model.assessmentApplyDate, "yyyy-MM-dd"),
        // 评估日期
        assessmentDate: FilterService.dateFormat(model.assessmentDate, "yyyy-MM-dd"),
        // 评估结果
        assessmentResult: model.assessmentResult,
        // 评估状态
        assessmentStatus: model.assessmentStatus,
        // 车辆id
        carId: model.carId,
        // 车辆用途
        carPurpose: model.carPurpose,
        // 车况
        carSituation: model.carSituation,
        // 客户id
        customerId: model.customerId,
        // 排量
        displacement: model.displacement,
        // 驱动形式
        driver: model.driver,
        // 行驶证号
        drivingNo: model.drivingNo,
        // 估价
        evaluation: model.evaluation,
        // 出厂日期
        factoryTime: FilterService.dateFormat(model.factoryTime, "yyyy-MM-dd"),
        // 行驶里程
        mileAge: model.mileAge,
        // 备注
        remark: model.remark,
        // 过户次数
        transferNo: model.transferNo,
        // 变速箱形式
        transmission: model.transmission,
      },
      loading: true
    })
  }
  /**
   * 新增车产信息
   */
  @Debounce()
  addAssessmentApplication(data) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.addAssessmentApplication,
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

  /**
   * 获取押品基础信息
   * @param carId 车辆Id
   */
  findCustomerCarInfo(carId: number) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.findCustomerCarInfo,
      data: {
        carId: carId
      }
    })
  }
  /**
   * 修改车产信息
   */
  @Debounce()
  updateBasicCustomerCar(data) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.updateBasicCustomerCar,
      data: data,
      loading: true
    })
  }
  /**
   * 删除车产信息
   */
  @Debounce()
  deleteBasicCustomerCar(carId) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.deleteBasicCustomerCar,
      data: { id: carId },
      loading: true
    })
  }
  /**
   * 查询客户未抵押车辆 
   */
  getCustomerCarList(customerId) {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.getCustomerCarList,
      append: customerId
    })
  }

  /**
   * 获取评估车型列表
   */
  getAssessmentConfigList() {
    return this.netService.send({
      server: manageService.basicCustomerAssessmentCarController.getAssessmentConfigList
    })
  }

}
