<!--订单车辆-->
<template>
  <section class="component order-info-car">
    <data-grid class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id">
      <data-grid-item label="购买方式" :span="4">{{item.buyType}}</data-grid-item>
      <data-grid-item label="车型名称" :span="4">{{item.carModelName}}</data-grid-item>
      <data-grid-item label="车牌号" :span="4">{{item.carNo}}</data-grid-item>
      <data-grid-item label="抵押状态" :span="4">{{item.carStatus | dictConvert}}</data-grid-item>
      <data-grid-item label="车辆型号" :span="4">{{item.carType | dictConvert}}</data-grid-item>
      <data-grid-item label="客户ID" :span="4">{{item.customerId}}</data-grid-item>
      <data-grid-item label="贷款还清状态" :span="4">{{item.isLoanFinished | dictConvert }}</data-grid-item>
      <data-grid-item label="是否二手车" :span="4">{{item.isSecondHand | dictConvert}}</data-grid-item>
      <data-grid-item label="抵押登记次数" :span="4">{{item.mortgageNum}}</data-grid-item>
      <data-grid-item label="操作时间" :span="4">{{item.operatorTime | dateFormat}}</data-grid-item>
      <data-grid-item label="订单ID" :span="4">{{item.orderId}}</data-grid-item>
      <data-grid-item label="初次登记时间" :span="4">{{item.registerTime | dateFormat}}</data-grid-item>
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
  components: { DataGrid, DataGridItem }
})
export default class OrderInfoCar extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private dataSet: Array<any> = []

  mounted() {
    /**
     * 订单车辆
     */
    this.basicCustomerOrderService.getOrderCar(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
.component.order-info-car {
  .car-info {
    margin: 10px;
  }
}
</style>
