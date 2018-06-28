<!-- 修改库存车辆 -->
<template>
  <section>
    <i-form :label-width="90" ref="form" :model="model">
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="客户姓名" prop="mortgageNum">
            <i-input v-model="model.mortgageNum" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型名称" prop="mortgageNo">
            <i-input v-model="model.mortgageNo" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="设备编码" prop="gpsNo">
            <i-input v-model="model.gpsNo" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="设备厂商" prop="gpsManufactor">
            <i-input v-model="model.gpsManufactor" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="时间" prop="operatorTime">
           <i-date-picker type="datetime" placeholder="时间" v-model="model.operatorTime"></i-date-picker>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FinanceDetainService } from "~/services/manage-service/finance-detain.service";

@Component({})
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
          data => (this.model = data),
          err => this.$Message.error(err)
        );
    }
  }
}
</script>
<style lang="less">
</style>