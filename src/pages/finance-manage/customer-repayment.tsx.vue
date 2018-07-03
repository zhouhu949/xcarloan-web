<!--客户还款-->
<template>
  <section class="page proceeds-for-customer">
    <page-header title="客户还款" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="model" @on-search="refreshData" :page="pageService">
      <template slot="input">
        <i-form-item prop="name" label="姓名">
          <i-input v-model="model.name" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="orderNo" label="订单号">
          <i-input v-model="model.orderNo" placeholder="请输入订单号"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号">
          <i-input v-model="model.idCard" placeholder="请输入身份证号"></i-input>
        </i-form-item>
        <i-form-item prop="phone" label="联系电话">
          <i-input v-model="model.phone" placeholder="请输入联系电话"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" @on-page-change="refreshData" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="tsx">
import Page from '~/core/page'
import Component from "vue-class-component";
import CarParams from "~/components/base-data/car-params.vue";
import CustomerRepaymentCurrentPeriod from "~/components/finance-manage/customer-repayment-current-period.vue";
import { Button } from "iview";
import { namespace } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { Layout, Dependencies } from '~/core/decorator'
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Layout('workspace')
@Component({
  components: {}
})
export default class ProceedsForCustomer extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService) private financialManagementService: FinancialManagementService;
  @Dependencies(BasicSupplierService) private basicSupplierService: BasicSupplierService;
  @CustomerOrderModule.Action showOrderInfo;
  @CustomerOrderModule.Action showCustomerInfo;
  private model: any = {
    name: "",
    orderNo: "",
    idCard: "",
    phone: ""
  };

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  created() {
    this.columns = [
      {
        title: '操作',
        fixed: 'left',
        align: 'center',
        width: this.$common.getOperateWidth(2),
        render: (h, { row }) => (
          <div>
            <i-button type="text" class="row-command-button" onClick={() => this.onRepaymentClick(row.orderId, row.orderPeriods)}>还款</i-button>
            <i-button type="text" class="row-command-button" onClick={() => this.onPaymenyDetailClick(row.orderId)}>还款总览</i-button>
          </div>
        )
      },
      {
        align: 'center',
        title: ' 订单号',
        key: 'orderNo',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.showOrderInfo(row.orderId)}>{row.orderNo}</i-button>)
      },
      {
        align: 'center',
        title: ' 客户姓名',
        key: 'customerName',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.showCustomerInfo({ id: row.customerId })}>{row.customerName}</i-button>)
      },
      {
        align: 'center',
        title: ' 订单状态',
        key: 'orderStatus',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{this.$filter.dictConvert(row.orderStatus)}</span>)
      },
      {
        align: 'center',
        title: ' 订单类型',
        key: 'orderType',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{this.$filter.dictConvert(row.orderType)}</span>)
      },
      {
        align: 'center',
        title: ' 订单期数',
        key: 'orderPeriods',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 订单金额',
        key: 'orderPrice',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.orderPrice)}</div>)
      },
      {
        align: 'center',
        title: ' 电话号码',
        key: 'customerPhone',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 身份证号',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(4)
      }
    ]
  }

  activated() {
    this.refreshData()
  }

  mounted() {
    this.refreshData()
  }

  /**
   * 还款总览点击
   */
  private onPaymenyDetailClick(orderId: Number) {

  }


  /**
   * 还款操作
   * @param orderId 订单号
   * @param period 还款期数
   */
  private onRepaymentClick(orderId: Number, period: Number) {
    this.$dialog.show({
      title: "客户还款",
      width: 1050,
      footer: true,
      onOk: payment => {
        return true
      },
      render: h => (<CustomerRepaymentCurrentPeriod orderId={orderId} period={period}></CustomerRepaymentCurrentPeriod>)
    })
  }

  private refreshData() {
    this.financialQueryService.findRepayOrderList(this.model, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }
}
</script>


<style lang="less" scoped>
</style>
