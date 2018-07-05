<!--押品资料-->
<template>
  <section class="component order-info-collateral">
    <data-grid class="collateral-info" :labelWidth="110" labelAlign="right" contentAlign="left" v-for="item of item" :key="item.id">
      <data-grid-item label="车牌号" :span="4">{{item.carNo }}</data-grid-item>
      <data-grid-item label="抵押状态" :span="4">{{item.carStatus | dictConvert}}</data-grid-item>
      <data-grid-item label="购车价格" :span="4">{{item.carPrice | toThousands}}</data-grid-item>
      <data-grid-item label="车辆型号" :span="4">{{item.carType | dictConvert}}</data-grid-item>
      <data-grid-item label="贷款还清状态" :span="4">{{item.isLoanFinished | dictConvert}}</data-grid-item>
      <data-grid-item label="是否二手车" :span="4">{{item.isSecondHand | dictConvert}}</data-grid-item>
      <data-grid-item label="抵押登记次数" :span="4">{{item.mortgageNum }}</data-grid-item>
      <data-grid-item label="操作人" :span="4">{{item.operator }}</data-grid-item>
      <data-grid-item label="订单id" :span="4">{{item.orderId }}</data-grid-item>
      <data-grid-item label="抵押方式" :span="4">{{item.orderMortgageType | dictConvert}}</data-grid-item>
      <data-grid-item label="订单编号" :span="4">{{item.orderNo }}</data-grid-item>
      <data-grid-item label="组织id " :span="4">{{item.orgId }}</data-grid-item>
      <data-grid-item label="初次登记日期" :span="4">{{item.registerTime | dateFormat }}</data-grid-item>
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
export default class OrderInfoCollateral extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private item: Array<any> = [];

  mounted() {
    /**
     * 获取押品资料
     */
    this.basicCustomerOrderService.findCustomerCollateral(this.id).subscribe(
      data => this.item = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
.component.order-info-collateral {
  .collateral-info {
    margin: 10px;
  }
}
</style>
