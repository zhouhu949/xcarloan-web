<!-- 押品详情 -->
<template>
  <section class="component detain-details">
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="6">{{model.customerName}}</data-grid-item>
      <data-grid-item label="客户电话" :span="6">{{model.customerPhone }}</data-grid-item>
      <data-grid-item label="车牌号" :span="6">{{model.carNo}}</data-grid-item>
      <data-grid-item label="是否二手车" :span="6">{{model.isSecondHand | dictConvert}}</data-grid-item>
      <data-grid-item label="购买方式" :span="6">{{model.buyType | dictConvert}}</data-grid-item>
      <data-grid-item label="抵押方式" :span="6">{{model.orderMortgageType | dictConvert}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FinanceDetainService } from "~/services/manage-service/finance-detain.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class DetainDetails extends Vue {
  @Dependencies(FinanceDetainService)
  private financeDetainService: FinanceDetainService;

  @Prop({
    default: 0,
    type:Number
  })
  detainId:number;

  private model: any = {
    // 购买方式
    buyType: "",
    // 车牌号
    carNo: "",
    // 客户姓名
    customerName: "",
    // 客户电话
    customerPhone: "",
    // 是否二手车
    isSecondHand: "",
    // 抵押方式
    orderMortgageType: "",
    // 初次登记时间
    registerTime: ""
  };

  /**
   *
   */
  mounted() {
    // 检查id是否存在
    if (this.detainId) {
      this.financeDetainService.getDetainDetails(this.detainId).subscribe(
        data => {
          if (data) this.model = data;
        },
        err => this.$Message.error(err)
      );
    }
  }
}
</script>

<style lang="less">
</style>