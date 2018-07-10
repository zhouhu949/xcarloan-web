<template>
  <section class="page supplier-invoice">
    <page-header title="供应商开票" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshData">
      <template slot="input">
        <i-form-item label="供应商" prop="supplierId">
          <i-select v-model="queryParamsModel.supplierId" clearable>
            <i-option v-for="{id,supplierName} in supplierDataSet" placeholder="请选择供应商" :key="id" :label="supplierName" :value="id"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="hasInvoice" label="是否已开票">
          <i-select v-model="queryParamsModel.hasInvoice" clearable>
            <i-option v-for="{value,label} in $dict.getDictData(10001)" placeholder="请选择是否已开票" :key="value" :label="label" :value="value"></i-option>
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
import ModifySupplierInvoice from "~/components/finance-manage/modify-supplier-invoice.vue";
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
    // 供应商Id
    supplierId: "",
    // 是否已开票
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
        width: this.$common.getOperateWidth(1),
        render: (h, { row }) => {
          // 判断是否已开票 10002：是；10003:否
          if (row.hasInvoice === 10003 || row.hasInvoice === null) {
            return (
              <i-button
                type="text"
                class="row-command-button"
                onClick={() => this.onSubmitClick(row.id)}
              >
                开票
              </i-button>
            );
          } else {
            return (
              <i-button
                type="text"
                class="row-command-button"
                onClick={() => this.onDetailsClick(row.id, row.fileUrl)}
              >
                查看
              </i-button>
            );
          }
        }
      },
      {
        align: "center",
        title: "供应商名称",
        key: "supplierName",
        minWidth: this.$common.getColumnWidth(4)
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
          <span>{row.hasInvoice ? this.$filter.dictConvert(row.hasInvoice) : '否'}</span>
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
    // 获取供应商列表
    this.getBasicSupplier();
    // 刷新列表
    this.refreshData();
  }

  /**
   * 开票操作
   */
  private onSubmitClick(id: number) {
    this.$dialog.show({
      title: "开票",
      footer: true,
      okText: "开票",
      onOk: supplierInvoice => {
        return supplierInvoice.submit().then(v => {
          if (v) this.refreshData();
          return v;
        });
      },
      render: h =>
        h(ModifySupplierInvoice, {
          props: {
            id: id
          }
        })
    });
  }

  private onDetailsClick(id: number, url: string) {
    this.$dialog.show({
      title: "详情",
      isView: true,
      footer: true,
      render: h =>
        h(ModifySupplierInvoice, {
          props: {
            id: id,
            url: url,
            isView: true
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
