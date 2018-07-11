<!--放款记录-->
<template>
  <section class="component order-info-base-finance-loan">
    <div v-if="dataSet.length === 0" class="no-data-notice">
      暂无数据
    </div>
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>

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
  components: {
    DataGrid, DataGridItem
  }
})
export default class OrderInfoBaseFinanceLoan extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService
  @Prop() id: Number

  private dataSet: Array<any> = [];
  private columns: Array<any> = []
  
  created() {
    this.columns = [
      {
        align: "center",
        title: '放款金额',
        key: 'loanMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.toThousands(row.loanMoney))
      },
      {
        align: "center",
        title: "放款日期",
        key: 'loanDate',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.loanDate))
      },
      {
        align: "center",
        title: '放款类型',
        key: 'loanType',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.loanType))
      },
      {
        align: "center",
        title: "是否收到发票",
        key: "hasInvoice",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.hasInvoice))
      }
    ]

  }

  mounted() {
    this.basicCustomerOrderService.findCustomerOrderFinanceLoanList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
