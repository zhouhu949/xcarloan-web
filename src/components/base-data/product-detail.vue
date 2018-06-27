<!-- 产品详情 -->
<template>
  <section class="component product-detail">
    <!-- 产品信息 -->
    <i-row>
      <page-header title="产品信息" hiddenPrint hiddenExport></page-header>
      <data-grid :total-span="24">
        <data-grid-item label="产品名称" :label-width="150" :span="12">{{productData.productName}}</data-grid-item>
        <data-grid-item label="产品类型" :label-width="150" :span="12">{{productData.product_type}}</data-grid-item>
        <data-grid-item label="产品发布状态" :label-width="150" :span="12">{{productData.productStatus}}</data-grid-item>
        <data-grid-item label="还款方案名称" :label-width="150" :span="12">{{productData.schemeName}}</data-grid-item>
        <data-grid-item label="车型名称" :label-width="150" :span="12">{{productData.carModelName}}</data-grid-item>
        <data-grid-item label="期数" :label-width="150" :span="12">{{productData.periods}}</data-grid-item>
        <data-grid-item label="利率" :label-width="150" :span="12">{{productData.interestRate}}</data-grid-item>
        <data-grid-item label="" :label-width="150" :span="12"></data-grid-item>
      </data-grid>
    </i-row>
    <i-row>
      <!-- 还款方案信息 -->
      <page-header title="还款方案信息" hiddenPrint hiddenExport></page-header>
      <data-grid :total-span="24">
        <data-grid-item label="方案类型" :label-width="150" :span="12">{{this.$dict.getDictName(scehmeData.schemeType)}}</data-grid-item>
        <data-grid-item label="方案名称" :label-width="150" :span="12">{{scehmeData.schemeName}}</data-grid-item>
        <data-grid-item label="还款方式" :label-width="150" :span="12">{{this.$dict.getDictName(scehmeData.repayType)}}</data-grid-item>
        <data-grid-item label="抵押方式" :label-width="150" :span="12">{{this.$dict.getDictName(scehmeData.mortgageType)}}</data-grid-item>
        <data-grid-item label="发布状态" :label-width="150" :span="12">{{this.$dict.getDictName(scehmeData.schemeStatus)}}</data-grid-item>
        <data-grid-item label="征信保护天数" :label-width="150" :span="12">{{scehmeData.creditDays}}</data-grid-item>
        <data-grid-item label="逾期保护天数" :label-width="150" :span="12">{{scehmeData.overdueDays}}</data-grid-item>
        <data-grid-item label="期数" :label-width="150" :span="12">{{scehmeData.periods}}</data-grid-item>
        <data-grid-item label="利率" :label-width="150" :span="12">{{scehmeData.interestRate * 100 + '%'}}</data-grid-item>
        <data-grid-item label="周期类型" :label-width="150" :span="12">{{this.$dict.getDictName(scehmeData.cycleType)}}</data-grid-item>
        <data-grid-item label="融资最小金额" :label-width="150" :span="12">{{scehmeData.moneyMin}}</data-grid-item>
        <data-grid-item label="融资最大金额" :label-width="150" :span="12">{{scehmeData.moneyMax}}</data-grid-item>
        <data-grid-item label="账期类型" :label-width="150" :span="12">{{this.$dict.getDictName(scehmeData.accountPeriodType)}}</data-grid-item>
        <data-grid-item label="还款日" :label-width="150" :span="12">{{scehmeData.accountDay}}</data-grid-item>
        <data-grid-item label="冲抵策略" :label-width="150" :span="12">{{scehmeData.offsetName}}</data-grid-item>
        <data-grid-item label="" :label-width="150" :span="12"></data-grid-item>
        <data-grid-item label="备注" :label-width="150" :span="24" contentAlign="left">{{scehmeData.remark}}</data-grid-item>
      </data-grid>
    </i-row>
    <i-row>
      <!--还款方案比例详情-->
      <page-header title="还款方案比例详情" hiddenPrint hiddenExport></page-header>
      <data-box :id="34" :columns="columns1" :data="scehmeDetailData"></data-box>
    </i-row>
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
  private columns1: any;
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
    this.columns1 = [
      {
        title: "序号",
        type: "index",
        align: "center",
        width: 60
      },
      {
        title: "是否首付款",
        align: "center",
        key: "isFirst",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.isFirst));
        }
      },
      {
        title: "收取总额比例",
        align: "center",
        key: "repayProportion",
        render: (h, { row, column, index }) => {
          return h("span", {}, row.repayProportion !== null ? `${row.repayProportion * 100}%` : null);
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
  .i-table.ivu-table-wrapper{
    height: auto !important;
    .ivu-table-body{
      height: auto !important;
      overflow-y: auto;
    }
  }
}
</style>
