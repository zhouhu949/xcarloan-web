<!--查看还款方案信息-->
<template>
  <section class="component check-scheme">
    <data-box :columns="columns" :data="schemeDataSet"  ref="databox"></data-box>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { BasicProductRepayTemplateService } from '~/services/manage-service/basic-product-repay-template.service';

@Component({
  components: {}
})
export default class CheckScheme extends Vue {
  @Dependencies(BasicProductRepayTemplateService) private basicProductRepayTemplateService: BasicProductRepayTemplateService

  @Prop() productId

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

  created() {
    // 通过服务获取方案数据
    this.basicProductRepayTemplateService.queryBasicProductCarScheme(this.productId).subscribe(
      val => {
        this.createClumnItem(val.header)
        this.schemeDataSet = val.dataList || []
      },
      err => this.$Message.error(err.message)
    )
  }
}
</script>

<style lang="less">
</style>
