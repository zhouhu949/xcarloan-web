<!-- 查看质押详情 -->
<template>
  <section class="component detain-details">
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="设备编码" :span="6">{{model.gpsNo}}</data-grid-item>
      <data-grid-item label="设备厂商" :span="6">{{model.gpsManufactor | dictConvert}}</data-grid-item>
      <data-grid-item label="操作时间" :span="6">{{model.operatorTime | dateFormat("yyyy-MM-dd hh:mm:ss")}}</data-grid-item>
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
  components:{
    DataGrid,
    DataGridItem
  }
})
export default class DetainMortDetails extends Vue {
  @Dependencies(FinanceDetainService)
  private financeDetainService: FinanceDetainService;

  @Prop({
    default: 0
  })
  detainId;

  private model: any = {
    mortgageNum: "",
    mortgageNo: "",
    gpsManufactor: "",
    gpsNo: "",
    operatorTime: "",
    operator: ""
  };

  /**
   *
   */
  mounted() {
    this.getDetainMortRecord();
  }

  /**
   * 获取详情
   */
  private getDetainMortRecord() {
    if (this.detainId) {
      this.financeDetainService
        .getDetainMortRecord(this.detainId)
        .subscribe(
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