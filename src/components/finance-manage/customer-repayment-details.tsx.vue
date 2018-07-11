<!--查看客户还款详情-->
<template>
  <section class="component customer-repayment-details">
    <data-box v-if="dataSet.length > 0" :height="400" :columns="columns" :data="dataSet" ref="databox"></data-box>
    <div v-else class="no-data">
      暂无结果...
    </div>
  </section>
</template>
<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";

@Component({
  components: {}
})
export default class CustomerRepaymentDetails extends Vue {
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;

  @Prop({
    required: true,
    type: Number
  }) orderId: number;

  private dataSet: Array<any> = [];
  private columns: Array<any> = [];

  mounted() {
    this.findOrderRepayScheme(this.orderId);
  }

  /**
   * 创建数据列
   */
  private createClumnItem(data: any) {
    if (!data) return [];
    //  插入期数列
    this.columns.push({
      align: "center",
      title: "期数",
      key: "periods",
      minWidth: this.$common.getColumnWidth(3)
    }, {
        align: "center",
        title: "还款状态",
        key: "status",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => (<span>{this.$filter.dictConvert(row.status)}</span>)
      });
    // 获取费用项
    let feeItems = data.feeItem as Array<any>
    if (!feeItems) return
    /**
     * 创建每个费用项的名称以及子数据
     */
    let createItem = feeItem => {
      return {
        align: "center",
        title: `${feeItem.expenseName}`,
        children: [
          {
            align: "center",
            title: "总金额",
            key: "totalMoney",
            minWidth: this.$common.getColumnWidth(2),
            render: (h, { row, column }) => (<div>{this.$filter.toThousands((row.feeItem.find(x => x.expenseCode === feeItem.expenseCode) || {}).totalMoney)}</div>)
          },
          {
            align: "center",
            title: "已还金额",
            key: "hasPayMoney",
            minWidth: this.$common.getColumnWidth(2),
            render: (h, { row }) => (<div>{this.$filter.toThousands((row.feeItem.find(x => x.expenseCode === feeItem.expenseCode) || {}).hasPayMoney)}</div>)
          },
          {
            align: "center",
            title: "待还金额",
            key: "needPayMoney",
            minWidth: this.$common.getColumnWidth(2),
            render: (h, { row }) => (<div>{this.$filter.toThousands((row.feeItem.find(x => x.expenseCode === feeItem.expenseCode) || {}).needPayMoney)}</div>)
          }
        ]
      }
    }
    // 添加每一项的费用列
    feeItems.forEach(v => {
      this.columns.push(createItem(v))
    })
  }

  /**
   * 查询车辆与方案关联的明细计划数据
   */
  private findOrderRepayScheme(orderId) {
    this.financialQueryService.findOrderRepayScheme(orderId).subscribe(
      val => {
        if (val) {
          this.createClumnItem(val[0]);
          this.dataSet = val;
        }
      },
      err => this.$Message.error(err.msg)
    );
  }
}
</script>

<style lang="less">
.component.customer-repayment-details {
  .no-data {
    text-align: center;
    line-height: 400px;
    height: 400px;
    font-size: 40px;
    color: rgb(176, 178, 182);
  }
}
</style>
