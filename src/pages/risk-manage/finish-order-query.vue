<!-- 订单查询 -->
<template>
  <section class="page finish-order-query">
    <page-header title="订单查询" hiddenPrint hiddenExport>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshOrder">
      <template slot="input">
        <i-form-item prop="customerName" label="客户姓名：">
          <i-input placeholder="请输入客户姓名" v-model="queryParamsModel.customerName"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号：">
          <i-input placeholder="请输入身份证号" v-model="queryParamsModel.idCard"></i-input>
        </i-form-item>
        <i-form-item prop="customerPhone" label="电话号码：">
          <i-input placeholder="请输入电话号码" v-model="queryParamsModel.customerPhone"></i-input>
        </i-form-item>
        <i-form-item prop="orderNo" label="订单号：">
          <i-input placeholder="请输入订单号" v-model="queryParamsModel.orderNo"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="orderColumns" :data="orderDataSet" @on-page-change="refreshOrder" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import OrderCustomerInfo from "~/components/base-data/order-customer-info.vue";
import { Layout } from "~/core/decorator";
import { namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { WorkFlowApprovalService } from "~/services/manage-service/work-flow-approval.service";
import { PageService } from "~/utils/page.service";

const CustomerOrderModule = namespace("customerOrderSpace");

@Layout("workspace")
@Component({
  components: {}
})
export default class FinishOrderQuery extends Page {
  @Dependencies(WorkFlowApprovalService)
  workFlowApprovalService: WorkFlowApprovalService;
  @Dependencies(PageService) private pageService: PageService;
  @CustomerOrderModule.Action showOrderInfo;
  @CustomerOrderModule.Action showCustomerInfo;

  private orderColumns: any;
  private orderDataSet: Array<any> = [];

  queryParamsModel: any = {
    customerName: "",
    idCard: "",
    customerPhone: "",
    orderNo: ""
  };

  created() {
    this.orderColumns = [
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
    this.refreshOrder();
  }

  /**
   * keep-alive生命周期钩子函数
   */
  activated() {
    // 加载数据
    this.refreshOrder();
  }

  /**
   * 刷新列表
   */
  refreshOrder() {
    this.workFlowApprovalService
      .queryAllWaitApprovalByAuth(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.orderDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }
}
</script>

<style lang="less" scoped>
</style>
