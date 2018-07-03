<!-- 客户收款 首付款 -->
<template>
  <section class="component proceeds-customer-info">
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="6">
        <i-button type="text" class="row-command-button" @click="showCustomerInfo({id:orderInfo.customerId})">{{orderInfo.customerName}}</i-button>
      </data-grid-item>
      <data-grid-item label="订单号" :span="6">
        <i-button type="text" class="row-command-button" @click="showOrderInfo(orderId)">{{orderInfo.orderNumber}}</i-button>
      </data-grid-item>
    </data-grid>
    <data-box :columns="columns" :data="dataSet" :height="400" ref="databox"></data-box>
    <div class="sum-amt">
      合计金额：
      <b>{{sumAmt}}</b> 元
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class ProceedsCustomerInfo extends Vue {
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

  get orderId() {
    return this.orderInfo.orderId
  }

  /**
   * 合计金额
   */
  get sumAmt() {
    let result = 0;
    result = this.dataSet.reduce((s, c) => s + c.repayMoney, 0)
    return result
  }

  created() {
    this.columns = [
      {
        title: '序号',
        align: 'center',
        type: "index",
        minWidth: this.$common.getColumnWidth(1)
      },
      {
        align: 'center',
        title: '费用项名称',
        key: 'expenseName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '收款金额',
        key: 'repayMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('div', { class: { 'col-decimal': true } }, this.$filter.toThousands(row.repayMoney))
      }
    ]
  }

  mounted() {
    // 查询收款费用项
    this.financialQueryService.okReceipt(this.orderId).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 提交还款
   */
  submit() {
    return new Promise((resolve) => {
      this.financialManagementService.financialAffirm(this.orderId).subscribe(
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
  }

}
</script>

<style lang="less">
.component.proceeds-customer-info {
  .table {
    padding: 10px 0;
  }
}
</style>
<style lang="less" scoped>
.component.proceeds-customer-info {
  .sum-amt {
    text-align: right;
    padding-right: 50px;
  }
}
</style>