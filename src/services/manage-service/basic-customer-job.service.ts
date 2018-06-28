import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'
import { FilterService } from '~/utils/filter.service'

export class BasicCustomerJobService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户职业信息列表
   */
  @Debounce()
  findCustomPersonalJob(customerId) {
    return this.netService.send({
      server: manageService.basicPersonalJobController.findCustomPersonalJob,
      append: customerId
    })
  }
  /**
   * 新增客户职业信息
   */
  @Debounce()
  addPersonalJob(data) {
    let model = Object.assign({}, data)
    return this.netService.send({
      server: manageService.basicPersonalJobController.addPersonalJob,
      data: {
        id: model.id,
        customerId: model.customerId,
        companyName: model.companyName,
        companyNature: model.companyNature,
        industry: model.industry,
        jobType: model.jobType,
        basicSalary: model.basicSalary,
        companyAddress: model.companyAddress,
        companyAddressDetail: model.companyAddressDetail,
        accessCompanyTime: FilterService.dateFormat(model.accessCompanyTime),
        department: model.department,
        duty: model.duty,
        rank: model.rank,
        payDay: model.payDay,
        payWay: model.payWay,
        city: model.city,
        province: model.province,
        companyPhone: model.companyPhone,
        registeredCapital: model.registeredCapital,
        stockScale: model.stockScale,
        employeesNumber: model.employeesNumber,
        pastyearIncome: model.pastyearIncome,
        pastyearProfit: model.pastyearProfit,
        enterpriseManageBelong: model.enterpriseManageBelong,
        enterpriseManageYears: model.enterpriseManageYears,
        identity: model.identity,
        monthOtherIncome: model.monthOtherIncome,
        otherIncomeSource: model.otherIncomeSource,
        yearlySalaries: model.yearlySalaries,
        remark: model.remark
      },
      loading: true
    })
  }
  /**
   * 修改客户职业信息
   */
  @Debounce()
  updatePersonalJob(data) {
    let model = Object.assign({}, data)
    return this.netService.send({
      server: manageService.basicPersonalJobController.updatePersonalJob,
      data: {
        id: model.id,
        customerId: model.customerId,
        companyName: model.companyName,
        companyNature: model.companyNature,
        industry: model.industry,
        jobType: model.jobType,
        basicSalary: model.basicSalary,
        companyAddress: model.companyAddress,
        companyAddressDetail: model.companyAddressDetail,
        accessCompanyTime: FilterService.dateFormat(model.accessCompanyTime,"yyyy-MM-dd"),
        department: model.department,
        duty: model.duty,
        rank: model.rank,
        payDay: model.payDay,
        payWay: model.payWay,
        city: model.city,
        province: model.province,
        companyPhone: model.companyPhone,
        registeredCapital: model.registeredCapital,
        stockScale: model.stockScale,
        employeesNumber: model.employeesNumber,
        pastyearIncome: model.pastyearIncome,
        pastyearProfit: model.pastyearProfit,
        enterpriseManageBelong: model.enterpriseManageBelong,
        enterpriseManageYears: model.enterpriseManageYears,
        identity: model.identity,
        monthOtherIncome: model.monthOtherIncome,
        otherIncomeSource: model.otherIncomeSource,
        yearlySalaries: model.yearlySalaries,
        remark: model.remark
      },
      loading: true
    })
  }
  /**
   * 删除客户职业信息
   */
  @Debounce()
  deletePersonalJob(jobId) {
    return this.netService.send({
      server: manageService.basicPersonalJobController.deletePersonalJob,
      data: { id: jobId },
      loading: true
    })
  }
}