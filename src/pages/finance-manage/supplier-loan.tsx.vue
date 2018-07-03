<template>
  <section class="page supplier-loan">
    <page-header title="供应商放款" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="model" @on-search="refreshData" :page="pageService">
      <template slot="input">
        <i-form-item prop="supplierId" label="供应商">
          <i-select v-model="model.supplierId" clearable>
            <i-option v-for="{label,value} of supplierList" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" @on-page-change="refreshData" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="tsx">
import Page from '~/core/page'
import Component from "vue-class-component";
import CarParams from "~/components/base-data/car-params.vue";
import { Button } from "iview";
import { namespace } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { Layout, Dependencies } from '~/core/decorator'
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Layout('workspace')
@Component({
  components: {}
})
export default class SupplierLoan extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService) private financialManagementService: FinancialManagementService;
  @Dependencies(BasicSupplierService) private basicSupplierService: BasicSupplierService;
  @CustomerOrderModule.Action showOrderInfo;

  private model: any = {
    supplierId: ""
  };

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];
  /**
   * 供应商列表
   */
  private supplierList: Array<{
    label: String,
    value: Number
  }> = []

  created() {
    this.columns = [
      {
        title: '操作',
        fixed: 'left',
        align: 'center',
        minWidth: this.$common.getColumnWidth(1),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.onSubmitClick(row.id)}>放款</i-button>)
      },
      {
        align: 'center',
        title: '车辆名称',
        key: 'orderCarName',
        ellipsis: true,
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.onClickNameClick(row.modelId)}>{row.orderCarName}</i-button>)
      },
      {
        align: 'center',
        title: '车型颜色',
        key: 'orderCarColor',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '操作时间',
        key: 'operatorTime',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{this.$filter.dateFormat(row.operatorTime, 'yyyy-MM-dd')}</span>)
      }
    ]
  }

  activated() {
    this.refreshData()
  }

  mounted() {
    this.basicSupplierService.getBasicSupplierList().subscribe(
      data => this.supplierList = (data || []).map(v => ({ label: v.supplierName, value: v.id })),
      err => this.$Message.error(err.msg)
    )
    this.refreshData()
  }

  private onClickNameClick(carId: Number) {
    this.$dialog.show({
      title: "车辆详情",
      width: 1000,
      footer: true,
      isView: true,
      render: h => (<CarParams carId={carId} isView={true}></CarParams>)
    })
  }

  /**
   * 放款操作
   */
  private onSubmitClick(carId: Number) {
    this.$Modal.confirm({
      content: "是否确认放款？",
      onOk: () => {
        this.financialManagementService.supplierOrderLoan(carId).subscribe(
          data => {
            this.$Message.success('操作成功')
            this.refreshData()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }

  private refreshData() {
    this.financialQueryService.findBasicOrderCarList(this.model, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>


<style lang="less" scoped>
</style>
