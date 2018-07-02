<!--还款计划-->
<template>
  <section class="component order-info-repay-plan">
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";

@Component({})
export default class OrderInfoRepayPlan extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private dataSet: Array<any> = [];
  private columns: Array<any> = []

  created() {
    this.columns = [
      {
        align: "center",
        title: "订单编号",
        key: "orderNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: '贷款金额',
        key: 'orderPrice',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.toThousands(row.orderPrice))
      },
      {
        align: "center",
        title: "订单类型",
        key: 'orderType',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.orderType))
      },
      {
        align: "center",
        title: '还款方式',
        key: 'orderRepayType',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.orderRepayType))
      }, {
        align: "center",
        title: '操作日期',
        key: 'operatorTime',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.operatorTime,"yyyy-MM-dd"))
      }]

  }

  mounted() {
    this.basicCustomerOrderService.findCustomerOrderSchedule(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }


}
</script>
<style lang="less" scoped>
</style>
