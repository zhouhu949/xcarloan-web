import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service'

export class BasicCustomerAccountService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 客户开户绑卡
   * @param data 实体
   */
  @Debounce()
  customerOpenAccount(data) {
    return this.netService.send({
      server: manageService.basicCustomerAccountController.customerOpenAccount,
      data:{
        accountStatus: data.accountStatus,
        accountType: data.accountType,
        bankBranch: data.bankBranch,
        bankName: data.bankName,
        cardNo: data.cardNo,
        clientNumber: data.clientNumber,
        customerId: data.customerId,
        depositCity: data.depositCity,
        id: data.id,
        operator: data.operator,
        operatorTime: data.operatorTime,
        remark: data.remark,
      },
      loading: true
    })
  }
}