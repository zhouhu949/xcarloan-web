<!--基础信息-->
<template>
  <section class="component order-info-basedata">
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      
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
export default class OrderInfoBasedata extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private customerBaseInfo: any = {}

  mounted() {
    console.log(this.id)
    this.basicCustomerOrderService.findCustomerOrderInfo(this.id).subscribe(
      data => this.customerBaseInfo = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
