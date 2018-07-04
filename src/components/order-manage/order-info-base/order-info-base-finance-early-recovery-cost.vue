<!--提前收回记录-->
<template>
  <section class="component order-info-base-finance-early-recovery-cost">
    <data-grid class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id" >
      <data-grid-item label="订单ID" :span="4">{{item.orderId}}</data-grid-item>
      <data-grid-item label="操作日期" :span="4">{{item.operatorTime | dateFormat}}</data-grid-item>
      <data-grid-item label="提前收回时间 " :span="4">{{item.takebackDate  | dateFormat}}</data-grid-item>
      <data-grid-item label="提前收回金额" :span="4">{{item.takebackMoney }}</data-grid-item>
      <data-grid-item label="收款记录ID" :span="4">{{item.receivableId }}</data-grid-item> 
      <data-grid-item label="备注" :span="4">{{item.remark}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";


@Component({
  components: { DataGrid, DataGridItem }
})
export default class OrderInfoBaseFinanceEarlyRecoveryCost extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private dataSet: Array<any> = []

  mounted() {
    this.basicCustomerOrderService.findCustomerOrderFinanceTakeBack(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
