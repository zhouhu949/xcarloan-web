<!-- 产品详情 -->
<template>
  <section class="component product-detail">

    <i-card title="产品信息">
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="产品名称" :span="6">{{productData.productName}}</data-grid-item>
        <data-grid-item label="产品类型" :span="6">{{productData.productType | dictConvert}}</data-grid-item>
        <data-grid-item label="产品发布状态" :span="6">{{productData.productStatus}}</data-grid-item>
        <data-grid-item label="还款方案名称" :span="6">{{productData.schemeName}}</data-grid-item>
        <data-grid-item label="车型名称" :span="6">{{productData.carModelName}}</data-grid-item>
        <data-grid-item label="期数" :span="6">{{productData.periods}}</data-grid-item>
        <data-grid-item label="利率" :span="6">{{productData.interestRate | decimalToPrecent}}</data-grid-item>
        <data-grid-item label="" :span="6"></data-grid-item>
      </data-grid>
    </i-card>

    <!-- 还款方案信息 -->
    <i-card title="还款方案信息">
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="方案名称" :span="6">{{scehmeData.schemeName}}</data-grid-item>
        <data-grid-item label="方案类型" :span="6">{{ scehmeData.schemeType | dictConvert}}</data-grid-item>
        <data-grid-item label="还款方式" :span="6">{{scehmeData.repayType | dictConvert}}</data-grid-item>
        <data-grid-item label="抵押方式" :span="6">{{scehmeData.mortgageType | dictConvert}}</data-grid-item>
        <data-grid-item label="发布状态" :span="6">{{scehmeData.schemeStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="征信保护天数" :span="6">{{scehmeData.creditDays}}</data-grid-item>
        <data-grid-item label="逾期保护天数" :span="6">{{scehmeData.overdueDays}}</data-grid-item>
        <data-grid-item label="期数" :span="6">{{scehmeData.periods}}</data-grid-item>
        <data-grid-item label="利率" :span="6">{{ scehmeData.interestRate | decimalToPrecent }}</data-grid-item>
        <data-grid-item label="周期类型" :span="6">{{scehmeData.cycleType | dictConvert}}</data-grid-item>
        <data-grid-item label="融资最小金额" :span="6">{{scehmeData.moneyMin | toThousands}}</data-grid-item>
        <data-grid-item label="融资最大金额" :span="6">{{scehmeData.moneyMax | toThousands}}</data-grid-item>
        <data-grid-item label="账期类型" :span="6">{{scehmeData.accountPeriodType | dictConvert}}</data-grid-item>
        <data-grid-item label="还款日" :span="6">{{scehmeData.accountDay}}</data-grid-item>
        <data-grid-item label="冲抵策略" :span="6">{{scehmeData.offsetName}}</data-grid-item>
        <data-grid-item label="备注" :span="6">{{scehmeData.remark}}</data-grid-item>
      </data-grid>
    </i-card>

    <!--还款方案比例详情-->
    <i-card title="还款方案比例详情">
      <data-box :columns="columns" :data="scehmeDetailData"></data-box>
    </i-card>

  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { RepaySchemeService } from '~/services/manage-service/basic-repay-scheme.service'

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class productDetail extends Vue {
  @Dependencies(RepaySchemeService) private repaySchemeService: RepaySchemeService
  @Prop() productData
  private columns: any;
  private scehmeData: any = {};
  private scehmeDetailData: any = [];

  created() {
    /**
     * 根据id获取还款方案信息
     */
    this.repaySchemeService.findSchemeById(this.productData.schemeId).subscribe(val => {
      this.scehmeData = val
    })
    /**
     * 根据id获取还款方案比例详情
     */
    this.repaySchemeService.findSchemeExpenseBySchemeId(this.productData.schemeId).subscribe(val => {
      this.scehmeDetailData = val
    })
    this.columns = [
      {
        title: "是否首付款",
        align: "center",
        key: "isFirst",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.isFirst));
        }
      },
      {
        title: "收取总额比例",
        align: "center",
        key: "repayProportion",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.decimalToPrecent(row.repayProportion));
        }
      },
      {
        title: "固定费用",
        align: "center",
        key: "fixedCost"
      },
      {
        title: "还款方式",
        align: "center",
        key: "repayType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.repayType));
        }
      },
      {
        title: "是否尾款",
        align: "center",
        key: "isLast",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.isLast));
        }
      },
      {
        title: "是否退款",
        align: "center",
        key: "isRefund",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.isRefund));
        }
      },
      {
        title: "费用项",
        align: "center",
        key: "expenseId",
        render: (h, { row, column, index }) => {
          return h("span", {}, row.expenseName);
        }
      }
    ];
  }
}
</script>

<style lang="less">
.component.product-detail {
  .i-table.ivu-table-wrapper {
    height: auto !important;
    .ivu-table-body {
      height: auto !important;
      overflow-y: auto;
    }
  }
}
</style>
