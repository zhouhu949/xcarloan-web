<!--订单操作记录-->
<template>
  <section class="component order-info-record">
    <div v-if="dataSet.length === 0" class="no-data-notice">
      暂无数据
    </div>
    <data-box v-else :columns="columns" :data="dataSet" :height="440" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { PageService } from "~/utils/page.service";

@Component({})
export default class OrderInfoRecord extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Dependencies(PageService) private pageService: PageService;

  @Prop() id: Number
  private dataSet: Array<any> = [];
  private columns: Array<any> = []

  created() {
    this.columns = [
      {
        align: "center",
        title: "订单环节",
        key: "orderLink",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.orderLink))
      },
      {
        align: "center",
        title: '订单状态',
        editable: true,
        key: 'orderStatus ',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.orderStatus))
      },
      {
        align: "center",
        title: '操作时间',
        key: 'operatorTime',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.operatorTime))
      },
      {
        align: "center",
        title: '备注',
        key: 'remark',
        minWidth: this.$common.getColumnWidth(5)
      }
    ]
  }

  mounted() {
    this.basicCustomerOrderService.findCustomerOrderRecord(this.id, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
