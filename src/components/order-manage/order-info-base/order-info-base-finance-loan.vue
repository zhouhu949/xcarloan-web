<!--放款记录-->
<template>
  <section class="component order-info-base-finance-loan">
   
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerContactService } from "~/services/manage-service/basic-customer-contact.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid, DataGridItem
  }
})
export default class OrderInfoBaseFinanceLoan extends Vue {
  @Dependencies(BasicCustomerContactService) private basicCustomerContactService: BasicCustomerContactService
  @Prop() id: Number

  private dataSet: Array<any> = [];

  mounted() {
    // this.basicCustomerContactService.findCustomerContactList(this.id).subscribe(
    //   data => this.dataSet = data,
    //   err => this.$Message.error(err.msg)
    // )
  }

}
</script>
<style lang="less" scoped>
</style>
