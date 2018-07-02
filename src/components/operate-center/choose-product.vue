<!--选择产品方案-->
<template>
  <section class="component choose-product">
    <data-form :model="model" :page="pageService" @on-search="refreshData" hidden-date-search>
      <template slot="input">
        <i-form-item prop="name" label="方案名称">
          <i-input placeholder="请输入方案名称" v-model="model.name"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="schemeDataSet" :height="400" highlightRow @on-current-change="onCurrentChange" :page="pageService" @on-page-change="refreshData"></data-box>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { PageService } from "~/utils/page.service";
import { BasicProductService } from "~/services/manage-service/basic-product.service";

@Component({
  components: {}
})
export default class ChooseProduct extends Vue {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(BasicProductService) private basicProductService: BasicProductService
  @Prop() schemeId: Number;

  @Prop({
    type: Number,
  }) carId: Number

  @Prop() productId: Number;

  @Watch("carId", { immediate: true })
  onCarIdChange(val) {
    if (!val) return
    this.refreshData()
  }

  /**
   * 当前选择的产品数据
   */
  public selecedData: {
    productName: String,
    productId: Number
  } = null;


  private schemeDataSet: Array<any> = [];
  private columns: Array<any> = null;
  private model: any = null;

  created() {
    this.model = {
      name: "" // 方案名称
    }
    this.columns = [
      {
        title: "序号",
        type: "index",
        align: "center",
        width: 60
      },
      {
        title: "产品名称",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        key: "productName"
      },
      {
        title: "方案名称",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        key: "schemeName"
      },
      {
        title: "还款方式",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        key: "repayType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.repayType));
        }
      },
      {
        title: "期数",
        align: "center",
        minWidth: this.$common.getColumnWidth(2),
        key: "periods"
      },
      {
        title: "利率",
        align: "center",
        minWidth: this.$common.getColumnWidth(2),
        key: "interestRate",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.decimalToPrecent(row.interestRate));
        }
      }
    ];
  }

  /**
   * 选中某一行事件
   */
  private onCurrentChange(currentRow, oldRow) {
    this.selecedData = {
      productName: currentRow.productName,
      productId: currentRow.productId
    }
  }

  /**
   * 刷新数据
   */
  private refreshData() {
    this.basicProductService.queryReleaseProductByCar(this.carId, this.model.name, this.pageService).subscribe(
      data => {
        data.forEach(v => { v._highlight = v.productId === this.productId })
        this.schemeDataSet = data
        if (!this.schemeDataSet.length) this.selecedData = null
      },
      err => this.$Message.error(err.msg)
    )
  }
}
</script>

<style lang="less" scoped>
</style>
