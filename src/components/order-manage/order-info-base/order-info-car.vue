<!--订单车辆-->
<template>
  <section class="component order-info-car">
    <div v-if="dataSet.length === 0" class="no-data-notice">
      暂无数据
    </div>
    <data-grid v-else class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id">
      <data-grid-item label="是否外采" :span="4">{{item.isSupplier  | dictConvert}}</data-grid-item>
      <data-grid-item label="车型颜色" :span="4">{{item.orderCarColor}}</data-grid-item>
      <data-grid-item label="操作时间" :span="4">{{item.operatorTime | dateFormat}}</data-grid-item>
      <data-grid-item label="车型描述" :span="4">{{item.orderCarDesc}}</data-grid-item>
      <data-grid-item label="车型名称" :span="4">{{item.orderCarName }}</data-grid-item>
      <data-grid-item label="车型参数描述" :span="4">{{item.orderCarParamDesc}}</data-grid-item>
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
