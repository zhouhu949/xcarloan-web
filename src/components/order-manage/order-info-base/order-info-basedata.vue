<!--基础信息-->
<template>
  <section class="component order-info-basedata">
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      <data-grid-item label="订单编号" :span="4">{{dataSet.orderNo}}</data-grid-item>
      <data-grid-item label="成交价格" :span="4">{{dataSet.orderPrice | toThousands}}</data-grid-item>
      <data-grid-item label="还款方式" :span="4">{{dataSet.orderRepayType | dictConvert}}</data-grid-item>
      <data-grid-item label="订单状态" :span="4">{{dataSet.orderStatus | dictConvert}}</data-grid-item>
      <data-grid-item label="抵押方式" :span="4">{{dataSet.orderMortgageType | dictConvert}}</data-grid-item>
      <data-grid-item label="征信保护天数" :span="4">{{dataSet.orderCreditDays}}</data-grid-item>
      <data-grid-item label="逾期保护天数" :span="4">{{dataSet.orderOverdueDays}}</data-grid-item>
      <data-grid-item label="利率(%)" :span="4">{{dataSet.orderInterestRate}}</data-grid-item>
      <data-grid-item label="周期类型" :span="4">{{dataSet.orderCycleType | dictConvert}}</data-grid-item>
      <data-grid-item label="还款日" :span="4">{{dataSet.orderAccountDay}}</data-grid-item>
      <data-grid-item label="期数" :span="4">{{dataSet.orderPeriods}}</data-grid-item>
      <data-grid-item label="备注" :span="4">{{dataSet.remark}}</data-grid-item>
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
  components: { DataGrid, DataGridItem }
})
export default class OrderInfoBasedata extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private dataSet: any = {}

  mounted() {
    /**
     * 获取订单基本资料
     */
    this.basicCustomerOrderService.findCustomerOrderInfo(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
