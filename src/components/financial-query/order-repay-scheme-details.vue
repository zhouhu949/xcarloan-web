<!--查看还款方案信息-->
<template>
  <section class="component product-scheme-detail">
    <data-box v-if="schemeDataSet.length > 0" :height="400" :columns="columns" :data="schemeDataSet" ref="databox"></data-box>
    <div v-else class="no-data">
      暂无结果...
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";

@Component({
  components: {}
})
export default class OrderRepaySchemeDetails extends Vue {
  @Dependencies(FinancialQueryService)
  private financialQueryService: FinancialQueryService;

  @Prop({
    default: 0,
    type: Number
  })
  orderId: number;

  private schemeDataSet: Array<any> = [];
  private columns: Array<any> = [];

  mounted() {
    this.findOrderRepayScheme(this.orderId);
  }

  /**
   * 创建数据列
   */
  private createClumnItem(hearders: Array<any>) {
    if (!hearders) return [];

    let createItem = key => {
      if (key === "periods") {
        return {
          align: "center",
          title: "期数",
          key: "periods",
          minWidth: this.$common.getColumnWidth(3)
        };
      }

      return {
        align: "center",
        title: key,
        key: key,
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) =>
          h(
            "div",
            {
              class: { "col-decimal": true }
            },
            this.$filter.toThousands(row[key])
          )
      };
    };

    let items = hearders.map(v => createItem(v));
    this.columns.push(...items);
  }

  /**
   * 查询车辆与方案关联的明细计划数据
   */
  private findOrderRepayScheme(orderId) {
    this.financialQueryService.findOrderRepayScheme(orderId).subscribe(
      val => {
        if (val) {
          this.createClumnItem(Object.keys(val[0]));
          this.schemeDataSet = val;
        }
      },
      err => this.$Message.error(err.msg)
    );
  }
}
</script>

<style lang="less">
.component.product-scheme-detail {
  .no-data {
    text-align: center;
    line-height: 400px;
    height: 400px;
    font-size: 40px;
    color: rgb(176, 178, 182);
  }
}
</style>
