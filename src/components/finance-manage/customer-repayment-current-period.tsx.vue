<!-- 客户当期还款 -->
<template>
  <section class="component customer-repayment-current-period">
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="4">
        <i-button type="text" class="row-command-button" @click="showCustomerInfo({id:orderInfo.customerId})">{{orderInfo.customerName}}</i-button>
      </data-grid-item>
      <data-grid-item label="订单号" :span="4">
        <i-button type="text" class="row-command-button" @click="showOrderInfo(orderId)">{{orderInfo.orderNumber}}</i-button>
      </data-grid-item>
      <data-grid-item label="当前期数" :span="4">{{orderInfo.period}}</data-grid-item>
    </data-grid>
    <data-box :columns="columns" :data="dataSet" :height="400" ref="databox"></data-box>

    <i-form :model="model" :rules="rules" :label-width="140" ref="form">
      <i-form-item label="本次剩余还款金额">
        <i-input v-model="model.hasPayMoney" readonly></i-input>
      </i-form-item>
      <i-form-item label="还款金额" prop="payMoney">
        <i-input-number v-model="model.payMoney" :min="1" :max="model.hasPayMoney"></i-input-number>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";
import { namespace } from "vuex-class";
const CustomerOrderModule = namespace("customerOrderSpace")

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class CustomerRepaymentCurrentPeriod extends Vue {
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService) private financialManagementService: FinancialManagementService;
  @CustomerOrderModule.Action showOrderInfo;
  @CustomerOrderModule.Action showCustomerInfo;
  /**
   * 订单数据
   */
  @Prop({
    required: true,
    type: Object
  }) orderInfo: any;

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  private model: any = {
    hasPayMoney: 0,
    payMoney: 0
  }
  private rules: any = {
    payMoney: { required: true, message: "请输入要还款的金额", trigger: "blur", type: "number" }
  }

  get orderId() {
    return this.orderInfo.orderId
  }

  created() {
    this.columns = [
      {
        align: 'center',
        title: '序号',
        type: "index",
        width: 50
      },
      {
        align: 'center',
        title: '费用项目',
        key: 'expenseName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '编码',
        key: 'expenseCode',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '还款状态',
        key: 'repayStatus',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{this.$filter.dictConvert(row.repayStatus)}</span>)
      },
      {
        align: 'center',
        title: '还款金额',
        key: 'repayMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.repayMoney)}</div>)
      },
      {
        align: 'center',
        title: '已还金额',
        key: 'isRepayMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.repaisRepayMoneyyStatus)}</div>)
      }
    ]
  }

  mounted() {
    // 查询要还款的期数的详情
    this.financialQueryService.selectRepayInfo(this.orderId).subscribe(
      data => {
        this.dataSet = data.details
        this.model.hasPayMoney = data.totalMoney,
          this.model.payMoney = this.model.hasPayMoney
      },
      err => this.$Message.error(err.msg)
    )
  }

  submit() {
    let form = this.$refs.form as any;
    return new Promise((resolve) => {
      console.log('1111')
      form.validate(v => {
        if (!v) return resolve(false)
        this.financialManagementService.saveCustomerRepayment(this.model.payMoney, this.orderId, this.orderInfo.period)
          .subscribe(
            data => {
              this.$Message.success('操作成功')
              resolve(true)
            },
            err => {
              this.$Message.error(err.msg)
              resolve(false)
            }
          )
      })
    })
  }
}
</script>

<style lang="less">
.component.customer-repayment-current-period {
  .table {
    padding: 10px 0;
  }
}
</style>