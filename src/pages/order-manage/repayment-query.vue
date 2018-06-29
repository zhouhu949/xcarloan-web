<template>
  <section class="page repayment-query">
    <page-header title="还款查询" hiddenPrint hiddenExport>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshRepayOrder">
      <template slot="input">
        <i-form-item prop="status" label="状态：">
          <i-select v-model="queryParamsModel.status" clearable>
            <i-option v-for="{value,label} in $dict.getDictData(10032)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="repayOrderColumns" :data="repayOrderDataSet" @onPageChange="refreshRepayOrder" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import { Layout } from "~/core/decorator";
import Component from "vue-class-component";
import OrderCustomerInfo from "~/components/base-data/order-customer-info.vue";
import { namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";
import { PageService } from "~/utils/page.service";

const CustomerOrderModule = namespace("customerOrderSpace");
@Layout("workspace")
@Component({
  components: {}
})
export default class RepaymentQuery extends Page {
  @Dependencies(FinancialManagementService)
  financialManagementService: FinancialManagementService;
  @Dependencies(PageService) private pageService: PageService;

  @CustomerOrderModule.Action showOrderInfo;
  @CustomerOrderModule.Action showCustomerInfo;

  private repayOrderColumns: any;
  private repayOrderDataSet: Array<any> = [];

  private queryParamsModel = {
    status: ""
  };

  created() {
    this.repayOrderColumns = [
      {
        align: "center",
        editable: true,
        title: "订单号",
        key: "orderNo",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, column, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265EA2"
              },
              on: {
                click: () => {
                  this.showOrderInfo(row.orderId);
                  this.$dialog.show({
                    width: 1050,
                    render: h => h(OrderCustomerInfo)
                  });
                }
              }
            },
            row.orderNo
          );
        }
      },
      {
        align: "center",
        editable: true,
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, column, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265EA2"
              },
              on: {
                click: () => {
                  this.showCustomerInfo({ id: row.customerId });
                  this.$dialog.show({
                    width: 1050,
                    render: h => h(OrderCustomerInfo)
                  });
                }
              }
            },
            row.customerName
          );
        }
      },
      {
        align: "center",
        editable: true,
        title: "客户手机号",
        key: "customerPhone",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "身份证号",
        key: "idCard",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "期数",
        key: "orderPeriods",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "订单金额(元)",
        key: "orderPrice",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "还款方式",
        key: "orderRepayType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.orderRepayType))
      },
      {
        align: "center",
        editable: true,
        title: "订单状态",
        key: "mortgageStatus",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.orderStatus))
      },
      {
        align: "center",
        editable: true,
        title: "订单类型",
        key: "orderType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.orderType))
      },
      {
        align: "center",
        editable: true,
        title: "还款方案名称",
        key: "schemeName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "订单审核环节名称",
        key: "workFlowLinkName",
        minWidth: this.$common.getColumnWidth(4)
      }
    ];
  }

  mounted() {
    // 加载数据
    this.refreshRepayOrder();
  }

  /**
   * keep-alive生命周期钩子函数
   */
  activated() {
    // 加载数据
    this.refreshRepayOrder();
  }

  /**
   * 刷新列表
   */
  refreshRepayOrder() {
    this.financialManagementService
      .findRepayOrderList(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.repayOrderDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }
}
</script>


<style lang="less" scoped>
</style>
