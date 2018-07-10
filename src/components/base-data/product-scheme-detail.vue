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
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicProductRepayTemplateService } from "~/services/manage-service/basic-product-repay-template.service";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { ProdSchemeDetailType } from "~/config/enum.config";

@Component({
  components: {}
})
export default class ProductSchemeDetail extends Vue {
  @Dependencies(BasicProductRepayTemplateService)
  private basicProductRepayTemplateService: BasicProductRepayTemplateService;
  @Dependencies(BasicCustomerOrderService)
  private basicCustomerOrderService: BasicCustomerOrderService;

  @Prop()
  queryParams: {
    productId: Number;
    schemeId: Number;
    loanAmt: Number;
  };

  @Prop() productType: ProdSchemeDetailType;

  @Watch("queryParams", { immediate: true })
  onProductIdChange(val) {
    if (!val) return;
    switch (this.productType) {
      case ProdSchemeDetailType.PRODUCT:
        if (!this.queryParams.productId) return;
        this.queryProductCarScheme(this.queryParams.productId);
        break;
      case ProdSchemeDetailType.FINANCE:
        if (!this.queryParams.productId) return;
        this.queryFinancingRepayDetail(this.queryParams.productId);
        break;
      case ProdSchemeDetailType.MORTGAGE:
        if (!this.queryParams.schemeId || !this.queryParams.loanAmt) return;
        this.queryMortgageRepayDetail(
          this.queryParams.schemeId,
          this.queryParams.loanAmt
        );
        break;
      default:
        this.$Message.error("查询方案类型错误");
        break;
    }
  }

  /**
   * 获取产品ID
   */
  get productId() {
    return this.queryParams.productId;
  }

  private schemeDataSet: Array<any> = [];
  private columns: Array<any> = [];

  /**
   * 创建数据列
   */
  private createClumnItem(hearder: Object) {
    // 清空列数据
    this.columns=[];

    if (!hearder) return [];
    let createItem = ([key, vaule]) => {
      if (key === "periods") {
        return {
          align: "center",
          title: vaule,
          key: key,
          minWidth: this.$common.getColumnWidth(1)
        };
      } else {
        return {
          align: "center",
          title: vaule,
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
      }
    };

    let items = Object.entries(hearder).map(v => createItem(v));
    this.columns.push(...items);
  }

  /**
   * 查询车辆与方案关联的明细计划数据
   */
  private queryProductCarScheme(productId) {
    this.basicProductRepayTemplateService
      .queryBasicProductCarScheme(productId)
      .subscribe(
        val => {
          this.createClumnItem(val.header);
          this.schemeDataSet = val.dataList || [];
        },
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 查询融资租赁付款明细
   */
  private queryFinancingRepayDetail(productId) {
    this.basicCustomerOrderService
      .findFinancingRepayDetail(productId)
      .subscribe(
        data => {
          this.createClumnItem(data.header);
          this.schemeDataSet = data.dataList || [];
        },
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 查询抵押贷款付款明细
   */
  private queryMortgageRepayDetail(schemeId: Number, loanAmt: Number) {
    this.basicCustomerOrderService
      .findMortgageRepayDetail(schemeId, loanAmt)
      .subscribe(
        data => {
          this.createClumnItem(data.header);
          this.schemeDataSet = data.dataList || [];
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
