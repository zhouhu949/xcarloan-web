<!-- 产品详情 -->
<template>
  <section class="component product-detail">

    <i-card title="产品信息">
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="产品名称" :span="6">{{productData.productName}}</data-grid-item>
        <data-grid-item label="产品类型" :span="6">{{productData.productType | dictConvert}}</data-grid-item>
        <data-grid-item label="产品发布状态" :span="6">{{productData.productStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="还款方案名称" :span="6">{{productData.schemeName}}</data-grid-item>
        <data-grid-item label="车型名称" :span="6">{{productData.carModelName}}</data-grid-item>
        <data-grid-item label="期数" :span="6">{{productData.periods}}</data-grid-item>
        <data-grid-item label="利率" :span="6">{{productData.interestRate | decimalToPrecent}}</data-grid-item>
        <data-grid-item label="" :span="6"></data-grid-item>
      </data-grid>
    </i-card>
    <scheme-detail :schemeId="schemeId" view></scheme-detail>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { RepaySchemeService } from '~/services/manage-service/basic-repay-scheme.service'
import SchemeDetail from "~/components/base-data/scheme-detail.vue";

@Component({
  components: {
    DataGrid,
    DataGridItem,
    SchemeDetail
  }
})
export default class productDetail extends Vue {
  @Dependencies(RepaySchemeService) private repaySchemeService: RepaySchemeService

  /**
   * 是否查看状态
   */
  @Prop({
    type: Boolean,
    default: false
  }) view: Boolean

  @Prop() productData: any;

  get schemeId() {
    return this.productData && this.productData.schemeId
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
