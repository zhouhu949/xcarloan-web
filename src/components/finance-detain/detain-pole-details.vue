<!-- 修改库存车辆 -->
<template>
  <section>
    <i-form :label-width="90" ref="form" :model="model">
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="客户姓名" prop="customerName">
            <i-input v-model="model.customerName" :readonly="$parent.$parent.isView"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型名称" prop="modelName">
            <i-input v-model="model.modelName" :readonly="$parent.$parent.isView"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="车辆颜色" prop="modelColors">
            <i-input v-model="model.modelColors" :readonly="$parent.$parent.isView"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="状态" prop="carSize">
            <i-select v-model="model.stockStatus" :disabled="$parent.$parent.isView">
              <i-option v-for="{value,label} in $dict.getDictData(10014)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="车型参数描述" prop="orderCarDesc">
            <i-input v-model="model.orderCarDesc" :readonly="$parent.$parent.isView"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型描述" prop="orderCarParamDesc" :readonly="$parent.$parent.isView">
            <i-input v-model="model.orderCarParamDesc"></i-input>
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
import { Form } from "iview";
import { FinanceDetainService } from "~/services/manage-service/finance-detain.service";

@Component({})
export default class DetainPoleDetails extends Vue {
  @Dependencies(FinanceDetainService)
  private financeDetainService: FinanceDetainService;

  @Prop({
    default: 0
  })
  detainId;

  private model: any = {
    mortgageNum: 0,
    pledgePlace: "",
    pledgePosition: "",
    pledgeNo: "",
    operatorTime: "",
    operator: 1
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
      this.financeDetainService
        .getDetainPoleRecord(this.detainId)
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