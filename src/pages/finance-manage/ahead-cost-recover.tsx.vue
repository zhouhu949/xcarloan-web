<!--提前收回-->
<template>
  <section class="page ahead-cost-recover">
    <page-header title="提前收回" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="model" @on-search="refreshData" :page="pageService">
      <template slot="input">
        <i-form-item prop="customerName" label="姓名">
          <i-input v-model="model.customerName" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="orderNo" label="订单号">
          <i-input v-model="model.orderNo" placeholder="请输入订单号"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号">
          <i-input v-model="model.idCard" placeholder="请输入身份证号"></i-input>
        </i-form-item>
        <i-form-item prop="customerPhone" label="联系电话">
          <i-input v-model="model.customerPhone" placeholder="请输入联系电话"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" @on-page-change="refreshData" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="tsx">
import Page from "~/core/page";
import { Layout, Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { namespace } from "vuex-class";
import Component from "vue-class-component";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";
import ModifyOrderStatus from "~/components/finance-manage/modify-order-status.tsx.vue";
import { Button } from "iview";

const CustomerOrderModule = namespace("customerOrderSpace");

@Layout("workspace")
@Component({
  components: {}
})
export default class AheadCostRecover extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(FinancialQueryService)
  private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService)
  private financialManagementService: FinancialManagementService;
  @CustomerOrderModule.Action showOrderInfo;

  private model: any = {
    customerName: "",
    orderNo: "",
    idCard: "",
    customerPhone: ""
  };

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  private refreshData() {
    this.financialQueryService
      .findRepayOrderList(this.model, this.pageService)
      .subscribe(
        data => (this.dataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  created() {
    this.columns = [
      {
        title: "操作",
        fixed: "left",
        align: "center",
        Width: this.$common.getOperateWidth(1),
        render: (h, { row }) => (
          <i-button
            type="text"
            class="row-command-button"
            onClick={() => this.onSubmitClick(row.orderId)}
          >
            提前收回
          </i-button>
        )
      },
      {
        align: "center",
        title: " 订单号",
        key: "orderNo",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <i-button
            type="text"
            class="row-command-button"
            onClick={() => this.onOrderNumberClick(row.orderId)}
          >
            {row.orderNo}
          </i-button>
        )
      },
      {
        align: "center",
        title: " 订单状态",
        key: "orderStatus",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.dictConvert(row.orderStatus)}</span>
        )
      },
      {
        align: "center",
        title: " 订单类型",
        key: "orderType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.dictConvert(row.orderType)}</span>
        )
      },
      {
        align: "center",
        title: " 订单期数",
        key: "orderPeriods",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: " 订单金额",
        key: "orderPrice",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <div class="col-decimal">
            {this.$filter.toThousands(row.orderPrice)}
          </div>
        )
      },
      {
        align: "center",
        title: " 客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: " 电话号码",
        key: "customerPhone",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: " 身份证号",
        key: "idCard",
        minWidth: this.$common.getColumnWidth(4)
      }
    ];
  }

  activated() {
    this.refreshData();
  }

  mounted() {
    this.refreshData();
  }

  private onOrderNumberClick(orderId: Number) {
    this.showOrderInfo(orderId);
  }

  onSubmitClick(orderId) {
    this.$dialog.show({
      title: "提前收回",
      okText: "确认提前收回",
      footer: true,
      width: 700,
      onOk: earlyRecover => {
        return earlyRecover.earlyRecover().then(v => {
          if (v) this.refreshData();
          return !!v;
        });
      },
      render: h =>
        h(ModifyOrderStatus, {
          props: {
            orderId: orderId,
            isRecover: true
          }
        })
    });
  }
}
</script>


<style lang="less" scoped>
</style>
