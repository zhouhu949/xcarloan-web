<!-- 方案详情 -->
<template>
  <section class="component scheme-detail">
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
      <a slot="extra" @click="addRepaySchemeDetail" v-show="!view && !publishState">
        增加费用项
      </a>
      <data-box :columns="columns" :data="scehmeDetailData" :height="400"></data-box>
    </i-card>

  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { RepaySchemeService } from '~/services/manage-service/basic-repay-scheme.service'
import ModifySchemeFeeItem from "./modify-scheme-fee-item.vue";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class SchemeDetail extends Vue {
  @Dependencies(RepaySchemeService) private repaySchemeService: RepaySchemeService

  /**
   * 是否查看状态
   */
  @Prop({
    type: Boolean,
    default: false
  }) view: Boolean

  @Prop() schemeId: Number;
  @Watch('schemeId', { immediate: true })
  onSchemeIdChange(value) {
    if (!value) return
    this.getSchemeFeeItems()
    this.getSchemeInfo()
  }

  private columns: Array<any> = [];
  private scehmeData: any = {};
  private scehmeDetailData: any = [];

  created() {
    this.columns = [
      {
        title: "是否首付款",
        align: "center",
        key: "isFirst",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.isFirst));
        }
      },
      {
        title: "收取总额比例",
        align: "center",
        key: "repayProportion",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.decimalToPrecent(row.repayProportion));
        }
      },
      {
        title: "固定费用",
        align: "center",
        minWidth: this.$common.getColumnWidth(3),
        key: "fixedCost",
        render: (h, { row, column, index }) => {
          return h("div", { class: { 'col-decimal': true } }, this.$filter.toThousands(row.fixedCost));
        }
      },
      {
        title: "还款方式",
        align: "center",
        key: "repayType",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.repayType));
        }
      },
      {
        title: "是否尾款",
        align: "center",
        key: "isLast",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.isLast));
        }
      },
      {
        title: "是否退款",
        align: "center",
        key: "isRefund",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.isRefund));
        }
      },
      {
        title: "费用项",
        align: "center",
        key: "expenseId",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h("span", {}, row.expenseName);
        }
      }
    ];

    let opeaterColumn = {
      title: "操作",
      align: "center",
      render: (h, { row, column, index }) => {
        if (!this.publishState) {
          return h("div", {}, [
            h('i-button',
              {
                props: {
                  type: "text"
                },
                class: {
                  'row-command-button': true
                },
                on: {
                  click: () => this.feeItemDelete(row.id)
                }
              },
              '删除'
            )
          ]);
        }
      },
       width: this.$common.getOperateWidth(1)
    }

    if (!this.view) {
      this.columns.unshift(opeaterColumn)
    }
  }

  get publishState() {
    return (this.scehmeData.schemeStatus || 10056) === 10057
  }

  /**
   * 根据id获取还款方案比例详情
   */
  private getSchemeFeeItems() {
    this.repaySchemeService.findSchemeExpenseBySchemeId(this.schemeId).subscribe(
      val => this.scehmeDetailData = val,
      err => this.$Message.error(err.msg)
    )
  }


  /**
   * 根据id获取还款方案信息
   */
  getSchemeInfo() {
    this.repaySchemeService.findSchemeById(this.schemeId).subscribe(
      val => this.scehmeData = val,
      err => this.$Message.error(err.msg)
    )
  }

  /**
  * 新增还款方案比例详情
  */
  addRepaySchemeDetail() {
    this.$dialog.show({
      title: "新增还款方案比例详情",
      footer: true,
      onOk: schemeFeeItem => {
        return schemeFeeItem.submit().then(v => {
          if (v) this.getSchemeFeeItems()
          return v
        })
      },
      render: h => h(ModifySchemeFeeItem, {
        props: {
          schemeId: this.schemeId
        }
      })
    })
  }

  /**
   * 删除还款方案比例详情
   */
  private feeItemDelete(id: Number) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除此还款方案比例详情吗？',
      onOk: () => {
        this.repaySchemeService.deleteRepaySchemeExpense(id).subscribe(
          val => {
            this.$Message.success('删除成功！')
            this.getSchemeInfo()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }

}
</script>

<style lang="less">
</style>
