<!--退款记录-->
<template>
  <section class="component order-info-base-finance-refund">
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
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";

@Component({
  components: {

  }
})
export default class OrderInfoBaseFinanceRefund extends Vue {
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService
  @Prop() id: Number

  private dataSet: Array<any> = [];
  private columns: Array<any> = []
  
  created() {
    this.columns = [
      {
        align: "center",
        title: '退款金额',
        key: 'refundDetialMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.toThousands(row.refundDetialMoney))
      },
      {
        align: "center",
        title: "退款日期",
        key: 'refundDate',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.refundDate))
      },
      {
        align: "center",
        title: "费用项",
        key: 'expenseName',
        minWidth: this.$common.getColumnWidth(2)
      }
    ]

  }

  mounted() {
    this.financialQueryService.queryFinancialRefunds(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
