<!--收款记录-->
<template>
  <section class="component order-info-base-finance-receipt">
    <div v-if="dataSet.length === 0" class="no-data-notice">
      暂无数据
    </div>
    <data-grid v-else class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id" :page="pageService">
      <data-grid-item label="订单ID" :span="4">{{item.orderId}}</data-grid-item>
      <data-grid-item label="操作日期" :span="4">{{item.operatorTime | dateFormat}}</data-grid-item>
      <data-grid-item label="银行卡ID" :span="4">{{item.cardId }}</data-grid-item>
      <data-grid-item label="是否已开发票" :span="4">{{item.isInvoice }}</data-grid-item>
      <data-grid-item label="是否已开收据" :span="4">{{item.isReceipt }}</data-grid-item>
      <data-grid-item label="机构ID" :span="4">{{item.orgId }}</data-grid-item>
      <data-grid-item label="收款日期" :span="4">{{item.receivableDate | dateFormat}}</data-grid-item>
      <data-grid-item label="收款金额" :span="4">{{item.receivableDetialMoney | toThousands}}</data-grid-item>
      <data-grid-item label="收款类型" :span="4">{{item.receivableType }}</data-grid-item>
      <data-grid-item label="提前结清ID" :span="4">{{item.settleId }}</data-grid-item>
      <data-grid-item label="提前收回ID" :span="4">{{item.takebackId}}</data-grid-item>
      <data-grid-item label="备注" :span="4">{{item.remark}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
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
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Dependencies(PageService) private pageService: PageService;
  @Prop() id: Number

  private dataSet: Array<any> = [];


  mounted() {
    this.basicCustomerOrderService.findCustomerOrderFinancialSituationList(this.id, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
