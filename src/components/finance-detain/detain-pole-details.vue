<!-- 查看抵押详情 -->
<template>
  <section class="component detain-details">
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="质押编号" :span="6">{{model.pledgeNo}}</data-grid-item>
      <data-grid-item label="质押地点" :span="6">{{model.pledgePlace}}</data-grid-item>
      <data-grid-item label="质押位置" :span="12">{{model.pledgePosition }}</data-grid-item>
      <data-grid-item label="入库日期" :span="6">{{model.stockInDate | dateFormat}}</data-grid-item>
      <data-grid-item label="出库日期" :span="6">{{model.stockOutDate | dateFormat}}</data-grid-item>
      <data-grid-item label="操作人" :span="6">{{model.operator}}</data-grid-item>
      <data-grid-item label="操作日期" :span="6">{{model.operatorTime | dateFormat}}</data-grid-item>
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
export default class DetainPoleDetails extends Vue {
  @Dependencies(FinanceDetainService)
  private financeDetainService: FinanceDetainService;

  @Prop({
    default: 0
  })
  detainId;

  private model: any = {
    // 操作人
    operator: "",
    // 操作时间
    operatorTime: "",
    // 质押编号
    pledgeNo: "",
    // 质押地点
    pledgePlace: "",
    // 质押位置
    pledgePosition: "",
    // 入库日期
    stockInDate: "",
    // 出库日期
    stockOutDate: ""
  };

  /**
   *
   */
  mounted() {
    this.getDetainPoleRecord();
  }

  /**
   * 获取详情
   */
  private getDetainPoleRecord() {
    if (this.detainId) {
      this.financeDetainService.getDetainPoleRecord(this.detainId).subscribe(
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