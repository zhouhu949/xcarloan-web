<!--房产信息-->
<template>
  <section class="component customer-info-house">
    <data-grid class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id">
      <data-grid-item label="户型" :span="4">{{item.houseType | dictConvert}}</data-grid-item>
      <data-grid-item label="房产面积" :span="4">{{item.houseArea}}</data-grid-item>
      <data-grid-item label="房屋地址" :span="4">{{item.houseAddress}}</data-grid-item>
      <data-grid-item label="备注" :span="12">{{item.remark}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomHouseService } from "~/services/manage-service/basic-custom-house.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: { DataGrid, DataGridItem }
})
export default class CustomerInfoHouse extends Vue {
  @Dependencies(BasicCustomHouseService) private basicCustomHouseService: BasicCustomHouseService;
  @Prop() id: Number

  private dataSet: Array<any> = []

  mounted() {
    this.basicCustomHouseService.findCustomerHouseList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
.component.customer-info-house {
  .car-info {
    margin: 10px;
  }
}
</style>
