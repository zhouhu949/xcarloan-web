<template>
  <section class="page order-review">
    <page-header title="订单查看" hiddenPrint hiddenExport>
    </page-header>
    <data-form hidden-date-search :model="model" @on-search="refreshData" :page="pageService">
      <template slot="input">
        <i-form-item prop="name" label="姓名">
          <i-input v-model="model.name" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号">
          <i-input v-model="model.idCard" placeholder="请输入身份证号"></i-input>
        </i-form-item>
        <i-form-item prop="phone" label="联系电话">
          <i-input v-model="model.phone" placeholder="请输入联系电话"></i-input>
        </i-form-item>
        <i-form-item prop="orderNo" label="订单号">
          <i-input v-model="model.orderNo" placeholder="请输入订单号"></i-input>
        </i-form-item>
        <i-form-item prop="orderStatus" label="订单状态">
          <i-input v-model="model.orderStatus" placeholder="请输入订单状态"></i-input>
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

const CustomerOrderModule = namespace("customerOrderSpace");

@Layout('workspace')
@Component({
  components: {}
})
export default class OrderReview extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @CustomerOrderModule.Action showOrderInfo;

  /**
   * 可以结案的案件状态
   */
  private readonly CLOSE_STATUS: Array<Number> = [10112, 10113, 10115];

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
          if (this.CLOSE_STATUS.includes(row.orderStatus)) {
            return (<i-button type="text" class="row-command-button" onClick={() => this.onCloseClick(row)}>结案</i-button>)
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

  activated() {
    this.refreshData()
  }
  mounted() {
    this.refreshData()
  }

  private refreshData() {
    this.basicCustomerOrderService.query(this.model, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 结案
   */
  private onCloseClick(item) {
    this.$Modal.confirm({
      content: `是否确认结案？结案后该订单将无法进行任何操作！`,
      onOk: () => {
        this.basicCustomerOrderService.updateOrderStatus(item.orderId).subscribe(
          data => {
            this.$Message.success(`订单<b>${item.orderNo}</b>已结案！`)
            this.refreshData()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  } 

}
</script>


<style lang="less" scoped>
</style>
