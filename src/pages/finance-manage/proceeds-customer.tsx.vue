<template>
  <section class="page proceeds-customer">
    <page-header title="客户收款" hidden-print hidden-export></page-header>
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
import ProceedsCustomerInfo from "~/components/finance-manage/proceeds-customer-info.vue";
import { Button } from "iview";
import { namespace } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { Layout, Dependencies } from '~/core/decorator'
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Layout('workspace')
@Component({
  components: {}
})
export default class ProceedsCustomer extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;
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
            <i-button type="text" class="row-command-button" onClick={() => this.onProceedClick(row)}>收款</i-button>
          </div>
        )
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
        key: 'orderNo',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.showCustomerInfo({ id: row.customerId })}>{row.customerName}</i-button>)
      },
      {
        align: 'center',
        title: '收款金额',
        key: 'proceedMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.proceedMoney)}</div>)
      },
      {
        align: 'center',
        title: '是否已收款',
        key: 'repay',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{row.repay === 1 ? "已收款" : "未收款"}</span>)
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
   * 收款点击
   */
  private onProceedClick(rowData) {
    let data = {
      orderId: rowData.orderId,
      orderNumber: rowData.orderNo,
      customerId: rowData.customerId,
      customerName: rowData.customerName
    }
    this.$dialog.show({
      title: "客户收款",
      footer: true,
      onOk: proceed => {
        return proceed.submit().then(v => {
          if (v) this.refreshData()
          return v
        })
      },
      render: h => (<ProceedsCustomerInfo orderInfo={data}></ProceedsCustomerInfo>)
    })
  }


  private refreshData() {
    this.financialQueryService.findGathering(this.model, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }


}
</script>


<style lang="less" scoped>
</style>
