<!-- 修改库存车辆 -->
<template>
  <section>
    <Row type="flex" style="margin:10px 0;">
      <i-col span="12">
        <div style="display:table;">
          <label style="width:100px;text-align:right;display:table-cell;">客户姓名：</label>
          <div style="display:inline-block;">{{ model.customerName }}</div>
        </div>
      </i-col>
      <i-col span="12">
        <div style="display:block;">
          <label style="width:100px;text-align:right;display:inline-block;">车型名称：</label>
          <div style="display:inline-block;">{{ model.modelName }}</div>
        </div>
      </i-col>
    </Row>
    <Row style="margin:10px 0;">
      <i-col span="12">
        <div style="display:block;">
          <label style="width:100px;text-align:right;display:inline-block;">车辆颜色：</label>
          <div style="display:inline-block;">{{ model.modelColors }}</div>
        </div>
      </i-col>
      <i-col span="12">
        <div style="display:table;">
          <label style="width:100px;text-align:right;display:table-cell;">状态：</label>
          <div style="display:inline-block;">{{ $filter.dictConvert(model.stockStatus) }}</div>
        </div>
      </i-col>
    </Row>
    <Row style="margin:10px 0;">
      <i-col span="12">
        <div style="display:table;">
          <label style="width:100px;text-align:right;display:table-cell;">车辆订单描述：</label>
          <div style="display:inline-block;">{{ model.orderCarDesc }}</div>
        </div>
      </i-col>
      <i-col span="12">
        <div style="display:table;">
          <label style="width:100px;text-align:right;display:table-cell;">车辆订单参数：</label>
          <div style="display:inline-block;">{{ model.orderCarParamDesc }}</div>
        </div>
      </i-col>
    </Row>
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