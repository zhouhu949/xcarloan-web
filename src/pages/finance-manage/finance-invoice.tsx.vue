<template>
  <section class="page finance-invoice">
    <page-header title="财务开票" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="model" @on-search="refreshData" :page="pageService">
      <template slot="input">
        <i-form-item prop="state" label="是否已开票">
          <i-select v-model="model.state" clearable>
            <i-option v-for="{label,value} of $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
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
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import { PageService } from "~/utils/page.service";
import { namespace } from "vuex-class";
import { Button } from "iview";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import OrderCustomerInfo from "~/components/base-data/order-customer-info.vue";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Layout('workspace')
@Component({
  components: {}
})
export default class FinanceInvoice extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService) private financialManagementService: FinancialManagementService;
  @CustomerOrderModule.Action showOrderInfo;
  @CustomerOrderModule.Action showCustomerInfo;

  private model: any = {
    name: "",
    orderNo: "",
    idCard: "",
    phone: "",
    state: 10003 // 默认查询未开票
  };

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  created() {
    this.columns = [
      {
        title: '操作',
        fixed: 'left',
        align: 'center',
        width: this.$common.getOperateWidth(1),
        render: (h, { row }) => {
          if (row.isInvoice === 10003) {
            return (<i-button type="text" class="row-command-button" onClick={() => this.onSubmitClick(row.id)}>开票</i-button>)
          }
        }
      },
      {
        align: 'center',
        title: '订单号',
        key: 'orderNo',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.showOrderInfo(row.orderId)}>{row.orderNo}</i-button>)
      },
      {
        align: 'center',
        title: '客户姓名',
        key: 'customerName',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.showCustomerInfo({ id: row.customerId })}>{row.customerName}</i-button>)
      },
      {
        align: 'center',
        title: '开票金额',
        key: 'receivableDetialMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.receivableDetialMoney)}</div>)
      },
      {
        align: 'center',
        title: '电话号码',
        key: 'customerPhone',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '开票人',
        key: 'operatorName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '开票时间',
        key: 'receivableDate',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{this.$filter.dateTimeFormat(row.receivableDate)}</span>)
      },
    ]
  }

  activated() {
    this.refreshData()
  }

  mounted() {
    this.refreshData()
  }

  /**
   * 放款操作
   */
  private onSubmitClick(id: Number) {
    this.$Modal.confirm({
      content: "是否确认开票？",
      onOk: () => {
        this.financialManagementService.financialInvoice(id).subscribe(
          data => {
            this.$Message.success('操作成功')
            this.refreshData()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }

  private refreshData() {
    this.financialQueryService.queryFinancialInvoice(this.model, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>


<style lang="less" scoped>
</style>
