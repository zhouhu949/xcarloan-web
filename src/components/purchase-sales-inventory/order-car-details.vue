<!-- 修改库存车辆 -->
<template>
  <section class="component detain-details">
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="6">{{model.customerName}}</data-grid-item>
      <data-grid-item label="车型名称" :span="6">{{model.modelName }}</data-grid-item>
      <data-grid-item label="供应商" :span="6">{{model.supplierName }}</data-grid-item>
      <data-grid-item label="车架号" :span="6">{{model.stockCarNo}}</data-grid-item>
      <data-grid-item label="发动机号" :span="6">{{model.stockEngineNo }}</data-grid-item>
      <data-grid-item label="车辆颜色" :span="6">{{model.modelColors}}</data-grid-item>
      <data-grid-item label="采购价格" :span="6">{{model.stockPrice | toThousands}}</data-grid-item>
      <data-grid-item label="车型描述" :span="6">{{model.orderCarDesc}}</data-grid-item>
    </data-grid>
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
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class OrderCarDetails extends Vue {
  @Dependencies(BasicEnterShellSaveService)
  private basicEnterShellSaveService: BasicEnterShellSaveService;

  @Prop({
    default: 0,
    type: Number
  })
  orderId: number;

  private model: any = {
    // 客户姓名
    customerName: "",
    // 车型名称
    modelName: "",
    // 车辆颜色
    modelColors: "",
    // 采购价格
    stockPrice: "",
    // 车型描述
    orderCarDesc: "",
    // 车型参数描述
    orderCarParamDesc: "",
    // 发动机号
    stockEngineNo: "",
    // 车架号
    stockCarNo: "",
    // 供应商Id
    supplierName: ""
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