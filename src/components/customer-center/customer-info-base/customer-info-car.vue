<!--车辆信息-->
<template>
  <section class="component customer-info-car">
    <data-grid class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id">
      <data-grid-item label="车牌号" :span="4">{{item.carNo}}</data-grid-item>
      <data-grid-item label="购车价格" :span="4">{{item.carPrice | toThousands}}</data-grid-item>
      <data-grid-item label="是否二手车" :span="4">{{item.isSecondHand | dictConvert}}</data-grid-item>
      <data-grid-item label="购买方式" :span="4">{{item.buyType | dictConvert}}</data-grid-item>
      <data-grid-item label="抵押状态" :span="4">{{item.carStatus | dictConvert}}</data-grid-item>
      <data-grid-item label="抵押登记次数" :span="4">{{item.mortgageNum | dictConvert}}</data-grid-item>
      <data-grid-item label="备注" :span="12">{{item.remark}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: { DataGrid, DataGridItem }
})
export default class CustomerInfoCar extends Vue {
  @Dependencies(BasicCustomerAssessmentCarService) private basicCustomerAssessmentCarSerivce: BasicCustomerAssessmentCarService;
  @Prop() id: Number

  private dataSet: Array<any> = []

  mounted() {
    this.basicCustomerAssessmentCarSerivce.getBasicCustomerCarList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
.component.customer-info-car {
  .car-info {
    margin: 10px;
  }
}
</style>
