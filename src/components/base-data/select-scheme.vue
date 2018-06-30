<!--选择还款方案-->
<template>
  <section class="component select-scheme">
    <data-box :columns="columns1" :data="schemeData" :highlightRow="true" @on-current-change="onCurrentCutomerBankChange"></data-box>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';

@Component({
  components: {}
})
export default class SelectScheme extends Vue {
  @Prop() productData
  @Prop() schemeData

  private columns1: any

  created() {
    this.columns1 = [
      {
        title: "序号",
        type: "index",
        align: "center",
        width: 60
      },
      {
        title: "方案名称",
        align: "center",
        key: "schemeName"
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
        title: "抵押方式",
        align: "center",
        key: "mortgageType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.mortgageType));
        }
      },
      {
        title: "期数",
        align: "center",
        key: "periods"
      },
      {
        title: "利率",
        align: "center",
        key: "interestRate",
        render: (h, { row, column, index }) => {
          return h("span", {}, row.interestRate * 100 + '%');
        }
      }
    ];
  }

  /**
   * 选中某一行事件
   */
  onCurrentCutomerBankChange(currentRow, oldRow) {
    this.productData.schemeName = currentRow.schemeName;
    this.productData.schemeId = currentRow.id;
  }
}
</script>

<style lang="less" scoped>
</style>
