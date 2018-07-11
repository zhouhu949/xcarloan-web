<!--提前结清-->
<template>
  <section class="component order-info-base-finance-early-settlement">
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
  components: { DataGrid, DataGridItem }
})
export default class OrderInfoBaseFinanceEarlySettlement extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private dataSet: Array<any> = []
  private columns: Array<any> = []
  
  created() {
    this.columns = [
      {
        align: "center",
        title: '提前结清金额',
        key: 'settleMoney',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.toThousands(row.settleMoney))
      },
      {
        align: "center",
        title: "提前结清日期",
        key: 'settleDate',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.settleDate))
      },
      {
        align: "center",
        title: '备注',
        key: 'remark ',
        minWidth: this.$common.getColumnWidth(4)
      }
    ]

  }

  mounted() {
    this.basicCustomerOrderService.findCustomerOrderFinanceSettleList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
