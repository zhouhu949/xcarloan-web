<!--放款记录-->
<template>
  <section class="component order-info-base-finance-loan">
    <data-grid class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id" >
      <data-grid-item label="订单ID" :span="4">{{item.orderId}}</data-grid-item>
      <data-grid-item label="操作日期" :span="4">{{item.operatorTime | dateFormat("yyyy-MM-dd")}}</data-grid-item>
      <data-grid-item label="是否收到发票" :span="4">{{item.hasInvoice }}</data-grid-item>
      <data-grid-item label="是否收到收据" :span="4">{{item.hasReceipt }}</data-grid-item>
      <data-grid-item label="放款日期" :span="4">{{item.loanDate | dateFormat("yyyy-MM-dd")}}</data-grid-item>
      <data-grid-item label="放款金额" :span="4">{{item.loanMoney | toThousands}}</data-grid-item>
      <data-grid-item label="放款类型" :span="4">{{item.loanType  }}</data-grid-item> 
      <data-grid-item label="备注" :span="4">{{item.remark}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid, DataGridItem
  }
})
export default class OrderInfoBaseFinanceLoan extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService
  @Prop() id: Number

  private dataSet: Array<any> = [];

  mounted() {
    this.basicCustomerOrderService.findCustomerOrderFinanceLoanList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
