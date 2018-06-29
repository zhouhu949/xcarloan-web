<!--查看还款方案信息-->
<template>
  <section class="component product-scheme-detail">
    <data-box :columns="columns" :data="schemeDataSet" ref="databox"></data-box>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { BasicProductRepayTemplateService } from '~/services/manage-service/basic-product-repay-template.service';
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { ProdSchemeDetailType } from "~/config/enum.config";

@Component({
  components: {}
})
export default class ProductSchemeDetail extends Vue {
  @Dependencies(BasicProductRepayTemplateService) private basicProductRepayTemplateService: BasicProductRepayTemplateService
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;

  @Prop() productId
  @Prop() productType: ProdSchemeDetailType;
  @Watch('productId', { immediate: true })
  onProductIdChange(val) {
    if (!val) return
    this.refreshData()
  }


  private schemeDataSet: Array<any> = [];
  private columns: Array<any> = [
    {
      align: "center",
      title: "期数",
      key: "periods",
      minWidth: this.$common.getColumnWidth(3),
    }
  ];

  /**
   * 创建数据列
   */
  private createClumnItem(hearder: Object) {
    if (!hearder) return []
    let createItem = ([key, vaule]) => {
      return {
        align: "center",
        title: vaule,
        key: key,
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('div',
          {
            class: { 'col-decimal': true }
          },
          this.$filter.toThousands(row[key]))
      }
    }

    let items = Object.entries(hearder).map(v => createItem(v))
    this.columns.push(...items)
  }

  refreshData() {
    // 通过服务获取方案数据
    switch (this.productType) {
      case ProdSchemeDetailType.PRODUCT:
        this.basicProductRepayTemplateService.queryBasicProductCarScheme(this.productId).subscribe(
          val => {
            this.createClumnItem(val.header)
            this.schemeDataSet = val.dataList || []
          },
          err => this.$Message.error(err.message)
        )
        break;
      case ProdSchemeDetailType.FINANCE:
        this.basicCustomerOrderService.findFinancingRepayDetail(this.productId).subscribe(
          data => {
            this.createClumnItem(data.header)
            this.schemeDataSet = data.dataList || []
          },
          err => this.$Message.error(err.message)
        )
        break;
      case ProdSchemeDetailType.MORTGAGE:

        break;

      default:
        break;
    }

  }
}
</script>

<style lang="less">
</style>
