<!--选择还款方案-->
<template>
  <section class="component choose-scheme">
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
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { PageService } from "~/utils/page.service";
import { RepaySchemeService } from "~/services/manage-service/basic-repay-scheme.service";
import { ProdSchemeDetailType } from "~/config/enum.config";

@Component({
  components: {}
})
export default class ChooseScheme extends Vue {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(RepaySchemeService) private pepaySchemeService: RepaySchemeService
  @Prop() schemeId: Number;
  /**
   * 10049-融资租赁-FINANCE
   * 10050-抵押贷款-MORTGAGE
   */
  @Prop({
    required: true,
    type: Number
  }) schemeType: ProdSchemeDetailType

  /**
   * 当前选择的方案数据
   */
  public selecedData: {
    schemeName: String,
    schemeId: Number
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
        title: "方案名称",
        align: "center",
        key: "schemeName"
      },
      {
        title: "还款方式",
        align: "center",
        key: "repayType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.repayType));
        }
      },
      {
        title: "抵押方式",
        align: "center",
        key: "mortgageType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.mortgageType));
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
      schemeName: currentRow.schemeName,
      schemeId: currentRow.id
    }
  }

  /**
   * 刷新数据
   */
  private refreshData() {
    this.pepaySchemeService.queryReleasedScheme(this.model.name, this.schemeType, this.pageService).subscribe(
      data => {
        data.forEach(v => { v._highlight = v.id === this.schemeId })
        this.schemeDataSet = data
      },
      err => this.$Message.error(err.msg)
    )
  }

  mounted() {
    this.refreshData()
  }

}
</script>

<style lang="less" scoped>
</style>
