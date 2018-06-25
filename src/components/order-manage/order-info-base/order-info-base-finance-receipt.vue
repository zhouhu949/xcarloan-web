<!--收款记录-->
<template>
  <section class="component order-info-base-finance-receipt">
   
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";


@Component({})
export default class OrderInfoBaseFinanceReceipt extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() id: Number

  private dataSet: Array<any> = []

  mounted() {
    // this.basicCustomerService.findCustomerBankInfo(this.id).subscribe(
    //   data => this.dataSet = data,
    //   err => this.$Message.error(err.msg)
    // )
  }

}
</script>
<style lang="less" scoped>
</style>
