<!-- 修改库存车辆 -->
<template>
  <section>
<i-form :label-width="90" ref="form" :model="model">
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="客户姓名" prop="customerName">
            <i-input v-model="model.customerName" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型名称" prop="modelName">
            <i-input v-model="model.modelName" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车辆颜色" prop="modelColors">
            <i-input v-model="model.modelColors"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="状态" prop="carSize">
          <i-select v-model="model.stockStatus">
            <i-option v-for="{value,label} in $dict.getDictData(10014)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型参数描述" prop="orderCarDesc">
            <i-input v-model="model.orderCarDesc"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型描述" prop="orderCarParamDesc">
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
import { State, Getter, namespace } from "vuex-class";
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { BasicEnterShellSaveService } from "~/services/manage-service/basic-enter-shell-save.service";

@Component({})
export default class OrderCarDetails extends Vue {
  @Dependencies(BasicEnterShellSaveService)
  private basicEnterShellSaveService: BasicEnterShellSaveService;

  @Prop({
    default: 0
  })
  orderId;

  private model: any = {
    modelName: "",
    modelColors: "",
    stockStatus: 0,
    orderCarParamDesc: "",
    orderCarDesc: "",
    customerName: ""
  };

  /**
   *
   */
  mounted() {
    this.getOrderCarById();
  }

  /**
   * 获取供应商信息
   */
  private getOrderCarById() {
    if (this.orderId) {
      this.basicEnterShellSaveService
        .getOrderCarById(this.orderId)
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