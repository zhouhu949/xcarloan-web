<!--收款记录-->
<template>
  <section class="component order-info-base-finance-receipt">
    <div v-if="dataSet.length === 0" class="no-data-notice">
      暂无数据
    </div>
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class OrderInfoBaseFinanceReceipt extends Vue {
  @Dependencies(BasicCustomerOrderService)
  private basicCustomerOrderService: BasicCustomerOrderService;
  @Dependencies(PageService) private pageService: PageService;
  @Prop() id: Number;

  private dataSet: Array<any> = [];
  private columns: Array<any> = []
  
  created() {
    this.columns = [
      {
        align: "center",
        title: '收款金额',
        key: 'receivableDetialMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.toThousands(row.receivableDetialMoney))
      },
      {
        align: "center",
        title: "收款日期",
        key: 'receivableDate',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.receivableDate))
      },
      {
        align: "center",
        title: '收款类型',
        key: 'receivableType',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.receivableType))
      },
      {
        align: "center",
        title: "是否已开发票",
        key: "isInvoice",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.isInvoice))
      }
    ]

  }

  mounted() {
    this.basicCustomerOrderService
      .findCustomerOrderFinancialSituationList(this.id, this.pageService)
      .subscribe(
        data => (this.dataSet = data),
        err => this.$Message.error(err.msg)
      );
  }
}
</script>
<style lang="less" scoped>
</style>
