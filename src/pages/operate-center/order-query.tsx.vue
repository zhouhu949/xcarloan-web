<template>
  <section class="page order-query">
    <page-header title="订单查询" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="model" @on-search="refreshData" :page="pageService">
      <template slot="input">
        <i-form-item prop="name" label="姓名">
          <i-input v-model="model.name" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="orderNo" label="订单号">
          <i-input v-model="model.orderNo" placeholder="请输入订单号"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号">
          <i-input v-model="model.idCard" placeholder="请输入身份证号"></i-input>
        </i-form-item>
        <i-form-item prop="phone" label="联系电话">
          <i-input v-model="model.phone" placeholder="请输入联系电话"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" @on-page-change="refreshData" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="tsx">
import Page from '~/core/page'
import Component from "vue-class-component";
import { Button } from "iview";
import { namespace } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { Layout, Dependencies } from '~/core/decorator'
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { WorkFlowApprovalService } from "~/services/manage-service/work-flow-approval.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Layout('workspace')
@Component({
  components: {}
})
export default class OrderQuery extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Dependencies(WorkFlowApprovalService) private workFlowApprovalService: WorkFlowApprovalService;
  @CustomerOrderModule.Action showOrderInfo;

  private model: any = {
    name: "",
    orderNo: "",
    idCard: "",
    phone: ""
  };

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  created() {
    this.columns = [
      {
        title: '操作',
        fixed: 'left',
        align: 'center',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row, column, index }) => {
          if (row.orderStatus === 10107) {
            return (<i-button type="text" class="row-command-button" onClick={() => this.onSubmitClick(row.orderId)}>提交审核</i-button>)
          }
        }
      },
      {
        align: 'center',
        title: ' 订单号',
        key: 'orderNo',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" onClick={() => this.showOrderInfo(row.orderId)}>{row.orderNo}</i-button>)
      },
      {
        align: 'center',
        title: ' 订单状态',
        key: 'orderStatus',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{this.$filter.dictConvert(row.orderStatus)}</span>)
      },
      {
        align: 'center',
        title: ' 订单类型',
        key: 'orderType',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<span>{this.$filter.dictConvert(row.orderType)}</span>)
      },
      {
        align: 'center',
        title: ' 订单期数',
        key: 'orderPeriods',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 订单金额',
        key: 'orderPrice',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.orderPrice)}</div>)
      },
      {
        align: 'center',
        title: ' 客户姓名',
        key: 'customerName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 电话号码',
        key: 'customerPhone',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 身份证号',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(4)
      }
    ]
  }

  activated(){
    this.refreshData()
  }

  mounted() {
    this.refreshData()
  }

  /**
   * 提交订单到审核
   */
  private onSubmitClick(orderId: Number) {
    this.$Modal.confirm({
      content: "提交后将不可再修改订单,是否确认提交？",
      onOk: () => {
        this.workFlowApprovalService.submitApproval(orderId).subscribe(
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
    this.basicCustomerOrderService.query(this.model, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>


<style lang="less" scoped>
</style>
