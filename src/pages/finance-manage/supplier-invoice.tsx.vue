<template>
  <section class="page supplier-invoice">
    <page-header title="供应商开票" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshData">
      <template slot="input">
        <i-form-item prop="hasInvoice" label="是否已开票">
            <i-select v-model="queryParamsModel.hasInvoice">
              <i-option v-for="{value,label} in $dict.getDictData(10001)" placeholder="请选择是否已开票" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-form-item>
        <i-form-item label="供应商" prop="supplierId">
          <i-select v-model="queryParamsModel.supplierId">
            <i-option v-for="{id,supplierName} in supplierDataSet" placeholder="请选择供应商" :key="id" :label="supplierName" :value="id"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" @on-page-change="refreshData" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="tsx">
import Page from "~/core/page";
import Component from "vue-class-component";
import ModifyRefundCustomer from "~/components/finance-manage/modify-refund-customer.vue";
import { namespace } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { Form, Button } from "iview";
import { Layout, Dependencies } from "~/core/decorator";
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";

const CustomerOrderModule = namespace("customerOrderSpace");

@Layout("workspace")
@Component({
  components: {}
})
export default class SupplierInvoice extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(FinancialQueryService)
  private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService)
  private financialManagementService: FinancialManagementService;
  @Dependencies(BasicSupplierService)
  private basicSupplierService: BasicSupplierService;

  @CustomerOrderModule.Action showOrderInfo;

  private supplierDataSet: Array<any> = [];

  private queryParamsModel: any = {
    supplierId: "",
    hasInvoice: ""
  };

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  created() {
    this.columns = [
      {
        title: "操作",
        fixed: "left",
        align: "center",
        minWidth: this.$common.getOperateWidth(1),
        render: (h, { row }) =>{
          if(row.hasInvoice===10003){
            return (
          <i-button
            type="text"
            v-show="row.hasInvoice ===10003"
            class="row-command-button"
            onClick={() => this.onSubmitClick(row.orderId)}
          >
            开票
          </i-button>
        );
          }
        } 
      },{
        align:"center",
        title:"供应商名称",
        key:"supplierName",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.dictConvert(row.supplierName)}</span>
        )
      },
      {
        align: "center",
        title: " 放款类型",
        key: "loanType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.dictConvert(row.loanType)}</span>
        )
      },
      {
        align: "center",
        title: " 放款金额",
        key: "loanMoney",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.toThousands(row.loanMoney)}</span>
        )
      },
      {
        align: "center",
        title: "是否收到发票",
        key: "hasInvoice",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.dictConvert(row.hasInvoice)}</span>
        )
      },
      {
        align: "center",
        title: "是否收到收据",
        key: "hasReceipt ",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.dictConvert(row.hasReceipt)}</span>
        )
      },
      {
        align: "center",
        title: "放款日期",
        key: "loanDate",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (
          <span>{this.$filter.dateFormat(row.loanDate)}</span>
        )
      }
    ];
  }

  activated() {
    this.refreshData();
  }

  mounted() {
    this.refreshData();
    this.getBasicSupplier();
  }

  /**
   * 退款操作
   */
  private onSubmitClick(orderId: number) {
    this.$dialog.show({
      title: "退款",
      footer: true,
      onOk: refundCustomer => {
        return refundCustomer.submit().then(v => {
          if (v) this.refreshData();
          return v;
        });
      },
      render: h =>
        h(ModifyRefundCustomer, {
          props: {
            orderId: orderId
          }
        })
    });
  }

  private refreshData() {
    this.financialQueryService
      .supplierLoanRecord(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.dataSet = data),
        err => this.$Message.error(err.msg)
      );
  }
  
  /**
   * 获取供应商信息
   */
  private getBasicSupplier() {
    return new Promise((resolve, reject) => {
      this.basicSupplierService.getBasicSupplierList().subscribe(
        data => {
          this.supplierDataSet = data;
          resolve(true);
        },
        err => reject(err)
      );
    });
  }

}
</script>

<style lang="less" scoped>
</style>
