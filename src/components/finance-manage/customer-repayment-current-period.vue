<!-- 客户当期还款 -->
<template>
  <section class="component customer-repayment-current-period">
    <i-card title="订单信息" style="margin-bottom:20px;">
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="客户姓名" :span="4">
          <i-button type="text" class="row-command-button" @click="showCustomerInfo(orderInfo.customerId)">{{orderInfo.customerName}}</i-button>
        </data-grid-item>
        <data-grid-item label="订单号" :span="4">
          <i-button type="text" class="row-command-button" @click="showOrderInfo(orderId)">{{orderInfo.orderNumber}}</i-button>
        </data-grid-item>
        <data-grid-item label="当前期数" :span="4">{{``}}</data-grid-item>
      </data-grid>
    </i-card>

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

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class CustomerRepaymentCurrentPeriod extends Vue {
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;
  @CustomerOrderModule.Action showOrderInfo;
  @CustomerOrderModule.Action showCustomerInfo;
  /**
   * 订单号
   */
  @Prop({
    required: true,
    type: Number
  }) orderId: number;
  /**
   * 要付款的期数
   */
  @Prop({
    required: true,
    type: Number
  }) period: number;

  private orderInfo: any = {}

  mounted() {
    // 查询要还款的期数的详情
    this.financialQueryService.selectRepayInfo(this.orderId).subscribe(
      data => this.orderInfo = data,
      err => this.$Message.error(err.msg)
    )
  }
}
</script>

<style lang="less">
</style>