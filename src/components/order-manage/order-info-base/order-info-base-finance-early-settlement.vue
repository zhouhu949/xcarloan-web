<!--提前结清-->
<template>
  <section class="component order-info-base-finance-early-settlement">
  
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerHouseService } from "~/services/manage-service/basic-customer-house.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: { DataGrid, DataGridItem }
})
export default class OrderInfoBaseFinanceEarlySettlement extends Vue {
  @Dependencies(BasicCustomerHouseService) private basicCustomerHouseService: BasicCustomerHouseService;
  @Prop() id: Number

  private dataSet: Array<any> = []

  mounted() {
   
  }

}
</script>
<style lang="less" scoped>
</style>
